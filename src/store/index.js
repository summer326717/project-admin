import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import agentlist from './modules/agentlist'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    agentlist
  },
  getters
})

export default store
