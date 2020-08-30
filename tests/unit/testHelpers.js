import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

//create store helper
export const createStore = (overrides = {}) => {
  const defaultStoreConfig = {
    state: {},
    getters: {},
    mutations: {},
    actions: {}
  }
  return new Vuex.Store({ ...defaultStoreConfig, ...overrides });
}

// create wrapper helper
export const createWrapper = (component, overrides = {}) => {
  const defaultMountingOptions = {
    localVue,
    store: createStore()
  }
  return shallowMount(component, { ...defaultMountingOptions, ...overrides });
}

export const deepClone = list => list.map(item => ({ ...item })) // only one level deep

//mock events data
export const mockEvents = [
  {
    "id": 1,
    "title": "this is all we have ",
    "start": "2020-07-28",
    "end": "2020-07-29",
    "allDay": 1
  },
  {
    "id": 4,
    "title": "walking all night ",
    "start": "2020-08-25T07:00:00+05:00",
    "end": "2020-08-25T10:00:00+05:00",
    "allDay": 0
  },
]