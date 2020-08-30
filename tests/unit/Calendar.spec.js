import {mockEvents, createStore, createWrapper} from './testHelpers';
import Calendar from '@/components/Calendar.vue';
import axios from 'axios'

describe('Calendar', () => {
  let getters;
  let store;
  let wrapper;
  let mutations;
  let actions;

  beforeEach(() => {
    actions = { fetchEvents: jest.fn() };
    mutations = { updateEvent: jest.fn(), deleteEvent: jest.fn(), addEvent: jest.fn() };
    getters = { events: () => mockEvents };
    store = createStore({ getters, mutations, actions });
    wrapper = createWrapper(Calendar, { store });
    wrapper.vm.syncEvents = jest.fn();
  });

  afterEach(() => { wrapper.destroy() });

  jest.mock('axios');

  it('should render html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('"handleUpdateEvent" should send "patch" request and update event in Vuex Store', async () => {
    axios.patch = jest.fn(() => ({ data: {event: responseData} }))

    const eventData = {
      event: {
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

  it('"created hook" should sync store events to calendar events', () => {
    store = createStore({ actions : { fetchEvents: jest.fn() }})
    wrapper = createWrapper(Calendar, {
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
