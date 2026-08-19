import styled from 'styled-components'
import { rpg } from '../palette'

export const Hud = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  font-family: 'DM Sans', sans-serif;
`

export const TopBar = styled.header`
  pointer-events: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: linear-gradient(rgba(20, 16, 42, 0.92), transparent);

  strong {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.62rem;
    color: ${rpg.gold};
    text-shadow: 2px 2px 0 ${rpg.frameDark};
  }

  nav {
    display: flex;
    gap: 0.5rem;
  }

  a,
  button {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    text-decoration: none;
    text-transform: uppercase;
    color: ${rpg.title};
    background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
    border: 2px solid ${rpg.frame};
    box-shadow: 2px 2px 0 ${rpg.frameDark};
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.1s;

    &:hover {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0 ${rpg.frameDark};
      color: ${rpg.gold};
    }
  }
`

export const Hint = styled.p`
  position: absolute;
  bottom: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  color: ${rpg.dim};
  text-shadow: 1px 1px 0 ${rpg.frameDark};
  white-space: nowrap;

  @media (pointer: coarse) {
    display: none;
  }
`

export const Prompt = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 2.5rem);
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  line-height: 1.6;
  color: ${rpg.title};
  background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
  border: 2px solid ${rpg.frame};
  box-shadow: 3px 3px 0 ${rpg.frameDark};
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  white-space: nowrap;
  animation: rise 0.18s ease-out;

  @keyframes rise {
    from {
      opacity: 0;
      transform: translate(-50%, 3.2rem);
    }
  }
`

export const Action = styled.button`
  display: none;
  pointer-events: auto;
  position: absolute;
  right: 1.25rem;
  bottom: 2.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 3px solid ${rpg.frame};
  background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
  box-shadow: 3px 3px 0 ${rpg.frameDark};
  color: ${rpg.gold};
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 ${rpg.frameDark};
  }

  @media (pointer: coarse) {
    display: block;
  }
`

export const Score = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', monospace;
  font-size: 1.1rem;
  color: ${rpg.frameDark};
  background: ${rpg.gold};
  border: 2px solid ${rpg.frameDark};
  box-shadow: 3px 3px 0 ${rpg.frameDark};
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
`
