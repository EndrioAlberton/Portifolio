import { useEffect } from 'react'
import { ZoneId, zoneLabels } from '../../world/zones'
import { useTypewriter } from '../useTypewriter'
import { intros, sections } from './sections'
import { Body, Box, Close, Header, Speaker, Speech } from './styles'

interface DialogueProps {
  zone: ZoneId
  onClose: () => void
}

export function Dialogue({ zone, onClose }: DialogueProps) {
  const { shown, done, skip } = useTypewriter(intros[zone])
  const Section = sections[zone]

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      else if (!done) skip()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [done, skip, onClose])

  return (
    <Box role="dialog" aria-label={zoneLabels[zone]} onClick={skip}>
      <Speaker>ENDRIO</Speaker>
      <Header>
        <h2>{zoneLabels[zone]}</h2>
        <Close type="button" onClick={onClose} aria-label="Fechar">
          esc ✕
        </Close>
      </Header>

      <Speech>
        {shown}
        {!done && <i />}
      </Speech>

      <Body>
        <Section />
      </Body>
    </Box>
  )
}
