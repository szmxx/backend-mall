import { App } from 'vue'
import './registerStyle'

import { install as installStore } from '@/store'
import installComponent from './registerComponent'
import installProperty from './registerProperty'
import installDirective from './directives/index'
import i18n from '@/locales'
export default (app: App) => {
  app.use(i18n)
  installStore(app)
  installComponent(app)
  installProperty(app)
  installDirective(app)
}
