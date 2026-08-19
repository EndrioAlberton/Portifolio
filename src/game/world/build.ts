import { town as townMap } from './map'
import {
  FACADES,
  FACADE_BY_ZONE,
  FOUNTAIN,
  Legend,
  TileDef,
  town as townLegend,
} from './tiles'
import { ZoneId } from './zones'

export interface ZoneAnchor {
  zone: ZoneId
  x: number
  y: number
  bannerY: number
}

export interface BuiltGrid {
  width: number
  height: number
  ground: number[][]
  over: number[][]
  canopy: number[][]
  solidIndices: number[]
  zones: (ZoneId | null)[][]
  warps: (ZoneId | null)[][]
  spawn: { x: number; y: number }
}

export interface Crossing {
  x0: number
  x1: number
}

export interface BuiltTown extends BuiltGrid {
  anchors: ZoneAnchor[]
  /** Fileiras de asfalto, de cima para baixo. */
  roadRows: number[]
  crossings: Crossing[]
}

// A fatia certa de um bloco em nove pedaços (fachada, fonte) sai dos vizinhos:
// mover ou redimensionar o bloco no mapa refaz as bordas sozinho.
function slice9(
  same: (x: number, y: number) => boolean,
  x: number,
  y: number,
  block: number[][],
) {
  const row = !same(x, y - 1) ? 0 : !same(x, y + 1) ? 2 : 1
  const col = !same(x - 1, y) ? 0 : !same(x + 1, y) ? 2 : 1
  return block[row][col]
}

// Prédios contíguos viram grupos; a fachada do grupo vem da zona da porta dele.
function facadeOf(
  groups: Map<string, number>,
  zoneByGroup: Map<number, ZoneId>,
  x: number,
  y: number,
) {
  const zone = zoneByGroup.get(groups.get(`${x},${y}`) ?? -1)
  return FACADES[zone ? FACADE_BY_ZONE[zone] : 'red']
}

function labelBuildings(map: string[], legend: Legend) {
  const groups = new Map<string, number>()
  const zoneByGroup = new Map<number, ZoneId>()
  const height = map.length
  const width = map[0].length
  const def = (x: number, y: number): TileDef | undefined =>
    x >= 0 && y >= 0 && x < width && y < height ? legend[map[y][x]] : undefined
  let next = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!def(x, y)?.building || groups.has(`${x},${y}`)) continue
      const id = next++
      const stack = [[x, y]]
      while (stack.length) {
        const [cx, cy] = stack.pop()!
        const key = `${cx},${cy}`
        const tile = def(cx, cy)
        if (!tile?.building || groups.has(key)) continue
        groups.set(key, id)
        if (tile.zone) zoneByGroup.set(id, tile.zone)
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1])
      }
    }
  }

  return { groups, zoneByGroup }
}

export function buildGrid(map: string[], legend: Legend): BuiltGrid {
  const height = map.length
  const width = map[0].length
  const def = (x: number, y: number): TileDef | undefined =>
    x >= 0 && y >= 0 && x < width && y < height ? legend[map[y][x]] : undefined
  const { groups, zoneByGroup } = labelBuildings(map, legend)

  const ground: number[][] = []
  const over: number[][] = []
  const canopy: number[][] = Array.from({ length: height }, () =>
    new Array<number>(width).fill(-1),
  )
  const zones: (ZoneId | null)[][] = []
  const warps: (ZoneId | null)[][] = []
  const solid = new Set<number>()
  let spawn = { x: 1, y: 1 }

  for (let y = 0; y < height; y++) {
    const g: number[] = []
    const o: number[] = []
    const z: (ZoneId | null)[] = []
    const wp: (ZoneId | null)[] = []

    for (let x = 0; x < width; x++) {
      const char = map[y][x]
      const tile = legend[char]
      if (!tile)
        throw new Error(
          `Tile "${char}" na linha ${y}, coluna ${x} não está na legenda`,
        )

      g.push(tile.ground)

      let overIndex = tile.over ?? -1
      if (overIndex === -1 && tile.building) {
        overIndex = slice9(
          (sx, sy) => !!def(sx, sy)?.building,
          x,
          y,
          facadeOf(groups, zoneByGroup, x, y),
        )
      }
      if (overIndex === -1 && tile.fountain) {
        overIndex = slice9((sx, sy) => !!def(sx, sy)?.fountain, x, y, FOUNTAIN)
      }
      o.push(overIndex)

      if (tile.solid && overIndex !== -1) solid.add(overIndex)
      if (tile.above !== undefined && y > 0) canopy[y - 1][x] = tile.above
      if (tile.deco !== undefined) canopy[y][x] = tile.deco

      // Porta é entrada, não ponto de conversa: warp anula o prompt de Z.
      z.push(tile.warp ? null : tile.zone ?? null)
      wp.push(tile.warp ?? null)
      if (tile.spawn) spawn = { x, y }
    }

    ground.push(g)
    over.push(o)
    zones.push(z)
    warps.push(wp)
  }

  return {
    width,
    height,
    ground,
    over,
    canopy,
    solidIndices: [...solid],
    zones,
    warps,
    spawn,
  }
}

// A placa fica acima do telhado, não da porta: sobe enquanto houver prédio.
function bannerRow(map: string[], legend: Legend, x: number, y: number) {
  let top = y
  while (legend[map[top - 1]?.[x]]?.building) top -= 1
  return top - 1
}

export function buildTown(): BuiltTown {
  const grid = buildGrid(townMap, townLegend)
  const anchors: ZoneAnchor[] = []

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const zone = townLegend[townMap[y][x]]?.zone
      if (zone)
        anchors.push({
          zone,
          x,
          y,
          bannerY: bannerRow(townMap, townLegend, x, y),
        })
    }
  }

  // A rua e as faixas saem do desenho do mapa, para o tráfego acompanhar
  // qualquer mudança de layout sem coordenada mágica.
  const roadRows = townMap
    .map((row, y) => ({ row, y }))
    .filter(({ row }) => row[0] === '#' || row[0] === '-')
    .map(({ y }) => y)

  const crossings: Crossing[] = []
  const reference = townMap[roadRows[0]] ?? ''
  let start = -1
  for (let x = 0; x <= reference.length; x++) {
    if (reference[x] === '=' && start < 0) start = x
    if (reference[x] !== '=' && start >= 0) {
      crossings.push({ x0: start, x1: x - 1 })
      start = -1
    }
  }

  return { ...grid, anchors, roadRows, crossings }
}
