import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {API_ENDPOINT_EVENTS} from '@/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialEvents: [],
    currentEvents: []
  },
  getters: {
    initialEvents(state){
      return state.initialEvents;
    },
    currentEvents(state) {
      return state.currentEvents;
    }
  },
  mutations: {
    setInitialEvents(state, events){
      state.initialEvents = events;
    },
    setCurrentEvents(state, events) {
      state.currentEvents = events;
    }
  },
  actions: {
    async fetchEvents({commit}){
      const res = await axios.get(API_ENDPOINT_EVENTS);
      commit('setInitialEvents', res.data);
    }
  }
})
