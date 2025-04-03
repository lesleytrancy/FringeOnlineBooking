import { createStore } from 'vuex'
import user from './modules/user'
import events from './modules/events'
import tickets from './modules/tickets'

export default createStore({
  modules: {
    user,
    events,
    tickets
  }
})
