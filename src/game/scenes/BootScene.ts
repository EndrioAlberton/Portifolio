import Phaser from 'phaser'
import { TILE, TILESET_COLS } from '../world/tiles'

// O personagem mora no mesmo tileset: 4 colunas (uma por direção) e 3 linhas
// (parado, passo A, passo B), começando no índice 23.
const CHAR_FIRST = 23
const FACING = { left: 0, down: 1, up: 2, right: 3 }

function frames(facing: number) {
  return [0, 1, 0, 2].map((row) => ({
    key: 'tiles',
    frame: CHAR_FIRST + facing + row * TILESET_COLS,
  }))
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }

  preload() {
    this.load.image('tileset', 'assets/tilemap.png')
    this.load.spritesheet('tiles', 'assets/tilemap.png', {
      frameWidth: TILE,
      frameHeight: TILE,
      spacing: 1,
    })
  }

  create() {
    for (const [name, facing] of Object.entries(FACING)) {
      this.anims.create({
        key: `walk-${name}`,
        frames: frames(facing),
        frameRate: 8,
        repeat: -1,
      })
    }

    this.scene.start('town')
  }
}

export const idleFrame = (facing: keyof typeof FACING) =>
  CHAR_FIRST + FACING[facing]
