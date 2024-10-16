import { AppConfig } from '@/api/public'
import { AppSetting } from '@/types/app'
import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'
import { APP_SETTING } from '@/constants/index'
import { mixColor } from '@/utils/index'
import router from '@/route'

export default defineStore('app', () => {
  const storage = useStorage(APP_SETTING, {
    size: 'default',
    theme: '',
    mode: 'auto',
    lang: 'zh-CN',
  })
  const mode = useColorMode({
    modes: {},
  })

  const navList = ref<Record<string, string>[]>([])

  const lightEl = document.querySelector(':root') as HTMLElement
  const darkEl = document.querySelector(':root.dark') as HTMLElement
  const config = ref({} as AppConfig)
  const setting = ref(storage.value as AppSetting)
  watch(
    () => setting.value.theme,
    (theme) => {
      setPrimaryStyle(theme)
      lightEl?.style?.setProperty?.('--color-primary', theme)
    },
    { immediate: true },
  )
  watch(
    () => setting.value.mode,
    (newVal) => {
      mode.value = newVal
    },
    { immediate: true },
  )
  watch(
    () => setting.value.size,
    (newVal) => {
      setFontStyle(newVal)
      document.documentElement.style['fontSize'] = newVal
    },
    { immediate: true },
  )
  watch(
    () => setting.value.lang,
    async (newVal) => {
      await useLocale(newVal)
      location.reload()
    },
  )
  function setConfig(_config: AppConfig) {
    config.value = _config
  }
  function setSetting(_setting: AppSetting) {
    setting.value = _setting
  }
  function addNavItem(route: Record<string, string>) {
    const index = navList.value.findIndex((item) => item.name === route.name)
    if (index === -1) {
      navList.value.push(route)
    }
  }

  function prevNav(current: string) {
    const index = navList.value.findIndex((item) => item.name === current)
    if (index - 1 >= 0) {
      const name = navList?.value?.[index - 1]?.name
      router.push({ name: name })
    }
  }
  function nextNav(current: string) {
    const index = navList.value.findIndex((item) => item.name === current)
    if (index + 1 <= navList.value.length - 1) {
      const name = navList?.value?.[index + 1]?.name
      router.push({ name: name })
    }
  }
  function closeCurrentNav(current: string) {
    const index = navList.value.findIndex((item) => item.name === current)
    if (navList.value.length > 1) {
      if (index === 0) {
        nextNav(current)
      } else {
        prevNav(current)
      }
      if (index !== -1) {
        navList.value.splice(index, 1)
      }
    } else {
      closeAllNav()
    }
  }
  function closeLeftNav(current: string) {
    const index = navList.value.findIndex((item) => item.name === current)
    if (index !== -1) {
      navList.value.splice(0, index)
    }
  }
  function closeRightNav(current: string) {
    const index = navList.value.findIndex((item) => item.name === current)
    if (index !== -1) {
      navList.value.splice(index + 1)
    }
  }
  function closeNav(name: string, current: string) {
    const index = navList.value.findIndex((item) => item.name === name)
    if (index !== -1) {
      navList.value.splice(index, 1)
    }
    if (navList.value.length) {
      if (name === current) {
        prevNav(current)
      }
    } else {
      closeAllNav()
    }
  }
  function closeAllNav() {
    navList.value = [
      {
        name: 'home-panel',
        title: '仪表盘',
      },
    ]
    router.push('/')
  }
  function setFontStyle(size: string) {
    const list = [
      {
        name: 'extra-large',
        rule: 2,
      },
      {
        name: 'large',
        rule: 2,
      },
      {
        name: 'medium',
        rule: 2,
      },
      {
        name: 'base',
        rule: 0,
      },
      {
        name: 'small',
        rule: -1,
      },
      {
        name: 'extra-small',
        rule: -1,
      },
    ]
    list.forEach((item) => {
      lightEl.style.setProperty(
        `--el-font-size-${item.name}`,
        `${parseInt(size) + item.rule}px`,
      )
    })
  }
  function setPrimaryStyle(color: string) {
    lightEl?.style?.setProperty('--el-color-primary', `rgb(${color})`)
    lightEl?.style?.setProperty(
      '--el-color-primary-rgb',
      `${mixColor(color, '#000000', 0)}`,
    )
    lightEl?.style?.setProperty(
      '--el-color-primary-dark-2',
      `${mixColor(color, '#000000', 0.2)}`,
    )
    darkEl?.style?.setProperty(
      '--el-color-primary-dark-2',
      `${mixColor(color, '#ffffff', 0.2)}`,
    )
    ;[3, 5, 7, 8, 9].forEach((number: number) => {
      lightEl?.style?.setProperty(
        `--el-color-primary-light-${number}`,
        `${mixColor(color, '#ffffff', number / 10)}`,
      )

      darkEl?.style?.setProperty(
        `--el-color-primary-light-${number}`,
        `${mixColor(color, '#141414', number / 10)}`,
      )
    })
  }
  return {
    config,
    setting,
    navList,
    setConfig,
    setSetting,
    addNavItem,
    prevNav,
    nextNav,
    closeNav,
    closeAllNav,
    closeCurrentNav,
    closeRightNav,
    closeLeftNav,
  }
})
