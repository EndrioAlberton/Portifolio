import Phaser from 'phaser'
import { emit, hud } from '../bus'
import { PlayerRig } from '../player'
import { buildGrid } from '../world/build'
import { interiors } from '../world/interiors'
import { TILE } from '../world/tiles'
import { ZoneId } from '../world/zones'

interface InteriorEntry {
  zone: ZoneId
  /** Tile da calçada onde o jogador reaparece ao sair. */
  doorAt: { x: number; y: number }
}

export class InteriorScene extends Phaser.Scene {
  private player!: PlayerRig
  private exits!: boolean[][]
  private entry!: InteriorEntry
  private leaving = false

  constructor() {
    super('interior')
  }

  create(entry: InteriorEntry) {
    this.entry = entry
    this.leaving = false

    const interior = interiors[entry.zone]
    if (!interior) {
      this.scene.start('town', { spawnAt: entry.doorAt })
      return
    }

    const world = buildGrid(interior.map, interior.legend)
    this.exits = world.warps.map((row) => row.map((warp) => warp !== null))

    const map = this.make.tilemap({
      tileWidth: TILE,
      tileHeight: TILE,
      width: world.width,
      height: world.height,
    })
    const tileset = map.addTilesetImage('town', 'tileset', TILE, TILE, 0, 1)!

    map.createBlankLayer('ground', tileset)!.putTilesAt(world.ground, 0, 0)
    const over = map.createBlankLayer('over', tileset)!
    over.putTilesAt(world.over, 0, 0)
    over.setCollision(world.solidIndices)

    const canopy = map.createBlankLayer('canopy', tileset)!
    canopy.putTilesAt(world.canopy, 0, 0)
    canopy.setDepth(2)

    this.player = new PlayerRig(this, world.spawn.x, world.spawn.y)

    this.physics.world.setBounds(0, 0, world.width * TILE, world.height * TILE)
    this.physics.add.collider(this.player.sprite, over)

    // Sem bounds: a sala é menor que a viewport e flutua centralizada no fundo.
    const camera = this.cameras.main
    camera.setZoom(
      Phaser.Math.Clamp(
        Math.round(this.scale.width / (world.width * TILE)),
        3,
        5,
      ),
    )
    camera.centerOn((world.width * TILE) / 2, (world.height * TILE) / 2)
    camera.fadeIn(250, 27, 22, 48)

    const keyboard = this.input.keyboard!
    for (const key of ['keydown-Z', 'keydown-SPACE', 'keydown-ENTER']) {
      keyboard.on(key, this.openContent, this)
    }
    keyboard.on('keydown-I', this.handleHelp, this)
    this.events.once('shutdown', () => {
      keyboard.off('keydown-Z', this.openContent, this)
      keyboard.off('keydown-SPACE', this.openContent, this)
      keyboard.off('keydown-ENTER', this.openContent, this)
      keyboard.off('keydown-I', this.handleHelp, this)
    })

    this.time.delayedCall(420, () => this.openContent())
  }

  private openContent() {
    if (hud.blocking || this.leaving) return
    hud.blocking = true
    emit('zone:open', this.entry.zone)
  }

  private handleHelp() {
    if (hud.blocking) return
    hud.blocking = true
    emit('ui:help')
  }

  update() {
    if (!this.player) return
    const { tileX, tileY } = this.player.update()
    if (this.leaving || hud.blocking) return

    if (this.exits[tileY]?.[tileX]) {
      this.leaving = true
      this.cameras.main.fadeOut(220, 27, 22, 48)
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => {
          this.scene.start('town', { spawnAt: this.entry.doorAt })
        },
      )
    }
  }
}
