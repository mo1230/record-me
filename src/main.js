import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "../public/static/css/m-css.css"
// import RecordRTC from 'recordrtc'
// import 'video.js/dist/video-js.min.css'
// import videojs from 'video.js'
// import 'videojs-record/dist/css/videojs.record.css'
// import Record from 'videojs-record/dist/videojs.record.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
