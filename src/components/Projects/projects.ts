import pokedexPng from '../../assets/pokedex.png'
import tccCdbPng from '../../assets/tccCdb.png'

const pokedex = {
  title: 'Pokédex',
  description: 'Sistema onde mostra todos os 151 pokemons da primeira geração',
  techs: ['React', 'TypeScript', 'Node', 'PokeAPI'],
  image: pokedexPng,
  github: 'https://github.com/EndrioAlberton/Pokedex',
  deploy: 'https://ts-react-pokedex.web.app',
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


export { pokedex, tccCdb }
