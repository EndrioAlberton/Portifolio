import autoAvaliaFng from '../../assets/autoAvalia.png'
import salaManagerPng from '../../assets/salaManager.png'
import tccCdbPng from '../../assets/tccCdb.png'
import eduToolsPng from '../../assets/eduTools.png'
import wheyPng from '../../assets/whey.png'

const salaManager = {
  title: 'Sala Manager',
  description: 'Sistema para gerenciar salas de aulas, permitindo controle de salas e também das ocupações de cada sala.',
  techs: ['React','TypeScript','Node','TypeORM','MySQL','Nest','Zod','Axios'],
  image: salaManagerPng,
  tag: 'Projeto Pessoal',
  githubFront: 'https://github.com/EndrioAlberton/sala-manager-web',
  githubBack: 'https://github.com/EndrioAlberton/sala-manager-api',
  deploy: 'https://salamanager.endrioalberton.com.br',
}

const tccCdb = {
  title: 'Catálogo de Bibliotecas',
  description: 'Sistema que permite gerir os catálogos de múltiplas bibliotecas',
  techs: ['React', 'TypeScript', 'Node', 'Express', 'TypeORM', 'MySQL', 'Firebase', 'Axios'],
  image: tccCdbPng,
  tag: 'TCC',
  githubFront: 'https://github.com/EndrioAlberton/Tcc-Front',
  githubBack: 'https://github.com/EndrioAlberton/Tcc-Back',
  documentation: 'https://drive.google.com/file/d/1sGBZr86HmCNlsYCaR9MoRgqBfL4IW2Vl/view?usp=sharing',
}

const eduTools = {
  title: 'EduApps',
  tag: 'Iniciação Científica',
  description: 'Desenvolvimento de sistema web que permita aos professores da Educação Básica buscar e acessar ferramentas tecnológicas digitais que possam ser utilizadas em sala de aula',
  techs: ['React', 'TypeScript', 'Node', 'Express','Firebase'],
  image: eduToolsPng,
  github: 'https://github.com/EndrioAlberton/buscaFerramentas',
  deploy: 'https://eduapps.poa.ifrs.edu.br/',
}


const autoAvalia = {
  title: 'AutoAvalia',
  tag: 'Iniciação Científica',
  description: 'Plataforma web de autoavaliação e diagnóstico pedagógico. Professores respondem questionários sobre suas práticas, gestores acompanham a equipe, estudantes fornecem feedback anônimo e a secretaria gerencia a rede de escolas.',
  techs: ['React', 'TypeScript', 'Vite', 'Material-UI', 'Firebase', 'Recharts', 'jsPDF'],
  image: autoAvaliaFng,
  github: 'https://github.com/EndrioAlberton/Auto-Avalia',
  deploy: 'https://autoavalia.endrioalberton.com.br',
}

const wheyMais = {
  title: 'WheyMais',
  tag: 'Projeto Pessoal',
  description: 'Comparador de whey protein com ordenação por custo por 30g de proteína e monetização por afiliados do Mercado Livre.',
  techs: ['Next.js', 'Django', 'Python', 'MySQL', 'Mercado Livre API'],
  image: wheyPng,
  github: 'https://github.com/EndrioAlberton/projeto-whey',
  deploy: 'https://whey.endrioalberton.com.br/',
}

export { salaManager, tccCdb, eduTools, wheyMais, autoAvalia }
