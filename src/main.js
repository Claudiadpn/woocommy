import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import FlashMessage from '@smartweb/vue-flash-message';

Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/fr')

Vue.use(FlashMessage);

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  vuetify,
  router,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
