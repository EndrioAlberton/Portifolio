import Phaser from 'phaser'
import { emit, hud } from '../bus'
import { PlayerRig } from '../player'
import { Traffic } from '../traffic'
import { buildTown } from '../world/build'
import { TILE } from '../world/tiles'
import { ZoneId, zoneColors, zoneLabels } from '../world/zones'

// O placar de travessias vive fora da cena para sobreviver às idas aos
// interiores; zera só quando a página recarrega.
let crossings = 0

export interface TownEntry {
  /** Tile em que o jogador reaparece ao sair de um interior. */
  spawnAt?: { x: number; y: number }
}

export class TownScene extends Phaser.Scene {
  private player!: PlayerRig
  private traffic!: Traffic
  private zones!: (ZoneId | null)[][]
  private warps!: (ZoneId | null)[][]
  private nearZone: ZoneId | null = null
  private interactQueued = false
  private warping = false
  private roadTop = 0
  private roadBottom = 0
  private side: 'norte' | 'sul' | null = null
  private onRoad = false
  private enteredFlowing = false

  constructor() {
    super('town')
  }

  create(entry: TownEntry) {
    const world = buildTown()
    this.zones = world.zones
    this.warps = world.warps
    this.warping = false
    this.nearZone = null

    const map = this.make.tilemap({
      tileWidth: TILE,
      tileHeight: TILE,
      width: world.width,
      height: world.height,
    })
    // O tileset da Kenney vem com 1px de espaçamento entre os tiles.
    const tileset = map.addTilesetImage('town', 'tileset', TILE, TILE, 0, 1)!

    map.createBlankLayer('ground', tileset)!.putTilesAt(world.ground, 0, 0)
    const over = map.createBlankLayer('over', tileset)!
    over.putTilesAt(world.over, 0, 0)
    over.setCollision(world.solidIndices)

    // Copas e janelas na frente do jogador: dá para passar por trás delas.
    const canopy = map.createBlankLayer('canopy', tileset)!
    canopy.putTilesAt(world.canopy, 0, 0)
    canopy.setDepth(2)

    const start = entry.spawnAt ?? world.spawn
    this.player = new PlayerRig(this, start.x, start.y)

    if (import.meta.env.DEV) {
      // Atalho para testes de navegador: pular a caminhada até um tile.
      ;(window as unknown as Record<string, unknown>).__teleport = (
        x: number,
        y: number,
      ) =>
        this.player.sprite.setPosition(x * TILE + TILE / 2, y * TILE + TILE / 2)
    }

    for (const anchor of world.anchors) {
      this.add
        .text(
          anchor.x * TILE + TILE / 2,
          anchor.bannerY * TILE + TILE / 2,
          zoneLabels[anchor.zone].toUpperCase(),
          {
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px',
            color: '#fafafa',
            backgroundColor: `#${zoneColors[anchor.zone]
              .toString(16)
              .padStart(6, '0')}`,
            padding: { x: 4, y: 3 },
          },
        )
        .setOrigin(0.5)
        .setResolution(4)
        .setDepth(3)
    }

    this.physics.world.setBounds(0, 0, world.width * TILE, world.height * TILE)
    this.physics.add.collider(this.player.sprite, over)

    this.traffic = new Traffic(this, {
      roadRows: world.roadRows,
      crossings: world.crossings,
      mapWidth: world.width,
      onHit: () => this.handleHit(world.spawn),
      speedBoost: () => Math.min(crossings * 8, 130),
    })
    this.roadTop = world.roadRows[0]
    this.roadBottom = world.roadRows[world.roadRows.length - 1]
    this.side = null
    this.onRoad = false
    this.enteredFlowing = false
    emit('score:change', crossings)

    const keyboard = this.input.keyboard!
    // Por evento, não por polling: um toque curto entre dois frames não se perde.
    for (const key of ['keydown-Z', 'keydown-SPACE', 'keydown-ENTER']) {
      keyboard.on(key, this.handleInteract, this)
    }
    keyboard.on('keydown-I', this.handleHelp, this)

    const camera = this.cameras.main
    camera.setBounds(0, 0, world.width * TILE, world.height * TILE)
    camera.setZoom(this.pickZoom())
    camera.startFollow(this.player.sprite, true, 0.12, 0.12)
    camera.fadeIn(250, 27, 22, 48)

    this.scale.on('resize', this.handleResize, this)
    this.events.once('shutdown', () => {
      keyboard.off('keydown-Z', this.handleInteract, this)
      keyboard.off('keydown-SPACE', this.handleInteract, this)
      keyboard.off('keydown-ENTER', this.handleInteract, this)
      keyboard.off('keydown-I', this.handleHelp, this)
      this.scale.off('resize', this.handleResize, this)
    })
  }

  private pickZoom() {
    return Phaser.Math.Clamp(Math.round(this.scale.width / (24 * TILE)), 2, 4)
  }

  private handleResize() {
    this.cameras.main.setZoom(this.pickZoom())
  }

  private handleInteract() {
    this.interactQueued = true
  }

  private handleHelp() {
    if (hud.blocking) return
    hud.blocking = true
    emit('ui:help')
  }

  private handleHit(spawn: { x: number; y: number }) {
    if (this.warping || hud.blocking) return
    hud.blocking = true
    this.cameras.main.shake(140, 0.006)
    crossings = 0
    emit('score:change', crossings)
    this.side = null
    this.onRoad = false
    this.enteredFlowing = false
    this.player.sprite.setPosition(
      spawn.x * TILE + TILE / 2,
      spawn.y * TILE + TILE / 2,
    )
    this.player.facing = 'down'
    emit('zone:near', null)
    emit('traffic:hit')
  }

  // O ponto se decide ao pisar no asfalto: entrou com o trânsito fluindo,
  // a travessia vale mesmo que o sinal feche no caminho.
  private trackCrossing(tileY: number) {
    if (tileY >= this.roadTop && tileY <= this.roadBottom) {
      if (!this.onRoad) {
        this.onRoad = true
        this.enteredFlowing = this.traffic.flowing
      }
      return
    }

    const side = tileY < this.roadTop ? 'norte' : 'sul'
    if (this.onRoad) {
      this.onRoad = false
      if (this.side && side !== this.side && this.enteredFlowing) {
        crossings += 1
        emit('score:change', crossings)
      }
    }
    this.side = side
  }

  update(_time: number, delta: number) {
    const { tileX, tileY } = this.player.update()
    this.traffic.update(
      delta,
      this.player.sprite.body as Phaser.Physics.Arcade.Body,
    )
    if (this.warping || hud.blocking) return
    this.trackCrossing(tileY)

    const warp = this.warps[tileY]?.[tileX] ?? null
    if (warp) {
      this.warping = true
      this.cameras.main.fadeOut(220, 27, 22, 48)
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => {
          this.scene.start('interior', {
            zone: warp,
            doorAt: { x: tileX, y: tileY + 1 },
          })
        },
      )
      return
    }

    this.checkZone(tileX, tileY)
  }

  private checkZone(tileX: number, tileY: number) {
    const step = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[
      this.player.facing
    ]
    const zone = this.zones[tileY + step[1]]?.[tileX + step[0]] ?? null

    if (zone !== this.nearZone) {
      this.nearZone = zone
      emit('zone:near', zone)
    }

    const pressed = this.interactQueued
    this.interactQueued = false

    if (zone && pressed) {
      hud.blocking = true
      emit('zone:near', null)
      emit('zone:open', zone)
    }
  }
}
