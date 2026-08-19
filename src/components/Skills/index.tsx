import { hardSkills, softSkills } from '../../content/skills'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Skill } from './Skill'
import { logos } from './logos'
import { Description, SkillsContainer, SkillsList, Title } from './styles'

export function Skills() {
  return (
    <SkillsContainer id="skills" {...useScrollReveal()}>
      <Title>Hard Skills</Title>
      <Description>
        Passe o mouse por cima ou clique para ver os nomes
      </Description>
      <SkillsList>
        {hardSkills.map((tech) => (
          <Skill key={tech} tech={tech} svg={logos[tech]} />
        ))}
      </SkillsList>

      <Title>Soft Skills</Title>
      <SkillsList>
        {softSkills.map((tech) => (
          <Skill key={tech} tech={tech} svg={logos[tech]} />
        ))}
      </SkillsList>
    </SkillsContainer>
  )
}
