import { shallowMount } from '@vue/test-utils';
import Toolbar from '@/components/Toolbar.vue'; 

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Toolbar, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Toolbar', () => {
  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should render Html correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.html()).toMatchSnapshot()
  })
});