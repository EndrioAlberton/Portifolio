import { Star } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import { InfosContainer, SkillContainer } from './styles'

interface Props {
  svg: any
  tech: string
}

export function Skill({ svg, tech }: Props) {

  return (
    <SkillContainer>
      <div className="img">{svg}</div>
      <InfosContainer className="infos">
        <h2>{tech}</h2>
      </InfosContainer>
    </SkillContainer>
  )
}
