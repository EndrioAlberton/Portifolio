import { useState } from 'react'
import { Presentation } from './components/Presentation'
import { Header } from './components/Header'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'
import { Skills } from './components/Skills'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { GlobalStyle } from './styles/global'
import { ReturnToHeader } from './components/ReturnToHeader'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'
import light from './styles/themes/light'

function App() {
  const [theme, setTheme] = useState<DefaultTheme>(dark)

  function handleSwitchTheme() {
    theme.title === 'dark' ? setTheme(light) : setTheme(dark)
  }

  return (
    <ThemeProvider theme={theme}>
      <Header theme={theme.title} handleSwitchTheme={handleSwitchTheme} />
      <Presentation />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
      <ReturnToHeader />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
