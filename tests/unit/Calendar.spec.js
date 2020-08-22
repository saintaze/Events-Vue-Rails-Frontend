
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';
// import Calendar from '@/components/Calendar.vue'; 


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
//   wrapper = shallowMount(Calendar, {
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

// describe('Calendar', () => {
//   test('is a Vue instance', () => {
//     expect(wrapper.isVueInstance).toBeTruthy();
//   });
// });