/*
 * @Author: cola
 * @Date: 2022-07-08 16:16:07
 * @LastEditors: cola
 * @Description:
 */
const topFiles = import.meta.glob('./*.json', { eager: true })
const bottomFiles = import.meta.glob('./*/*.json', { eager: true })
const modules: Record<string, any> = {}
import { IModule } from '@/locales/types'

for (const [path, module] of Object.entries({ ...topFiles, ...bottomFiles })) {
  const name = path.replace(/^\.\//, '').replace(/\.json$/, '')
  path_to_obj(name, (module as IModule).default)
}

// 路径层级解析
function path_to_obj(path: string, value: Record<string, unknown>) {
  const pathList = path.split('/')
  let obj = modules
  for (let i = 0; i < pathList.length; i++) {
    if (i === pathList.length - 1) {
      obj[pathList[i]] = value
    } else {
      obj[pathList[i]] = Object.assign({}, obj[pathList[i]])
    }
    obj = obj[pathList[i]] as Record<string, unknown>
  }
}

export default {
  ...modules,
}
