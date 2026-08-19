import styled from 'styled-components'

export const Stage = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #14102a;
`

export const Canvas = styled.div`
  position: absolute;
  inset: 0;

  canvas {
    display: block;
  }
`
