import { Suspense, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { Loading } from './styles/loading'
import dark from './styles/themes/dark'
import light from './styles/themes/light'

export interface ThemeControl {
  theme: DefaultTheme
  handleSwitchTheme: () => void
}

export function useThemeControl() {
  return useOutletContext<ThemeControl>()
}

function App() {
  const [theme, setTheme] = useState<DefaultTheme>(dark)

  function handleSwitchTheme() {
    theme.title === 'dark' ? setTheme(light) : setTheme(dark)
  }

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading>carregando...</Loading>}>
        <Outlet context={{ theme, handleSwitchTheme }} />
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
