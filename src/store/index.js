import Vue from 'vue'
import Vuex from 'vuex'
import event from './event'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        event,
        user,
        shared
    }
})
