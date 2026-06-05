import styled from 'styled-components'

export const ProjectTag = styled.span`
  display: inline-block;
  margin-top: 0.4rem;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--primary);
  color: var(--background);
  width: fit-content;
`

export const ProjectContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  max-width: 20rem;
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  border-radius: 8px;
  box-sizing: border-box;
  background: var(--secondary);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--primary);
    border-top-color: var(--primary);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  img {
    max-width: 18.5rem;
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  h3 {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: var(--title);
  }

  p {
    margin-top: 0.2rem;
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: var(--text);
  }
`
