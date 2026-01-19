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
        Tenho 22 anos e sou estudante de <b>Sistemas para Internet</b> no
        Instituto Federal do Rio Grande do Sul (Campus Porto Alegre), com
        formação técnica em Informática para Internet pelo IFSul Campus
        Gravataí.
      </p>
      <p>
        Sou apaixonado por desenvolvimento de software e tecnologia. Tenho
        experiência tanto em <b>front-end</b> com React e Next.js, quanto em{' '}
        <b>back-end</b> com Python, Java e Spring Boot. Encontro grande
        satisfação em resolver problemas complexos e estou sempre em busca de
        aprender novas tecnologias.
      </p>
      <p>
        Meu objetivo é continuar evoluindo como desenvolvedor Full-Stack,
        contribuindo com projetos desafiadores e aplicando as melhores práticas
        de desenvolvimento, sempre focado em entregar soluções de qualidade e
        com excelente experiência do usuário.
      </p>
    </AboutContainer>
  )
}
