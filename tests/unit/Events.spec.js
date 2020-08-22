
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';
// import Events from '@/components/Events.vue';


// let wrapper;
// let store;
// let actions;
// let mutations;
// let state;
// const localVue = createLocalVue();

// localVue.use(Vuex);

// beforeEach(() => {
//   actions = {
//     someAction: jest.fn()
//   };
//   mutations = {
//     someMutation: jest.fn()
//   };
//   state = {
//     key: {}
//   };
//   store = new Vuex.Store({
//     actions,
//     mutations,
//     state,
//   });
//   wrapper = shallowMount(Events, {
//     propsData: {},
//     mocks: {},
//     stubs: {},
//     methods: {},
//     store,
//     localVue,
//   });
// });

// afterEach(() => {
//   wrapper.destroy();
// });

// describe('Events', () => {
//   test('is a Vue instance', () => {
//     expect(wrapper.isVueInstance).toBeTruthy();
//   });
// });