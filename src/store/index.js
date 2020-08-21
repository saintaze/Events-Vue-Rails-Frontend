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
    },
    addEvent(state, event){
      state.events = [...state.events, event]
    },
    deleteEvent(state, id) {
      state.events =  state.events.filter(event =>  event.id !== id)
    },
    updateEvent(state, {id, start, end}){
      const oldEventIdx = state.events.findIndex(event =>  event.id === +id);
      if (oldEventIdx >= 0){
        state.events[oldEventIdx].start = start;
        state.events[oldEventIdx].end = end
      }
    }
  },
  actions: {
    async fetchEvents({commit}){
      const res = await axios.get(API_ENDPOINT_EVENTS);
      commit('setEvents', res.data);
    }
  }
})
