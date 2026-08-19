import { FooterContainer } from './styles'

export function Footer() {
  return (
    <FooterContainer>
      <h3>
        Desenvolvido por <span>Endrio Alberton</span>
      </h3>
      <p>
        Tiles do modo jogo por{' '}
        <a
          href="https://kenney.nl/assets/rpg-urban-pack"
          target="_blank"
          rel="noreferrer"
        >
          Kenney
        </a>{' '}
        (CC0)
      </p>
    </FooterContainer>
  )
}
