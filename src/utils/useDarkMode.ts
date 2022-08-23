import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [mode, setMode] = useState<'dark' | 'light'>('light')
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light'
        console.log(colorScheme) // "dark" or "light"
        setMode(colorScheme)
      })
  }, [])
  return { mode, setMode }
}

export default useDarkMode
