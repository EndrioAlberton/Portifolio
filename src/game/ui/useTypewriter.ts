import { useEffect, useState } from 'react'

// Qualquer tecla ou clique completa o texto na hora.
export function useTypewriter(text: string, speed = 28) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setShown(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, speed)

    return () => window.clearInterval(timer)
  }, [text, speed])

  return {
    shown,
    done: shown.length >= text.length,
    skip: () => setShown(text),
  }
}
