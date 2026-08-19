import { experience } from '../../content/experience'
import { highlight } from '../../content/highlight'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  ExperienceContainer,
  Timeline,
  TimelineCard,
  TimelineItem,
} from './styles'

export function Experience() {
  return (
    <ExperienceContainer id="experience" {...useScrollReveal()}>
      <h2>Experiência Profissional</h2>

      <Timeline>
        {experience.map((job) => (
          <TimelineItem key={`${job.company}-${job.period}`}>
            <TimelineCard>
              <span className="period">{job.period}</span>
              <h3>{job.role}</h3>
              <h4>{job.company}</h4>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{highlight(bullet)}</li>
                ))}
              </ul>
            </TimelineCard>
          </TimelineItem>
        ))}
      </Timeline>
    </ExperienceContainer>
  )
}
