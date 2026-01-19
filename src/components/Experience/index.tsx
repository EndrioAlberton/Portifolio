import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExperienceCard, ExperienceContainer } from './styles'

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
      
      <ExperienceCard>
        <div className="period">Mai 2025 - Atual</div>
        <div className="content">
          <h3>Estagiário de Desenvolvimento</h3>
          <h4>Maxiquim</h4>
          <ul>
            <li>
              Desenvolvimento de interfaces e funcionalidades para aplicações web utilizando <strong>React e Next.js</strong>, 
              com foco em performance, SEO, responsividade e experiência do usuário
            </li>
            <li>
              Integração de dados de bancos públicos, como o da Receita Federal, aumentando a 
              fidelidade e qualidade das informações da empresa
            </li>
            <li>
              Desenvolvimento de backend em <strong>Python</strong>, estruturando APIs RESTful eficientes e seguras
            </li>
            <li>
              Trabalho com bancos de dados <strong>MySQL</strong>, com atenção à escalabilidade, 
              organização do código e boas práticas de arquitetura
            </li>
          </ul>
        </div>
      </ExperienceCard>

      <ExperienceCard>
        <div className="period">Ago 2024 - Atual</div>
        <div className="content">
          <h3>Bolsista de Desenvolvimento</h3>
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
        </div>
      </ExperienceCard>

      <ExperienceCard>
        <div className="period">Jul 2024 - Mai 2025</div>
        <div className="content">
          <h3>Técnico em Segurança Tecnológica e Vigilância Patrimonial</h3>
          <h4>Instituto Federal Sul-rio-grandense</h4>
          <ul>
            <li>Configuração e manutenção de redes, computadores e impressoras</li>
            <li>Suporte técnico ao usuário</li>
          </ul>
        </div>
      </ExperienceCard>

      <ExperienceCard>
        <div className="period">2024</div>
        <div className="content">
          <h3>Programa de Bolsas - Back-end Development</h3>
          <h4>Compass UOL</h4>
          <ul>
            <li>
              Especialização em desenvolvimento Back-end com <strong>Spring Boot e AWS</strong>
            </li>
            <li>
              Trabalho com API REST, Git, GitHub, Java, Metodologias Ágeis e Testes de Software
            </li>
          </ul>
        </div>
      </ExperienceCard>
    </ExperienceContainer>
  )
}
