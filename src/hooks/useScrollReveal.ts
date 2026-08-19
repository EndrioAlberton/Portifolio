import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// As cinco seções repetiam este bloco; as props voltam prontas para
// espalhar no container animado.
export function useScrollReveal(offset = -200) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return {
    ref,
    initial: 'hidden',
    animate: controls,
    variants: {
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
      hidden: { opacity: 0, y: offset },
    },
  }
}
