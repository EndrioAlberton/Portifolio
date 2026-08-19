import Phaser from 'phaser'
import { Direction, bus, hud } from './bus'
import { idleFrame } from './scenes/BootScene'
import { TILE } from './world/tiles'

const SPEED = 80

export class PlayerRig {
  readonly sprite: Phaser.Physics.Arcade.Sprite
  facing: Direction = 'down'

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd: Record<Direction, Phaser.Input.Keyboard.Key>
  private touch: Record<Direction, boolean> = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  constructor(scene: Phaser.Scene, tileX: number, tileY: number) {
    this.sprite = scene.physics.add.sprite(
      tileX * TILE + TILE / 2,
      tileY * TILE + TILE / 2,
      'tiles',
      idleFrame('down'),
    )
    // Corpo só nos pés: o visitante passa "atrás" do topo de prédios e árvores.
    this.sprite.setOrigin(0.5, 0.5)
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    body.setSize(10, 6)
    body.setOffset(3, 10)
    this.sprite.setCollideWorldBounds(true)
    this.sprite.setDepth(1)

    const keyboard = scene.input.keyboard!
    this.cursors = keyboard.createCursorKeys()
    this.wasd = {
      up: keyboard.addKey('W'),
      down: keyboard.addKey('S'),
      left: keyboard.addKey('A'),
      right: keyboard.addKey('D'),
    }

    bus.on('dpad:press', this.handlePress, this)
    bus.on('dpad:release', this.handleRelease, this)
    scene.events.once('shutdown', () => {
      bus.off('dpad:press', this.handlePress, this)
      bus.off('dpad:release', this.handleRelease, this)
    })
  }

  private handlePress(direction: Direction) {
    this.touch[direction] = true
  }

  private handleRelease(direction: Direction) {
    this.touch[direction] = false
  }

  private held(direction: Direction) {
    return (
      this.cursors[direction].isDown ||
      this.wasd[direction].isDown ||
      this.touch[direction]
    )
  }

  update(): { tileX: number; tileY: number; moving: boolean } {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body

    if (hud.blocking) {
      body.setVelocity(0, 0)
      this.sprite.anims.stop()
      this.sprite.setFrame(idleFrame(this.facing))
      return { tileX: this.tileX(), tileY: this.tileY(), moving: false }
    }

    const x = Number(this.held('right')) - Number(this.held('left'))
    const y = Number(this.held('down')) - Number(this.held('up'))

    body.setVelocity(x * SPEED, y * SPEED)
    if (x !== 0 && y !== 0) body.velocity.normalize().scale(SPEED)

    if (x !== 0 || y !== 0) {
      // Horizontal ganha do vertical na diagonal: o sprite lateral lê melhor.
      this.facing = x !== 0 ? (x > 0 ? 'right' : 'left') : y > 0 ? 'down' : 'up'
      this.sprite.anims.play(`walk-${this.facing}`, true)
    } else {
      this.sprite.anims.stop()
      this.sprite.setFrame(idleFrame(this.facing))
    }

    return {
      tileX: this.tileX(),
      tileY: this.tileY(),
      moving: x !== 0 || y !== 0,
    }
  }

  // Tile dos pés, não do sprite: encostado numa parede o desenho invade o
  // tile vizinho, mas o corpo físico continua no chão em que o personagem está.
  tileX() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    return Math.floor(body.center.x / TILE)
  }

  tileY() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    return Math.floor(body.center.y / TILE)
  }
}
