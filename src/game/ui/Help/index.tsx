import { useEffect } from 'react'
import { profile } from '../../../content/profile'
import {
  Actions,
  Classic,
  Credit,
  Keys,
  Panel,
  Places,
  Screen,
  Start,
  Subtitle,
  Title,
} from './styles'

const places: [string, string][] = [
  ['Sobre mim', 'a casa vermelha: quem eu sou e onde estudo'],
  ['Experiência', 'o escritório cinza: onde eu já trabalhei'],
  ['Projetos', 'o prédio laranja: o que eu já construí'],
  ['Habilidades', 'o quadro de missões na praça: as tecnologias que uso'],
  ['Contato', 'o orelhão: email, LinkedIn e GitHub'],
]

interface HelpProps {
  onClose: () => void
}

export function Help({ onClose }: HelpProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === 'z')
        onClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <Screen role="dialog" aria-label="Como jogar">
      <Panel>
        <Title>{profile.name}</Title>
        <Subtitle>portfólio em modo RPG</Subtitle>

        <Keys>
          <dt>
            <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd>
          </dt>
          <dd>andar pela cidade (ou as setas)</dd>

          <dt>
            <kbd>Z</kbd>
          </dt>
          <dd>interagir com quadros e orelhões</dd>

          <dt>
            <kbd>I</kbd>
          </dt>
          <dd>abrir esta ajuda</dd>

          <dt>
            <kbd>Esc</kbd>
          </dt>
          <dd>fechar qualquer janela</dd>
        </Keys>

        <Places>
          {places.map(([name, description]) => (
            <li key={name}>
              <b>{name}</b>
              <span>{description}</span>
            </li>
          ))}
        </Places>

        <p className="tip">
          Para entrar num prédio, caminhe até a porta dele. No celular, use o
          direcional e o botão Z na tela.
        </p>

        <Actions>
          <Start type="button" onClick={onClose} autoFocus>
            ▶ Explorar a cidade
          </Start>
          <Classic href="/classico">
            Sem tempo? Leia o portfólio tradicional
          </Classic>
        </Actions>

        <Credit>
          feito com React, TypeScript, Phaser 4 e styled-components · tiles por{' '}
          <a
            href="https://kenney.nl/assets/rpg-urban-pack"
            target="_blank"
            rel="noreferrer"
          >
            Kenney
          </a>{' '}
          (CC0)
        </Credit>
      </Panel>
    </Screen>
  )
}
