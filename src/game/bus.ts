import Phaser from 'phaser'
import { ZoneId } from './world/zones'

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface GameEvents {
  'zone:near': (zone: ZoneId | null) => void
  'zone:open': (zone: ZoneId) => void
  'ui:help': () => void
  'dpad:press': (direction: Direction) => void
  'dpad:release': (direction: Direction) => void
  'action:interact': () => void
  'traffic:hit': () => void
  'score:change': (value: number) => void
}

export const bus = new Phaser.Events.EventEmitter()

// O jogo nasce pausado porque a ajuda abre na entrada. O Overlay escreve
// aqui; as cenas leem a cada frame.
export const hud = { blocking: true }

export function on<K extends keyof GameEvents>(
  event: K,
  handler: GameEvents[K],
) {
  bus.on(event, handler)
  return () => {
    bus.off(event, handler)
  }
}

export function emit<K extends keyof GameEvents>(
  event: K,
  ...args: Parameters<GameEvents[K]>
) {
  bus.emit(event, ...args)
}
