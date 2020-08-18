import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {API_ENDPOINT_EVENTS} from '@/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  getters: {
    events(state){
      return state.events;
    }
  },
  mutations: {
    setEvents(state, events){
      state.events = events;
    }
  },
  actions: {
    async fetchEvents({commit}){
      const res = await axios.get(API_ENDPOINT_EVENTS);
      commit('setEvents', res.data);
    }
  }
})
