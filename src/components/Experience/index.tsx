import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExperienceContainer, Timeline, TimelineItem, TimelineCard } from './styles'

export function Experience() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const containerVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: -200 },
  }

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <ExperienceContainer
      id="experience"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <h2>Experiência Profissional</h2>

      <Timeline>
        <TimelineItem>
          <TimelineCard>
            <span className="period">Mai 2025 — Atual</span>
            <h3>Desenvolvedor Full-Stack</h3>
            <h4>Maxiquim</h4>
            <ul>
              <li>
                Desenvolvimento de interfaces e funcionalidades para aplicações web utilizando{' '}
                <strong>React e Next.js</strong>, com foco em performance, SEO, responsividade e
                experiência do usuário
              </li>
              <li>
                Atuação no desenvolvimento backend em <strong>Python</strong>, estruturando APIs
                RESTful eficientes e seguras, integradas a bancos de dados <strong>MySQL</strong>,
                com foco em escalabilidade, organização do código e boas práticas de arquitetura
              </li>
              <li>
                Implementação de processos automatizados para sincronização de dados internos com
                fontes externas (como a Receita Federal), garantindo consistência, atualização e
                confiabilidade das informações
              </li>
              <li>
                Desenvolvimento de agentes inteligentes para consulta de dados internos utilizando
                técnicas de <strong>RAG (Retrieval-Augmented Generation)</strong>, otimizando o
                acesso à informação e apoiando a tomada de decisão
              </li>
            </ul>
          </TimelineCard>
        </TimelineItem>

        <TimelineItem>
          <TimelineCard>
            <span className="period">Ago 2024 — Atual</span>
            <h3>Bolsista de Iniciação Científica</h3>
            <h4>Instituto Federal do Rio Grande do Sul (IFRS)</h4>
            <ul>
              <li>
                Desenvolvimento de sistema web que permite aos professores da Educação Básica
                buscar e acessar ferramentas tecnológicas digitais para uso em sala de aula
              </li>
              <li>
                Trabalho com <strong>React, TypeScript, Node.js, Express e Firebase</strong>
              </li>
            </ul>
          </TimelineCard>
        </TimelineItem>

        <TimelineItem>
          <TimelineCard>
            <span className="period">Jul 2024 — Mai 2025</span>
            <h3>Técnico em Segurança Tecnológica e Vigilância Patrimonial</h3>
            <h4>Instituto Federal Sul-rio-grandense</h4>
            <ul>
              <li>Configuração e manutenção de redes, computadores e impressoras</li>
              <li>Suporte técnico ao usuário</li>
            </ul>
          </TimelineCard>
        </TimelineItem>

        <TimelineItem>
          <TimelineCard>
            <span className="period">2024</span>
            <h3>Programa de Bolsas — Back-end Development</h3>
            <h4>Compass UOL</h4>
            <ul>
              <li>
                Especialização em desenvolvimento Back-end com{' '}
                <strong>Spring Boot e AWS</strong>
              </li>
              <li>
                Trabalho com API REST, Git, GitHub, Java, Metodologias Ágeis e Testes de Software
              </li>
            </ul>
          </TimelineCard>
        </TimelineItem>
      </Timeline>
    </ExperienceContainer>
  )
}
