import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import imageSvg from '../../assets/image.svg'
import { ContactModal } from './ContactModal'
import { PresentationContainer } from './styles'

export function Presentation() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const containerVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: -200 },
  }

  function handleOpenContactModal() {
    setIsContactModalOpen(true)
  }

  function handleCloseContactModal() {
    setIsContactModalOpen(false)
  }

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <PresentationContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="infos">
        <h1>
          Olá, me chamo <br /> Endrio Alberton
        </h1>
        <p>Dev Full-Stack | React | Python & Java</p>
        <div className="buttons">
          <a
            href="/Desenvolvedor front-end React - Endrio Alberton.pdf"
            download="Curriculo-Endrio-Alberton.pdf"
            type="application/pdf"
          >
            <button type="button">Download CV</button>
          </a>
          <button
            onClick={handleOpenContactModal}
            className="black_button"
            type="button"
          >
            Entrar em contato
          </button>
        </div>
      </div>
      <div className="image">
        <img src={imageSvg} alt="Imagem" />
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onRequestClose={handleCloseContactModal}
      />
    </PresentationContainer>
  )
}
