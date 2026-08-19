import { highlight } from '../../content/highlight'
import { profile } from '../../content/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { AboutContainer } from './styles'

export function About() {
  return (
    <AboutContainer id="about" {...useScrollReveal()}>
      <h2>Sobre mim</h2>
      {profile.bio.map((paragraph) => (
        <p key={paragraph}>{highlight(paragraph)}</p>
      ))}
    </AboutContainer>
  )
}
