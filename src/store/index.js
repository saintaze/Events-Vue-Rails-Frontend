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
    },
  },
  mutations: {
    setInitialEvents(state, events){
      state.initialEvents = events;
    },
    setCurrentEvents(state, events) {
      state.currentEvents = events;
    },
    addEvent(state, event){
      console.log('ADD', event)
      console.log('MU1', state.initialEvents)
      state.initialEvents = [...state.initialEvents, event]
      console.log('MU2', state.initialEvents)
    },
    deleteEvent(state, id) {
      console.log('MU DEL', id)
      state.initialEvents =  state.initialEvents.filter(event =>  event.id !== id)
    },
    updateEvent(state, {id, start, end}){
      console.log('UPADTE MU', id, start, end)
      const oldEventIdx = state.initialEvents.findIndex(event =>  event.id === +id);
      if (oldEventIdx >= 0){
        state.initialEvents[oldEventIdx].start = start;
        state.initialEvents[oldEventIdx].end = end
      }
     
    }
  },
  actions: {
    async fetchEvents({commit}){
      const res = await axios.get(API_ENDPOINT_EVENTS);
      commit('setInitialEvents', res.data);
    }
  }
})
