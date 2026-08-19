import { ReactNode } from 'react'
import { InfosContainer, NameOnly, SkillContainer } from './styles'

interface Props {
  tech: string
  svg?: ReactNode
}

export function Skill({ tech, svg }: Props) {
  // Nem toda tecnologia da lista tem logo; nesse caso o nome já é o tile.
  if (!svg) {
    return (
      <SkillContainer>
        <NameOnly>{tech}</NameOnly>
      </SkillContainer>
    )
  }

  return (
    <SkillContainer>
      <div className="img">{svg}</div>
      <InfosContainer className="infos">
        <h2>{tech}</h2>
      </InfosContainer>
    </SkillContainer>
  )
}
