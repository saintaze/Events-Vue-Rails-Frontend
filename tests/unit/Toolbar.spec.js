import { shallowMount } from '@vue/test-utils';
import Toolbar from '@/components/Toolbar.vue'; 
import { BRAND_NAME } from '@/constants.js';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Toolbar);
})

afterEach(() => {
  wrapper.destroy();
});

describe('Toolbar', () => {
  it('should render html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should contain header element', () => {
    expect(wrapper.find('.header').exists()).toBe(true)
  });

  it(`header element should contain brand name ${BRAND_NAME}`, () => {
    expect(wrapper.find('.header').text()).toBe(BRAND_NAME);
  });
})