import styled from 'styled-components'

export const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
`
