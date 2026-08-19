import { useCallback, useEffect, useState } from 'react'
import { profile } from '../../../content/profile'
import { emit, hud, on } from '../../bus'
import { ZoneId, zoneLabels } from '../../world/zones'
import { Dialogue } from '../Dialogue'
import { Dpad } from '../Dpad'
import { Help } from '../Help'
import { Notice } from '../Notice'
import { Action, Hint, Hud, Prompt, Score, TopBar } from './styles'

export function Overlay() {
  const [near, setNear] = useState<ZoneId | null>(null)
  const [open, setOpen] = useState<ZoneId | null>(null)
  // A ajuda é a tela de entrada: o visitante lê como jogar antes de andar.
  const [help, setHelp] = useState(true)
  const [hit, setHit] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const offNear = on('zone:near', setNear)
    const offOpen = on('zone:open', setOpen)
    const offHelp = on('ui:help', () => setHelp(true))
    const offHit = on('traffic:hit', () => setHit(true))
    const offScore = on('score:change', setScore)

    return () => {
      offNear()
      offOpen()
      offHelp()
      offHit()
      offScore()
    }
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    setHelp(false)
    setHit(false)
    hud.blocking = false
  }, [])

  const openHelp = useCallback(() => {
    hud.blocking = true
    setHelp(true)
  }, [])

  const paused = help || hit || open !== null

  return (
    <Hud>
      <TopBar>
        <strong>{profile.name}</strong>
        <nav>
          <button type="button" onClick={openHelp}>
            ajuda
          </button>
          <a href="/classico">modo clássico</a>
        </nav>
      </TopBar>

      {help && <Help onClose={close} />}
      {!help && hit && <Notice onClose={close} />}
      {!help && !hit && open && <Dialogue zone={open} onClose={close} />}

      {!paused && (
        <>
          {score > 0 && <Score>{score}</Score>}
          <Hint>setas: andar · Z: interagir · I: ajuda</Hint>
          {near && <Prompt>Z: {zoneLabels[near]}</Prompt>}
          <Dpad />
          <Action
            type="button"
            aria-label="Interagir"
            onPointerDown={() => emit('action:interact')}
          >
            Z
          </Action>
        </>
      )}
    </Hud>
  )
}
