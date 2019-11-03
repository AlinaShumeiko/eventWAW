import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify'
import store from './store'
import DateFilter from './filters/date'


Vue.use(vuetify)
Vue.filter('date', DateFilter)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
      firebase.initializeApp(
          {
              apiKey: 'AIzaSyAj0ziFE6WHCL-oTkhI7WmZY_gqFs6bkH8',
              authDomain: 'event-waw.firebaseapp.com',
              databaseURL: 'https://event-waw.firebaseio.com',
              projectId: 'event-waw',
              storageBucket: 'event-waw.appspot.com',
              messagingSenderId: '187940962485',
              appId: '1:187940962485:web:e732ab7f17c531eacffefc'
          })

      firebase.auth().onAuthStateChanged(user => {
          if(user){
              this.$store.dispatch('autoLoginUser', user)
              this.$store.dispatch('fetchUserData')
          }
      })

      this.$store.dispatch('fetchEvents')


  }
 }).$mount( '#app')



