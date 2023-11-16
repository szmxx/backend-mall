import { App } from 'vue'
import './registerStyle'
import { install as installRouter } from '@/route'
import { install as installStore } from '@/store'
import installProperty from './registerProperty'
import installDirective from './directives/index'
import i18n from '@/locales'
export default (app: App) => {
  app.use(i18n)
  installRouter(app)
  installStore(app)
  installDirective(app)
  installProperty(app)
}
