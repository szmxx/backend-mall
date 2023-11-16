import router from './route'
import NProgress from 'nprogress'
import { isEmpty, assign } from 'lodash-es'
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath })
  }
  console.log(to, from)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
