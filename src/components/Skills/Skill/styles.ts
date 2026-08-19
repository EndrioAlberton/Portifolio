import styled from 'styled-components'

export const SkillContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 9.5rem;
  height: 9.5rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--secondary);
  position: relative;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

    .infos {
      display: flex;
    }
  }

  .img {
    svg {
      width: 80px;
      height: 80px;
    }
  }
`

export const InfosContainer = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  position: absolute;
  z-index: 1000;
  bottom: 0;
  background: var(--background);
  padding: 1rem;

  h2 {
    font-size: 1.25rem;
    color: var(--text);
  }
`

export const NameOnly = styled.span`
  padding: 0 1rem;
  text-align: center;
  font-size: 1.05rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.title};
`
