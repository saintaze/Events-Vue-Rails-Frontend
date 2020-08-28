import {mockEvents, createStore, createWrapper} from './testHelpers';
import Events from '@/components/Events.vue';
import moment from 'moment';

describe('Events', () => {
  let getters;
  let store;
  let wrapper;

  afterEach(() => { wrapper.destroy() });

  // describe block when events array is not empty
  describe('Events are present (events.length > 0)', ()=>{

    beforeEach(() => {
      getters = { events: () => mockEvents }
      store = createStore({ getters });
      wrapper = createWrapper(Events, { store });
    });

    it('should render html correctly', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should display .events element', () => {
      expect(wrapper.find('.events').exists()).toBe(true);
    });

    it('h2 elements should show total number of events', () => {
      expect(wrapper.find('h2').text()).toBe(`Events (${mockEvents.length})`);
    });

    it(`should contain ${mockEvents.length} tr elements`, () => {
      expect(wrapper.findAll('tr').length).toBe(mockEvents.length + 1); // +1 for the header row
    });

    it(`should show correct date format in start date and end date td elements`, () => {
      const allRowEls = wrapper.findAll('tr');
      const lastRowEl = allRowEls.at(allRowEls.length - 1);
      const lastStartDateEl = lastRowEl.findAll('td').at(2);
      const lastEndDateEl = lastRowEl.findAll('td').at(3);
      const dateFormat = 'ddd, MMM Do YYYY, h:mm a';
      const lastMockEvent = mockEvents[mockEvents.length - 1];

      expect(lastStartDateEl.text()).toBe(`${moment(lastMockEvent.start).format(dateFormat)}`);
      expect(lastEndDateEl.text()).toBe(`${moment(lastMockEvent.end).format(dateFormat)}`);
    });
  }) 

  // describe block when events array is empty
  describe('Events are empty (events.length === 0)', ()=>{

    beforeEach(() => {
      getters = { events: () => [] }
      store = createStore({ getters });
      wrapper = createWrapper(Events, { store });
    });

    it('should render html correctly', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should not display .events element', () => {
      expect(wrapper.find('.events').exists()).toBe(false);
    });
  });
});