import styled from 'styled-components'
import { rpg } from '../palette'

export const Box = styled.div`
  pointer-events: auto;
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  width: min(940px, calc(100% - 2rem));
  max-height: min(70vh, 620px);
  display: flex;
  flex-direction: column;

  background: linear-gradient(${rpg.panelTop}, ${rpg.panelBottom});
  border: 3px solid ${rpg.frame};
  outline: 3px solid ${rpg.frameDark};
  border-radius: 8px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.45);
  color: ${rpg.text};
`

export const Speaker = styled.span`
  position: absolute;
  top: -0.85rem;
  left: 1rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  color: ${rpg.frameDark};
  background: ${rpg.gold};
  border: 2px solid ${rpg.frameDark};
  padding: 0.3rem 0.55rem;
  border-radius: 4px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.1rem 0.6rem;

  h2 {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.72rem;
    line-height: 1.5;
    color: ${rpg.gold};
    text-shadow: 2px 2px 0 ${rpg.frameDark};
  }
`

export const Close = styled.button`
  border: 2px solid ${rpg.frame};
  background: transparent;
  color: ${rpg.text};
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${rpg.frame};
    color: ${rpg.frameDark};
  }
`

export const Speech = styled.p`
  padding: 0.4rem 1.1rem 0.9rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.62rem;
  line-height: 2;
  color: ${rpg.title};
  min-height: 3rem;
  border-bottom: 2px solid ${rpg.frame}44;

  i {
    display: inline-block;
    width: 0.5em;
    height: 1em;
    margin-left: 2px;
    background: ${rpg.gold};
    vertical-align: -2px;
    animation: blink 0.7s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`

export const Body = styled.div`
  overflow-y: auto;
  padding: 0.9rem 1.1rem 1.2rem;
  font-size: 0.95rem;
  line-height: 1.7;

  strong {
    color: ${rpg.gold};
  }

  h3 {
    color: ${rpg.title};
    font-size: 1rem;
  }

  scrollbar-color: ${rpg.frame} transparent;
`

export const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

export const Job = styled.article`
  padding: 0.9rem 1rem;
  margin-bottom: 0.85rem;
  background: rgba(20, 16, 42, 0.55);
  border: 1px solid ${rpg.frame}33;
  border-left: 3px solid ${rpg.gold};
  border-radius: 6px;

  .period {
    display: inline-block;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    color: ${rpg.gold};
    background: ${rpg.gold}1e;
    border: 1px solid ${rpg.gold}55;
    padding: 0.3rem 0.55rem;
    border-radius: 4px;
    margin-bottom: 0.55rem;
  }

  h4 {
    font-size: 0.85rem;
    font-weight: 500;
    color: ${rpg.accent};
    margin-bottom: 0.4rem;
  }
`

export const Bullets = styled.ul`
  padding-left: 1.1rem;

  li {
    margin-top: 0.35rem;
    font-size: 0.9rem;
  }
`

export const ProjectCard = styled.article`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  padding: 0.9rem 1rem;
  margin-bottom: 0.85rem;
  background: rgba(20, 16, 42, 0.55);
  border: 1px solid ${rpg.frame}33;
  border-radius: 6px;

  img {
    width: 100%;
    border-radius: 4px;
    border: 2px solid ${rpg.frame}66;
  }

  .tag {
    display: inline-block;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.45rem;
    text-transform: uppercase;
    color: ${rpg.gold};
    background: ${rpg.gold}1e;
    border: 1px solid ${rpg.gold}55;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.88rem;
    margin: 0.3rem 0 0.55rem;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;

  li {
    font-size: 0.72rem;
    padding: 0.2rem 0.55rem;
    border: 1px solid ${rpg.frame}55;
    border-radius: 4px;
    color: ${rpg.text};
    background: rgba(20, 16, 42, 0.5);
  }
`

export const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.6rem;

  a {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    text-decoration: none;
    color: ${rpg.frameDark};
    background: ${rpg.gold};
    border: 2px solid ${rpg.frameDark};
    box-shadow: 2px 2px 0 ${rpg.frameDark};
    padding: 0.45rem 0.6rem;
    border-radius: 4px;
    transition: transform 0.1s;

    &:hover {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0 ${rpg.frameDark};
    }
  }
`

export const SkillGroup = styled.section`
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 0.5rem;
  }
`

export const ContactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.6rem;
  }

  span {
    min-width: 6rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    text-transform: uppercase;
    color: ${rpg.gold};
  }

  a {
    color: ${rpg.title};
    text-decoration: none;
    border-bottom: 1px solid ${rpg.gold};

    &:hover {
      color: ${rpg.gold};
    }
  }
`
