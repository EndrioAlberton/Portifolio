import { ZoneId } from './zones'

export const TILE = 16
export const TILESET_COLS = 27

const SIDEWALK = 36
const ASPHALT = 441
const ROAD_LINE = 433
const CROSSWALK = 435

const DOOR_ABOUT = 283
const DOOR_EXPERIENCE = 257
const DOOR_PROJECTS = 284
const TREE = 292
const PINE = 265
// Copa e base de uma árvore alta: dois tiles empilhados no tileset.
const CANOPY = 232
const TREE_TALL = 259
const PLANTER = 286
const HYDRANT = 169
const TRASH = 253
const QUEST_BOARD = 250
const PAYPHONE = 190
const WINDOW_TAN = 363
const WINDOW_WIDE = 364

// Fachadas em nove fatias: [topo|meio|base] x [esquerda|centro|direita].
// Um prédio se monta sozinho a partir dos vizinhos; qual paleta ele usa vem
// da zona da porta dele, então cada prédio da cidade tem cara própria.
export const FACADES: Record<'red' | 'orange' | 'gray', number[][]> = {
  red: [
    [17, 18, 19],
    [71, 72, 73],
    [98, 99, 100],
  ],
  orange: [
    [152, 153, 154],
    [179, 180, 181],
    [206, 207, 208],
  ],
  gray: [
    [143, 144, 145],
    [116, 117, 118],
    [116, 117, 118],
  ],
}

export const FACADE_BY_ZONE: Record<ZoneId, keyof typeof FACADES> = {
  about: 'red',
  experience: 'gray',
  projects: 'orange',
  skills: 'red',
  contact: 'red',
}

export const FOUNTAIN = [
  [170, 171, 172],
  [197, 198, 199],
  [224, 225, 226],
]

export interface TileDef {
  ground: number
  over?: number
  /** Índice desenhado um tile acima, para objetos de duas alturas. Vai numa
   *  camada na frente do jogador, então dá para passar por trás da copa. */
  above?: number
  /** Índice desenhado na mesma célula, na camada da frente. Usado pelas
   *  janelas, que se sobrepõem ao tijolo da fachada. */
  deco?: number
  solid?: boolean
  building?: boolean
  fountain?: boolean
  zone?: ZoneId
  /** Pisar neste tile leva para o interior da zona (ou de volta à cidade). */
  warp?: ZoneId
  spawn?: boolean
}

export type Legend = Record<string, TileDef>

export const town: Legend = {
  '.': { ground: SIDEWALK },
  '@': { ground: SIDEWALK, spawn: true },
  '#': { ground: ASPHALT },
  '-': { ground: ROAD_LINE },
  '=': { ground: CROSSWALK },

  B: { ground: SIDEWALK, solid: true, building: true },
  w: { ground: SIDEWALK, solid: true, building: true, deco: WINDOW_TAN },
  W: { ground: SIDEWALK, solid: true, building: true, deco: WINDOW_WIDE },
  a: {
    ground: SIDEWALK,
    over: DOOR_ABOUT,
    building: true,
    zone: 'about',
    warp: 'about',
  },
  e: {
    ground: SIDEWALK,
    over: DOOR_EXPERIENCE,
    building: true,
    zone: 'experience',
    warp: 'experience',
  },
  p: {
    ground: SIDEWALK,
    over: DOOR_PROJECTS,
    building: true,
    zone: 'projects',
    warp: 'projects',
  },

  s: { ground: SIDEWALK, over: QUEST_BOARD, solid: true, zone: 'skills' },
  c: { ground: SIDEWALK, over: PAYPHONE, solid: true, zone: 'contact' },

  F: { ground: SIDEWALK, solid: true, fountain: true },

  T: { ground: SIDEWALK, over: TREE, solid: true },
  t: { ground: SIDEWALK, over: PINE, solid: true },
  A: { ground: SIDEWALK, over: TREE_TALL, above: CANOPY, solid: true },
  b: { ground: SIDEWALK, over: PLANTER, above: CANOPY, solid: true },
  f: { ground: SIDEWALK, over: HYDRANT, solid: true },
  x: { ground: SIDEWALK, over: TRASH, solid: true },
}
