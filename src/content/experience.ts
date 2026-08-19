export interface Job {
  period: string
  role: string
  company: string
  bullets: string[]
}

export const experience: Job[] = [
  {
    period: 'Mai 2025 até hoje',
    role: 'Desenvolvedor Full-Stack',
    company: 'Maxiquim',
    bullets: [
      'Desenvolvimento de interfaces e funcionalidades para aplicações web utilizando **React e Next.js**, com foco em performance, SEO, responsividade e experiência do usuário',
      'Atuação no desenvolvimento backend em **Python**, estruturando APIs RESTful eficientes e seguras, integradas a bancos de dados **MySQL**, com foco em escalabilidade, organização do código e boas práticas de arquitetura',
      'Implementação de processos automatizados para sincronização de dados internos com fontes externas (como a Receita Federal), garantindo consistência, atualização e confiabilidade das informações',
      'Desenvolvimento de agentes inteligentes para consulta de dados internos utilizando técnicas de **RAG (Retrieval-Augmented Generation)**, otimizando o acesso à informação e apoiando a tomada de decisão',
    ],
  },
  {
    period: 'Ago 2024 até hoje',
    role: 'Bolsista de Iniciação Científica',
    company: 'Instituto Federal do Rio Grande do Sul (IFRS)',
    bullets: [
      'Desenvolvimento de sistema web que permite aos professores da Educação Básica buscar e acessar ferramentas tecnológicas digitais para uso em sala de aula',
      'Trabalho com **React, TypeScript, Node.js, Express e Firebase**',
    ],
  },
  {
    period: 'Jul 2024 a Mai 2025',
    role: 'Técnico em Segurança Tecnológica e Vigilância Patrimonial',
    company: 'Instituto Federal Sul-rio-grandense',
    bullets: [
      'Configuração e manutenção de redes, computadores e impressoras',
      'Suporte técnico ao usuário',
    ],
  },
  {
    period: '2024',
    role: 'Programa de Bolsas: Back-end Development',
    company: 'Compass UOL',
    bullets: [
      'Especialização em desenvolvimento Back-end com **Spring Boot e AWS**',
      'Trabalho com API REST, Git, GitHub, Java, Metodologias Ágeis e Testes de Software',
    ],
  },
]
