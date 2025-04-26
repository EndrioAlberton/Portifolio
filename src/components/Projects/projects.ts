import salaManagerPng from '../../assets/salaManager.png'
import tccCdbPng from '../../assets/tccCdb.png'
import eduToolsPng from '../../assets/eduTools.png'

const salaManager = {
  title: 'Sala Manager',
  description: 'Sistema para gerenciar salas de aulas, permitindo controle de salas e também das opcupações de cada sala. ',
  techs: ['React','TypeScript','Node','TypeORM','MySQL','Nest','Zod','Axios'],
  image: salaManagerPng,
  githubFront: 'https://github.com/EndrioAlberton/sala-manager-web',
  githubBack: 'https://github.com/EndrioAlberton/sala-manager-api',
  deploy: 'https://salamanager.endrioalberton.com.br',
}

const tccCdb = {
  title: 'Catálogo de Bibliotecas',
  description: 'Sistema que permite gerir os catálagos de multíplicas bibliotecas',
  techs: ['React', 'TypeScript', 'Node', 'Express', 'TypeORM', 'MySQL', 'Firebase', 'Axios'],
  image: tccCdbPng,
  githubFront: 'https://github.com/EndrioAlberton/Tcc-Front',
  githubBack: 'https://github.com/EndrioAlberton/Tcc-Back',
  documentation: 'https://drive.google.com/file/d/1sGBZr86HmCNlsYCaR9MoRgqBfL4IW2Vl/view?usp=sharing',
}

const eduTools = {
  title: 'Acervo de ferramentas para professores',
  description: 'Desenvolvimento de sistema web que permita aos professores da Educação Básica buscar e acessar ferramentas tecnológicas digitais que possam ser utilizadas em sala de aula',
  techs: ['React', 'TypeScript', 'Node', 'Express','Firebase'],
  image: eduToolsPng,
  github: 'https://github.com/EndrioAlberton/buscaFerramentas',
}


export { salaManager, tccCdb, eduTools }
