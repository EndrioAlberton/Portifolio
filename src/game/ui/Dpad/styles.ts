import styled from 'styled-components'
import { rpg } from '../palette'

export const Pad = styled.div`
  display: none;
  pointer-events: auto;
  position: absolute;
  left: 1rem;
  bottom: 1.25rem;

  grid-template-areas:
    '. up .'
    'left . right'
    '. down .';
  gap: 0.35rem;
  touch-action: none;

  button {
    width: 3.1rem;
    height: 3.1rem;
    border: 2px solid ${rpg.frame};
    border-radius: 8px;
    background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
    box-shadow: 2px 2px 0 ${rpg.frameDark};
    color: ${rpg.gold};
    font-size: 1rem;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: translate(2px, 2px);
      box-shadow: none;
    }
  }

  @media (pointer: coarse) {
    display: grid;
  }
`
