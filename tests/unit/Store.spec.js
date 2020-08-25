import {state, getters, mutations, actions} from '@/store'

const deepClone = list => list.map(item => ({...item}))

//mock events data
const mockEvents = [
  {
    "id": 1,
    "title": "walking in darkness",
    "start": "2020-07-28",
    "end": "2020-07-29",
    "allDay": 1
  },
  {
    "id": 4,
    "title": "eating cake in the sun",
    "start": "2020-08-25T07:00:00+05:00",
    "end": "2020-08-25T10:00:00+05:00",
    "allDay": 0
  },
]

jest.mock('axios', () => {
  return {
    get: jest.fn(() => ({ data: mockEvents}))
  }
})

beforeEach(() => state.events = [])

describe('Store', ()=>{
  
  // events getter with empty array
  it('"events" getter should return an empty array', () => {
    expect(getters.events(state)).toStrictEqual([])
  });

  // events getter with non empty array
  it('"events" getter should return events array', () => {
    state.events = deepClone(mockEvents);
    expect(getters.events(state)).toStrictEqual(mockEvents);
  });

  it('"setEvents" mutation should set state events array', () => {
    mutations.setEvents(state, mockEvents);
    expect(state.events).toStrictEqual(mockEvents);
  });


  it('"addEvent" mutation should add new event to state events array', () => {
    const newEvent = deepClone(mockEvents).pop();
    mutations.addEvent(state, newEvent);
    expect(state.events).toStrictEqual([newEvent]);
  });


  it('"deleteEvent" mutation should remove correct event from state events array', () => {
    state.events = deepClone(mockEvents);
    mutations.deleteEvent(state, mockEvents[0].id);
    expect(state.events).toStrictEqual([mockEvents[1]]);
  });

  it('"updateEvent" mutation should udpate start and end date of correct event in the state events array', () => {
    state.events = deepClone(mockEvents);
    const updatedStartDate = "2020-03-12";
    const updatedEndDate = "2020-03-23"
    mutations.updateEvent(state, { id: 1, start: updatedStartDate, end: updatedEndDate})
    mockEvents[0].start = updatedStartDate
    mockEvents[0].end = updatedEndDate 
    expect(state.events).toStrictEqual(mockEvents)

  });

  it('"fetchEvents" action should get events from api and set state events array', async () => {
    const commit = (mutationName, payload) => mutations[mutationName](state, payload)
    await actions.fetchEvents({commit});
    expect(state.events).toStrictEqual(mockEvents);
  });
});

