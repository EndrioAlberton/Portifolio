import Phaser from 'phaser'
import { hud } from './bus'
import { Crossing } from './world/build'
import { TILE } from './world/tiles'

// Só os veículos estreitos da folha ([teto, base]); os largos têm 2x2 tiles
// e não cabem na pista quando deitados.
const CAR_SPRITES: [number, number][] = [
  [395, 422],
  [398, 425],
  [449, 476],
  [452, 479],
  [399, 426],
  [400, 427],
]

const CRUISE_MIN = 150
const CRUISE_MAX = 195
const ACCEL = 160
const BRAKE = 260
const CAR_HALF_LENGTH = 16
const CAR_HALF_WIDTH = 6
const FOLLOW_GAP = CAR_HALF_LENGTH * 2 + 8
const SPAWN_MIN = 1600
const SPAWN_MAX = 3400

// Verde flui, vermelho faz fila na faixa. Atravessar no trânsito em
// movimento vale ponto; no vermelho é de graça.
const PHASES = [
  { name: 'green', duration: 5200, lamp: 0x2ecc71 },
  { name: 'yellow', duration: 1100, lamp: 0xf1c40f },
  { name: 'red', duration: 4600, lamp: 0xe74c3c },
] as const

interface Car {
  container: Phaser.GameObjects.Container
  lane: number
  speed: number
  cruise: number
}

interface Lane {
  y: number
  dir: 1 | -1
  nextSpawn: number
}

interface TrafficConfig {
  roadRows: number[]
  crossings: Crossing[]
  mapWidth: number
  onHit: () => void
  speedBoost: () => number
}

export class Traffic {
  private scene: Phaser.Scene
  private config: TrafficConfig
  private lanes: Lane[]
  private cars: Car[] = []
  private lamps: Phaser.GameObjects.Image[] = []
  private phaseIndex = 0
  private phaseTimer = 0

  constructor(scene: Phaser.Scene, config: TrafficConfig) {
    this.scene = scene
    this.config = config

    const rows = config.roadRows
    // Mão dupla: fileira de cima segue para a esquerda, a de baixo para a direita.
    this.lanes = [
      { y: rows[0], dir: -1, nextSpawn: 500 },
      { y: rows[rows.length - 1], dir: 1, nextSpawn: 1400 },
    ]

    for (const crossing of config.crossings) {
      this.addSignal(crossing.x1 + 1, rows[0] - 1, true)
      this.addSignal(crossing.x0 - 1, rows[rows.length - 1] + 1, false)
    }

    if (import.meta.env.DEV) {
      // Atalho para testes de navegador lerem a fase sem cronometrar.
      ;(window as unknown as Record<string, unknown>).__phase = () =>
        this.phase.name
    }

    for (const lane of this.lanes) {
      for (const fraction of [0.15, 0.55, 0.85]) {
        const x = fraction * config.mapWidth * TILE
        if (!this.overCrossing(x)) this.spawnCar(lane, x)
      }
    }
  }

  // Poste em cada esquina antes da faixa, com o braço estendido sobre ela:
  // o do norte é espelhado para o braço alcançar a travessia pela direita.
  private addSignal(tileX: number, tileY: number, flip: boolean) {
    const x = tileX * TILE + TILE / 2
    const y = tileY * TILE + TILE / 2
    this.scene.add.image(x, y, 'tiles', 409).setFlipX(flip).setDepth(2)
    // O ponto de cor fica sobre a caixinha de luzes do poste.
    this.lamps.push(
      this.scene.add
        .image(x + (flip ? 2 : -2), y + 1, '__WHITE')
        .setDisplaySize(3, 3)
        .setTint(PHASES[0].lamp)
        .setDepth(3),
    )
  }

  private get phase() {
    return PHASES[this.phaseIndex]
  }

  get flowing() {
    return this.phase.name !== 'red'
  }

  private overCrossing(x: number) {
    return this.config.crossings.some(
      (c) =>
        x > c.x0 * TILE - CAR_HALF_LENGTH &&
        x < (c.x1 + 1) * TILE + CAR_HALF_LENGTH,
    )
  }

  private stopLineAhead(car: Car): number | null {
    const lane = this.lanes[car.lane]
    const front = car.container.x + lane.dir * CAR_HALF_LENGTH
    let best: number | null = null

    for (const crossing of this.config.crossings) {
      const line =
        lane.dir === 1 ? crossing.x0 * TILE - 3 : (crossing.x1 + 1) * TILE + 3
      const distance = (line - front) * lane.dir
      // O -4 mantém preso à linha quem já parou nela; só quem entrou na
      // faixa de fato segue adiante.
      if (
        distance > -4 &&
        (best === null || distance < (best - front) * lane.dir)
      ) {
        best = line
      }
    }

    return best
  }

  private spawnCar(lane: Lane, atX?: number) {
    const mapWidthPx = this.config.mapWidth * TILE
    const x =
      atX ??
      (lane.dir === 1 ? -CAR_HALF_LENGTH - 8 : mapWidthPx + CAR_HALF_LENGTH + 8)

    // Fila parada até a borda: não nascer em cima do último carro.
    const laneIndex = this.lanes.indexOf(lane)
    const crowded = this.cars.some(
      (car) => car.lane === laneIndex && Math.abs(car.container.x - x) < 56,
    )
    if (crowded && atX === undefined) return

    const [roof, base] =
      CAR_SPRITES[Math.floor(Math.random() * CAR_SPRITES.length)]
    const container = this.scene.add.container(x, lane.y * TILE + TILE / 2, [
      this.scene.add.image(0, -TILE / 2, 'tiles', roof),
      this.scene.add.image(0, TILE / 2, 'tiles', base),
    ])
    // A base do desenho vira a frente do carro no sentido da mão.
    container.setRotation(lane.dir === 1 ? -Math.PI / 2 : Math.PI / 2)
    container.setDepth(1)

    const cruise =
      Phaser.Math.Between(CRUISE_MIN, CRUISE_MAX) + this.config.speedBoost()
    this.cars.push({ container, lane: laneIndex, speed: cruise, cruise })
  }

  update(delta: number, player: Phaser.Physics.Arcade.Body) {
    if (hud.blocking) return

    this.phaseTimer += delta
    if (this.phaseTimer >= this.phase.duration) {
      this.phaseTimer = 0
      this.phaseIndex = (this.phaseIndex + 1) % PHASES.length
      for (const lamp of this.lamps) lamp.setTint(this.phase.lamp)
    }

    for (const lane of this.lanes) {
      lane.nextSpawn -= delta
      if (lane.nextSpawn <= 0) {
        lane.nextSpawn = Phaser.Math.Between(SPAWN_MIN, SPAWN_MAX)
        this.spawnCar(lane)
      }
    }

    const dt = delta / 1000
    const mapWidthPx = this.config.mapWidth * TILE

    // Da frente para trás, para o carro de trás reagir ao da frente já
    // movido no mesmo frame.
    for (let laneIndex = 0; laneIndex < this.lanes.length; laneIndex++) {
      const lane = this.lanes[laneIndex]
      const queue = this.cars
        .filter((car) => car.lane === laneIndex)
        .sort((a, b) => (b.container.x - a.container.x) * lane.dir)

      let ahead: Car | null = null
      for (const car of queue) {
        let target = car.cruise

        // Fora do verde, freia para a próxima faixa; quem já passou dela
        // segue e sai do mapa.
        const line =
          this.phase.name !== 'green' ? this.stopLineAhead(car) : null
        if (line !== null) {
          const front = car.container.x + lane.dir * CAR_HALF_LENGTH
          const distance = (line - front) * lane.dir
          const brakeDistance = (car.speed * car.speed) / (2 * BRAKE) + 3
          if (distance < brakeDistance) target = 0
        }

        if (ahead) {
          const gap = (ahead.container.x - car.container.x) * lane.dir
          const brakeDistance = (car.speed * car.speed) / (2 * BRAKE)
          if (gap < FOLLOW_GAP + brakeDistance) target = 0
        }

        car.speed =
          car.speed < target
            ? Math.min(target, car.speed + ACCEL * dt)
            : Math.max(target, car.speed - BRAKE * dt)
        car.container.x += lane.dir * car.speed * dt

        if (line !== null) {
          const front = car.container.x + lane.dir * CAR_HALF_LENGTH
          if ((line - front) * lane.dir < 0) {
            car.container.x = line - lane.dir * CAR_HALF_LENGTH
            car.speed = 0
          }
        }

        if (ahead) {
          const gap = (ahead.container.x - car.container.x) * lane.dir
          if (gap < FOLLOW_GAP) {
            car.container.x = ahead.container.x - lane.dir * FOLLOW_GAP
            car.speed = Math.min(car.speed, ahead.speed)
          }
        }

        // Carro parado não atropela; encostar nele é inofensivo.
        const dx = Math.abs(car.container.x - player.center.x)
        const dy = Math.abs(car.container.y - player.center.y)
        if (
          car.speed > 20 &&
          dx < CAR_HALF_LENGTH + player.halfWidth &&
          dy < CAR_HALF_WIDTH + player.halfHeight
        ) {
          this.config.onHit()
          return
        }

        ahead = car
      }
    }

    this.cars = this.cars.filter((car) => {
      const gone =
        car.container.x < -CAR_HALF_LENGTH * 3 ||
        car.container.x > mapWidthPx + CAR_HALF_LENGTH * 3
      if (gone) car.container.destroy()
      return !gone
    })
  }
}
