import { shallowMount } from "@vue/test-utils"
import App from "@/App.vue"
import Toolbar from '@/components/Toolbar.vue';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      stubs: ['router-view']
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should render html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should contain Toolbar component', () => {
    expect(wrapper.findComponent(Toolbar).exists()).toBe(true);
  });  
})