import { ComponentType } from 'react'
import { experience } from '../../../content/experience'
import { highlight } from '../../../content/highlight'
import { contacts, profile } from '../../../content/profile'
import { projects } from '../../../content/projects'
import { hardSkills, softSkills } from '../../../content/skills'
import { ZoneId } from '../../world/zones'
import {
  Bullets,
  Chips,
  ContactList,
  Job,
  Paragraphs,
  ProjectCard,
  ProjectLinks,
  SkillGroup,
} from './styles'

export const intros: Record<ZoneId, string> = {
  about: 'Entra, fica à vontade! Essa é a minha casa.',
  experience: 'Bem-vindo ao escritório. Cada mesa aqui conta uma fase.',
  projects: 'Essa é a galeria. Tudo aqui foi construído do zero.',
  skills: 'O quadro de missões. Aqui ficam as tecnologias que eu domino.',
  contact: 'Um orelhão. É por aqui que você me acha.',
}

function About() {
  return (
    <Paragraphs>
      {profile.bio.map((paragraph) => (
        <p key={paragraph}>{highlight(paragraph)}</p>
      ))}
    </Paragraphs>
  )
}

function Experience() {
  return (
    <>
      {experience.map((job) => (
        <Job key={`${job.company}-${job.period}`}>
          <span className="period">{job.period}</span>
          <h3>{job.role}</h3>
          <h4>{job.company}</h4>
          <Bullets>
            {job.bullets.map((bullet) => (
              <li key={bullet}>{highlight(bullet)}</li>
            ))}
          </Bullets>
        </Job>
      ))}
    </>
  )
}

function Projects() {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.title}>
          <img src={project.image} alt={project.title} loading="lazy" />
          <div>
            <span className="tag">{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Chips>
              {project.techs.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </Chips>
            <ProjectLinks>
              {project.deploy && (
                <a href={project.deploy} target="_blank" rel="noreferrer">
                  Ver online
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {project.githubFront && (
                <a href={project.githubFront} target="_blank" rel="noreferrer">
                  GitHub front
                </a>
              )}
              {project.githubBack && (
                <a href={project.githubBack} target="_blank" rel="noreferrer">
                  GitHub back
                </a>
              )}
              {project.documentation && (
                <a
                  href={project.documentation}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentação
                </a>
              )}
            </ProjectLinks>
          </div>
        </ProjectCard>
      ))}
    </>
  )
}

function Skills() {
  return (
    <>
      <SkillGroup>
        <h3>Técnicas</h3>
        <Chips>
          {hardSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </Chips>
      </SkillGroup>
      <SkillGroup>
        <h3>Comportamentais</h3>
        <Chips>
          {softSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </Chips>
      </SkillGroup>
    </>
  )
}

function Contact() {
  return (
    <ContactList>
      {contacts.map((contact) => (
        <li key={contact.label}>
          <span>{contact.label}</span>
          <a href={contact.href} target="_blank" rel="noreferrer">
            {contact.value}
          </a>
        </li>
      ))}
    </ContactList>
  )
}

export const sections: Record<ZoneId, ComponentType> = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  contact: Contact,
}
