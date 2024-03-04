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
Tenho 20 anos, sou estudante de <b>Sistemas para Internet </b> no Instituto Federal do Rio Grande do Sul e possuo diploma de técnico em Informática para Internet. <b> Participei de projetos em grupo </b>, tanto no programa Nova Geração do Instituto Caldeira, como também no programa de bolsa de <b> Back-end com Spring Boot e ambiente cloud AWS </b>, pela Compass UOL. Minha paixão pela área de desenvolvimento é evidente, encontrando enorme satisfação em resolver problemas e absorver novas tecnologias. Estou empenhado em explorar novas oportunidades que me permitam aplicar minha paixão pelo desenvolvimento e contribuir de forma significativa para projetos desafiadores nessa área.
      </p>
    </AboutContainer>
  )
}
