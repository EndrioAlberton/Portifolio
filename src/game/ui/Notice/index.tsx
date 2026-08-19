import { useEffect } from 'react'
import { Box, Close, Header, Speaker, Speech } from '../Dialogue/styles'
import { useTypewriter } from '../useTypewriter'
import { Ok } from './styles'

interface NoticeProps {
  onClose: () => void
}

export function Notice({ onClose }: NoticeProps) {
  const { shown, done, skip } = useTypewriter(
    'Opa! Quase te atropelaram. Olhe para os dois lados antes de atravessar!',
  )

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (!done) skip()
      else if (['Escape', 'Enter', 'z', ' '].includes(event.key)) onClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [done, skip, onClose])

  return (
    <Box role="dialog" aria-label="Cuidado" onClick={skip}>
      <Speaker>SINALEIRA</Speaker>
      <Header>
        <h2>Cuidado!</h2>
        <Close type="button" onClick={onClose} aria-label="Fechar">
          esc ✕
        </Close>
      </Header>

      <Speech>
        {shown}
        {!done && <i />}
      </Speech>

      <Ok type="button" onClick={onClose} autoFocus>
        Entendi
      </Ok>
    </Box>
  )
}
