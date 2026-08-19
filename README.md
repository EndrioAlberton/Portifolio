# Portfólio

Portfólio pessoal em dois modos:

- **`/`**: uma cidade 2D explorável no estilo dos RPGs clássicos. Cada prédio
  guarda uma seção do portfólio: entre pela porta para ler. A rua tem carros e
  sinaleira; atravessar no vermelho conta ponto.
- **`/classico`**: o mesmo conteúdo em página tradicional, para quem tem pressa
  ou usa leitor de tela.

## Tecnologias

- React 18 + TypeScript
- Phaser 4 (engine do modo jogo)
- styled-components
- Vite

## Rodando

```bash
npm install
npm run dev
```

Durante o desenvolvimento, `/tiles.html` lista o tileset completo com os
índices em uso, útil para editar o mapa em `src/game/world/map.ts`.

## Créditos

Tiles e sprites do [RPG Urban Pack](https://kenney.nl/assets/rpg-urban-pack)
do Kenney, licença CC0.
