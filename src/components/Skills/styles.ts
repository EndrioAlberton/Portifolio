import { motion } from 'framer-motion'
import styled from 'styled-components'

export const SkillsContainer = styled(motion.div)`
  padding-top: 6rem;
`

export const Title = styled.h2`
  font-size: 2rem;
  line-height: 2.625rem;
  text-align: center;
  color: var(--title);

  &::after {
    content: '';
    display: block;
    margin: 0.6rem auto 0;
    width: 3rem;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
  }
`

export const Description = styled.p`
  font-size: 1.125rem;
  text-align: center;
  color: var(--text);
`

export const SkillsList = styled.div`
  width: 90%;
  max-width: 1120px;
  padding: 0 0.4rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`
