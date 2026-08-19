import { About } from '../../components/About'
import { Experience } from '../../components/Experience'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Presentation } from '../../components/Presentation'
import { Projects } from '../../components/Projects'
import { ReturnToHeader } from '../../components/ReturnToHeader'
import { Skills } from '../../components/Skills'
import { useThemeControl } from '../../App'

export function Classic() {
  const { theme, handleSwitchTheme } = useThemeControl()

  return (
    <>
      <Header theme={theme.title} handleSwitchTheme={handleSwitchTheme} />
      <Presentation />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
      <ReturnToHeader />
    </>
  )
}
