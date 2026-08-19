import styled from 'styled-components'
import { rpg } from '../palette'

export const Screen = styled.div`
  pointer-events: auto;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(10, 8, 22, 0.72);
`

export const Panel = styled.div`
  width: min(660px, 100%);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  padding: 1.6rem 1.6rem 1.2rem;

  background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
  border: 3px solid ${rpg.frame};
  outline: 3px solid ${rpg.frameDark};
  border-radius: 8px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.45);
  color: ${rpg.text};

  .tip {
    font-size: 0.85rem;
    color: ${rpg.dim};
    margin-bottom: 1.2rem;
  }
`

export const Title = styled.h1`
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(0.9rem, 3.4vw, 1.4rem);
  line-height: 1.6;
  text-align: center;
  color: ${rpg.gold};
  text-shadow: 3px 3px 0 ${rpg.frameDark};
`

export const Subtitle = styled.p`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${rpg.dim};
  margin: 0.6rem 0 1.4rem;
`

export const Keys = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.55rem 1rem;
  align-items: baseline;
  margin-bottom: 1.1rem;

  dt {
    display: flex;
    gap: 0.25rem;
    justify-content: flex-end;
  }

  dd {
    font-size: 0.88rem;
  }

  kbd {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    line-height: 1;
    padding: 0.4rem 0.45rem;
    border: 2px solid ${rpg.frame};
    border-bottom-width: 4px;
    border-radius: 4px;
    color: ${rpg.gold};
    background: ${rpg.frameDark};
    white-space: nowrap;
  }
`

export const Places = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1rem;
  padding: 0.9rem 1rem;
  background: rgba(20, 16, 42, 0.55);
  border: 1px solid ${rpg.frame}33;
  border-radius: 6px;

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    font-size: 0.88rem;
  }

  b {
    min-width: 7.5rem;
    color: ${rpg.gold};
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    text-transform: uppercase;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;
`

export const Start = styled.button`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.72rem;
  padding: 1rem;
  color: ${rpg.frameDark};
  background: ${rpg.gold};
  border: 3px solid ${rpg.frameDark};
  box-shadow: 4px 4px 0 ${rpg.frameDark};
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s;

  &:hover,
  &:focus-visible {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 ${rpg.frameDark};
  }
`

export const Classic = styled.a`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  line-height: 1.7;
  text-align: center;
  text-decoration: none;
  padding: 0.85rem;
  color: ${rpg.title};
  background: transparent;
  border: 2px dashed ${rpg.frame};
  border-radius: 6px;

  &:hover {
    background: ${rpg.frame}22;
    color: ${rpg.gold};
  }
`

export const Credit = styled.p`
  font-size: 0.7rem;
  text-align: center;
  color: ${rpg.dim};

  a {
    color: ${rpg.gold};
  }
`
