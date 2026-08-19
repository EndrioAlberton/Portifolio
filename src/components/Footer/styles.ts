import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  padding: 1rem 0;
  background: var(--secondary);
  margin-top: 11.5rem;

  h3 {
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.3rem;
    color: var(--title);

    span {
      color: var(--primary);
    }
  }

  p {
    font-size: 0.8rem;
    color: var(--text);

    a {
      color: var(--primary);
    }
  }
`
