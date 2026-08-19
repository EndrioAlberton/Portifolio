import { projects } from '../../content/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Project } from './Project'
import { ProjectsContainer, ProjectsList, Title } from './styles'

export function Projects() {
  return (
    <ProjectsContainer id="projects" {...useScrollReveal(-100)}>
      <Title>Projetos</Title>
      <ProjectsList>
        {projects.map((project) => (
          <Project key={project.title} project={project} />
        ))}
      </ProjectsList>
    </ProjectsContainer>
  )
}
