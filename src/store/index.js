import { createStore } from 'vuex'
import messages from './messageStore.js';

const store = createStore({
  modules: {
    messages,
  }
})

export default store;
