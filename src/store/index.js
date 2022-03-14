import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import menu from './menu'
import serial from './serial'

let Store
export default store(function (/* { ssrContext } */) {
  Store = createStore({
    modules: {
      menu,
      serial
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  return Store
})

export { Store }
