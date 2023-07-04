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
      Tenho 19 anos, sou estudante de Sistemas para Internet no Instituto Federal do Rio Grande Do Sul, possuo diploma de técnico em Informática para Internet. 
      Tenho  experiências em projetos acadêmicos e pessoais que podem ser visto em Projeto ou em meu GitHub, 
      tenho paixão pela área de desenvolvimento, sinto uma enorme satisfação ao resolver problemas e aprender novas tecnologias. 
      Busco oportunidades para ingressar na área.
      </p>
    </AboutContainer>
  )
}
