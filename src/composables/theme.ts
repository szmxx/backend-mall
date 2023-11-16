const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addListener((e) => {
  useTheme(e.matches ? 'dark' : 'light')
})
export const currentTheme = ref(localStorage.getItem('theme') || 'light')
export async function useTheme(theme: string) {
  currentTheme.value = theme
  if (theme === 'dark') {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
  localStorage.setItem('theme', theme)
}
