import { createStore } from 'vuex'
import room from './roomStore.js';
import session from './sessionStore.js';

const store = createStore({
  modules: {
    room,
    session,
  }
})

export default store;
