import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { AboutContainer } from './styles'

export function About() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const containerVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: -200 },
  }

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <AboutContainer
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <h2>Sobre mim</h2>
      <p>
      Tenho 19 anos, possuo formação de técnico em informática para internet, obtive algumas experiências com projetos acadêmicos e pessoais, 
      busco oportunidades para ingressar minha carreira na área de desenvolvimento, área na qual sinto enorme satisfação e vontade de aprender 
      todos os dias.
      </p>
    </AboutContainer>
  )
}
