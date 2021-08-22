import { createStore } from 'vuex'
import room from './roomStore.js';

const store = createStore({
  modules: {
    room,
  }
})

export default store;
