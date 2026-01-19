import { Container } from './styles'

interface MenuProps {
  handleClickMenu: () => void
}

export function Menu({ handleClickMenu }: MenuProps) {
  function handleClickOption() {
    const open = true
    handleClickMenu()
    document.body.style.overflow = open ? 'initial' : 'hidden'
  }

  return (
    <Container>
      <ul>
        <li>
          <a href="./#about" onClick={handleClickOption}>
            Sobre mim
          </a>
        </li>
        <li>
          <a href="./#experience" onClick={handleClickOption}>
            Experiência
          </a>
        </li>
        <li>
          <a href="./#projects" onClick={handleClickOption}>
            Projetos
          </a>
        </li>
        <li>
          <a href="./#skills" onClick={handleClickOption}>
            Skills
          </a>
        </li>
      </ul>
    </Container>
  )
}
