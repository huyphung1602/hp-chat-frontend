import { createStore } from 'vuex'
import room from './roomStore.js';
import session from './sessionStore.js';
import invitation from './invitationStore.js';

const store = createStore({
  modules: {
    room,
    session,
    invitation,
  }
})

export default store;
