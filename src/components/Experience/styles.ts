import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ExperienceContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`

export const ExperienceCard = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .period {
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
    font-size: 0.95rem;
    white-space: nowrap;
  }

  .content {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme.colors.text};
    }

    h4 {
      font-size: 1.1rem;
      color: ${(props) => props.theme.colors.text};
      margin-bottom: 1rem;
      font-weight: 500;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;
        color: ${(props) => props.theme.colors.text};

        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: ${(props) => props.theme.colors.primary};
          font-size: 1.2rem;
        }

        strong {
          color: ${(props) => props.theme.colors.primary};
          font-weight: 600;
        }
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.5rem;

    .period {
      white-space: normal;
      margin-bottom: 0.5rem;
    }

    .content {
      h3 {
        font-size: 1.3rem;
      }

      h4 {
        font-size: 1rem;
      }
    }
  }
`
