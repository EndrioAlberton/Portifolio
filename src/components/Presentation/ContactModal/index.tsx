import githubSvg from '../../../assets/github.svg'

import Modal from 'react-modal'
import { Container } from './styles'
import { EnvelopeSimple, LinkedinLogo, Phone, X } from 'phosphor-react'

interface ContactModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function ContactModal({ isOpen, onRequestClose }: ContactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <X color="#A8A8B3" size={24} />
      </button>

      <Container>
        <h2>Contatos</h2>
        <div>
          <Phone color="#9479d5" size={32} />
          <span>(51) 98509-2381</span>
        </div>
        <div>
          <EnvelopeSimple color="#9479d5" size={32} />
          <span>endrio.alberton@gmail.com</span>
        </div>
        <div>
          <LinkedinLogo color="#9479d5" size={32} />
          <span>
            <a
              href="https://www.linkedin.com/in/endrio-alberton-8482a6223/"
              target="_blank"
              rel="noreferrer"
            >
              Endrio Alberton Correa Nunes
            </a>
          </span>
        </div>
        <div>
          <img src={githubSvg} width="32" height="32" alt="Github" />
          <span>
            <a
              href="https://github.com/EndrioAlberton"
              target="_blank"
              rel="noreferrer"
            >
              EndrioAlberton
            </a>
          </span>
        </div>
      </Container>
    </Modal>
  )
}
