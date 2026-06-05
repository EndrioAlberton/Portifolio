import { motion } from 'framer-motion'
import styled from 'styled-components'

export const AboutContainer = styled(motion.div)`
  width: 90%;
  max-width: 1120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    margin-top: 6rem;
    color: var(--title);
    font-size: 2rem;
    line-height: 2.625rem;
    text-align: center;

    &::after {
      content: '';
      display: block;
      margin: 0.6rem auto 0;
      width: 3rem;
      height: 3px;
      background: var(--primary);
      border-radius: 2px;
    }
  }

  p {
    max-width: 745px;
    margin-top: 2rem;
    font-size: 1.125rem;
    line-height: 2rem;
    color: var(--text);
    text-align: center !important;
  }
`
