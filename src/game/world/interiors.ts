import { Legend } from './tiles'
import { ZoneId } from './zones'

const BRICK_TOP = 18
const BRICK_MID = 72
const FLOOR_WOOD = 109
const FLOOR_GRAY = 117
const DOOR_MAT = 91

const TABLE = 275
const CHAIR = 274
const DRESSER = 300
const SHELF_PLANT = 304
const SHELF_FLOWERS = 301
const CABINET = 303
const COMPUTER = 333
const BOARD = 334
const COUNTER_L = 328
const COUNTER_M = 329
const COUNTER_R = 330
const TRASH_BIN = 279
// Armário alto em dois tiles: base na camada do meio, topo na camada da frente.
const LOCKER_BASE = 354
const LOCKER_TOP = 327

function legendFor(floor: number): Legend {
  return {
    '.': { ground: floor },
    '@': { ground: floor, spawn: true },
    '#': { ground: floor, over: BRICK_MID, solid: true },
    '^': { ground: floor, over: BRICK_TOP, solid: true },
    // A saída warpa para "town" por convenção da cena, não pela legenda.
    d: { ground: DOOR_MAT, warp: 'about' },

    m: { ground: floor, over: TABLE, solid: true },
    h: { ground: floor, over: CHAIR, solid: true },
    s: { ground: floor, over: DRESSER, solid: true },
    S: { ground: floor, over: SHELF_PLANT, solid: true },
    r: { ground: floor, over: SHELF_FLOWERS, solid: true },
    C: { ground: floor, over: CABINET, solid: true },
    M: { ground: floor, over: COMPUTER, solid: true },
    Q: { ground: floor, over: BOARD, solid: true },
    k: { ground: floor, over: COUNTER_L, solid: true },
    l: { ground: floor, over: COUNTER_M, solid: true },
    j: { ground: floor, over: COUNTER_R, solid: true },
    x: { ground: floor, over: TRASH_BIN, solid: true },
    L: { ground: floor, over: LOCKER_BASE, above: LOCKER_TOP, solid: true },
  }
}

export interface Interior {
  map: string[]
  legend: Legend
}

export const interiors: Partial<Record<ZoneId, Interior>> = {
  about: {
    legend: legendFor(FLOOR_WOOD),
    map: [
      '^^^^^^^^^^^^^',
      '#L..r...Q..S#',
      '#...........#',
      '#..m.h......#',
      '#.......C...#',
      '#x..........#',
      '#.....@.....#',
      '^^^^^^d^^^^^^',
    ],
  },
  experience: {
    legend: legendFor(FLOOR_GRAY),
    map: [
      '^^^^^^^^^^^^^^^',
      '#Q...M....M..L#',
      '#..m.h..m.h...#',
      '#.............#',
      '#..m.h..m.h.x.#',
      '#.....@.......#',
      '^^^^^^d^^^^^^^^',
    ],
  },
  projects: {
    legend: legendFor(FLOOR_WOOD),
    map: [
      '^^^^^^^^^^^^^^^',
      '#S..k.l.l.j..S#',
      '#.............#',
      '#..k.l.j...r..#',
      '#.............#',
      '#C.....@....x.#',
      '^^^^^^^d^^^^^^^',
    ],
  },
}
