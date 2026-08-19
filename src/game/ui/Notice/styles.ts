import styled from 'styled-components'
import { rpg } from '../palette'

export const Ok = styled.button`
  align-self: flex-end;
  margin: 0.2rem 1.1rem 1rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  padding: 0.7rem 1rem;
  color: ${rpg.frameDark};
  background: ${rpg.gold};
  border: 2px solid ${rpg.frameDark};
  box-shadow: 3px 3px 0 ${rpg.frameDark};
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 ${rpg.frameDark};
  }
`
