import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ExperienceContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 3.5rem;
    text-align: center;
    color: ${(props) => props.theme.colors.title};

    &::after {
      content: '';
      display: block;
      margin: 0.6rem auto 0;
      width: 3rem;
      height: 3px;
      background: ${(props) => props.theme.colors.primary};
      border-radius: 2px;
    }
  }
`

export const Timeline = styled.div`
  position: relative;
  padding-left: 2.5rem;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 0.5rem;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.colors.primary},
      transparent
    );
  }
`

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: calc(-2.5rem + 5px);
    top: 1.5rem;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};
    border: 3px solid ${(props) => props.theme.colors.background};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary};
    z-index: 1;
  }
`

export const TimelineCard = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  padding: 1.5rem 1.75rem;
  border-left: 3px solid ${(props) => props.theme.colors.primary};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  }

  .period {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
    text-transform: uppercase;
    letter-spacing: 0.07em;
    background: ${(props) => props.theme.colors.primary}22;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.title};
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  h4 {
    font-size: 0.92rem;
    color: ${(props) => props.theme.colors.text};
    font-weight: 500;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      line-height: 1.65;
      color: ${(props) => props.theme.colors.text};
      font-size: 0.93rem;

      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.colors.primary};
      }

      strong {
        color: ${(props) => props.theme.colors.primary};
        font-weight: 600;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 1.25rem 1.25rem;

    h3 {
      font-size: 1.05rem;
    }

    h4 {
      font-size: 0.88rem;
    }
  }
`
