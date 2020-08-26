import { shallowMount } from "@vue/test-utils"
import CalendarEvents from "@/components/CalendarEvents.vue"
import Events from '@/components/Events.vue';
import Calendar from '@/components/Calendar.vue';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CalendarEvents)
})

afterEach(() => {
  wrapper.destroy();
});

describe('CalendarEvents', () => {
  it('should render html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should contain Calendar component', () => {
    expect(wrapper.findComponent(Calendar).exists()).toBe(true);
  });

  it('should contain Events component', () => {
    expect(wrapper.findComponent(Events).exists()).toBe(true);
  });

})