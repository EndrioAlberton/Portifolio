// Um caractere por tile. A legenda está em tiles.ts:
//   .  calçada        #  asfalto      -  faixa central   =  faixa de pedestre
//   B  prédio         w/W  prédio com janela             @  spawn
//   a  porta Sobre    e  porta Experiência    p  porta Projetos  (pisar = entrar)
//   s  quadro de missões Skills   c  orelhão Contato     F  fonte
//   T  árvore   t  pinheiro   A  árvore alta   b  floreira   f  hidrante   x  lixeira
export const town = [
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
  'T..........................................T',
  'T..BwwBBwwB.....BWWBBWWBBWWB.....BwwBwwB...T',
  'T..BBBBBBBB.....BBBBBBBBBBBB.....BBBBBBB...T',
  'T..BBBaBBBB.....BBBBBpBBBBBB.....BBBeBBB...T',
  'T..........................................T',
  'T...A....b....f.......b.....A....b.....x...T',
  'T..........................................T',
  '######====##################====############',
  '------====------------------====------------',
  '######====##################====############',
  'T..........................................T',
  'T..A...........FFF.......A.............A...T',
  'T..............FFF.........................T',
  'T....s.........FFF...............c.........T',
  'T..........................................T',
  'T......b.......@..........b.........t......T',
  'T...x..............T..............x........T',
  'T..........................................T',
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
]
