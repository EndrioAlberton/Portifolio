import { Direction, emit } from '../../bus'
import { Pad } from './styles'

const buttons: { direction: Direction; label: string; area: string }[] = [
  { direction: 'up', label: '▲', area: 'up' },
  { direction: 'left', label: '◀', area: 'left' },
  { direction: 'right', label: '▶', area: 'right' },
  { direction: 'down', label: '▼', area: 'down' },
]

export function Dpad() {
  return (
    <Pad>
      {buttons.map(({ direction, label, area }) => (
        <button
          key={direction}
          type="button"
          style={{ gridArea: area }}
          aria-label={direction}
          onPointerDown={() => emit('dpad:press', direction)}
          onPointerUp={() => emit('dpad:release', direction)}
          onPointerLeave={() => emit('dpad:release', direction)}
          onPointerCancel={() => emit('dpad:release', direction)}
          onContextMenu={(event) => event.preventDefault()}
        >
          {label}
        </button>
      ))}
    </Pad>
  )
}
