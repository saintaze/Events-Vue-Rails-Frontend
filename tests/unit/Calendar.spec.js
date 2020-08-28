import { shallowMount, createLocalVue } from '@vue/test-utils';
import Calendar from '@/components/Calendar.vue';
import Vuex from 'vuex';
import axios from 'axios'

let getters;
let store;
let wrapper;
let mutations;
let actions;

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('axios')

// create store helper
const createStore = (overrides = {}) => {
  const defaultStoreConfig = {
    state: {},
    getters: {},
    mutations: {},
    actions: {}
  }
  return new Vuex.Store({ ...defaultStoreConfig, ...overrides });
}

// create wrapper helper
const createWrapper = (overrides = {}) => {
  const defaultMountingOptions = {
    localVue,
    store: createStore()
  }
  return shallowMount(Calendar, { ...defaultMountingOptions, ...overrides });
}

afterEach(() => { wrapper.destroy() });

//mock events data
const mockEvents = [
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

describe('Calendar', () => {

  beforeEach(() => {
    actions = { fetchEvents: jest.fn() };
    mutations = { updateEvent: jest.fn(), deleteEvent: jest.fn(), addEvent: jest.fn() }
    getters = { events: () => mockEvents }
    store = createStore({ getters, mutations, actions });
    wrapper = createWrapper({ store });
  });

    
  it('should render html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('"handleUpdateEvent" should send "patch" request and update event in Vuex Store', async () => {
    wrapper.vm.syncEvents = jest.fn();
    axios.patch = jest.fn(() => ({ data: responseData }))

    const eventData = {
      event: {
        title: 'cooking',
        startStr: '2020-03-21',
        endStr: '2020-03-26',
        id: 4
      }
    }
    const responseData = {
      start: '2020-03-21',
      end: '2020-03-26',
      id: '4'
    }
    
    await wrapper.vm.handleUpdateEvent(eventData);
    expect(mutations.updateEvent.mock.calls).toHaveLength(1);
    expect(mutations.updateEvent.mock.calls[0][1]).toStrictEqual(responseData);
    expect(wrapper.vm.syncEvents).toHaveBeenCalled();
  });

  it('"handleRemoveEvent" should send "delete" request and delete event in Vuex Store', async () => {
    window.confirm = jest.fn(() =>  true);
    wrapper.vm.syncEvents = jest.fn();
    axios.delete = jest.fn(() => ({ data: responseData }))
    
    const eventData = {
      event: {
        title: 'cooking',
        startStr: '2020-03-21',
        endStr: '2020-03-26',
        id: 4
      }
    }
    
    const responseData = {
      "event": {
        "id": 1,
        "title": "this is all we have ",
        "start": "2020-07-28",
        "end": "2020-07-29",
        "allDay": 1,
        "created_at": "2020-08-21T13:06:34.777Z",
        "updated_at": "2020-08-22T01:16:51.463Z",
        "backgroundColor": "purple",
        "borderColor": "purple"
      }
    }


    await wrapper.vm.handleRemoveEvent(eventData);
    expect(mutations.deleteEvent.mock.calls).toHaveLength(1);
    expect(mutations.deleteEvent.mock.calls[0][1]).toStrictEqual(responseData.event.id);
    expect(wrapper.vm.syncEvents).toHaveBeenCalled();
  });

  it('"handleAddEvent" should send "post" request and add event in Vuex Store', async () => {
    window.prompt = jest.fn(() => 'new event');
    wrapper.vm.syncEvents = jest.fn();
    axios.post = jest.fn(() => ({ data: responseData }));

    const dateSelectInfo = {
      view: {
        calendar: {
          unselect: jest.fn()
        }
      },
      title: "this is all we have ",
      startStr: "2020-07-28",
      endStr: "2020-07-29",
      allDay: 1,
      backgroundColor: "purple",
      borderColor: "purple"
    }
    
    const responseData = {
      "event": {
        "id": 1,
        "title": "this is all we have ",
        "start": "2020-07-28",
        "end": "2020-07-29",
        "allDay": 1,
        "created_at": "2020-08-21T13:06:34.777Z",
        "updated_at": "2020-08-22T01:16:51.463Z",
        "backgroundColor": "purple",
        "borderColor": "purple"
      }
    }


    await wrapper.vm.handleAddEvent(dateSelectInfo);
    expect(mutations.addEvent.mock.calls).toHaveLength(1);
    expect(mutations.addEvent.mock.calls[0][1]).toStrictEqual(responseData.event);
    expect(wrapper.vm.syncEvents).toHaveBeenCalled();
  });

  it('"syncEvents" should sync store events to calendar events', () => {
    wrapper.setData({
      calendarOptions : {
        events: []
      }
    });
    wrapper.vm.calendarOptions.events = getters.events();
    expect(wrapper.vm.calendarOptions.events).toStrictEqual(mockEvents);
      
  });

  it('"created hook" should sync store events to calendar events', async () => {
    store = createStore({ actions : { fetchEvents: jest.fn() }})
    wrapper = createWrapper({
      store,
      data: () => {
        return {
          calendarOptions: {}
        }
      },
      computed: {
        options: () => ({
          calendarOptions: {
            events: []
          }
        })
      }
    })
    expect(wrapper.vm.calendarOptions).toStrictEqual(wrapper.vm.options);
    expect(actions.fetchEvents.mock.calls).toHaveLength(1);
  }); 


});
