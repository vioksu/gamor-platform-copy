import { useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state'

export function useTheme() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorageState('theme', {
    defaultValue: defaultDark ? 'dark' : 'light'
  })

  const handleChange = () => setTheme(theme === 'light' ? 'dark' : 'light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme])

  return { theme, handleChange }
}
