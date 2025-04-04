export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      // TODO: Implement API call
      const response = await fakeAuth(email, password)
      commit('SET_USER', response.user)
      commit('SET_TOKEN', response.token)
      return response
    },
    async register({ commit }, userData) {
      // TODO: Implement API call
      const response = await fakeRegister(userData)
      commit('SET_USER', response.user)
      commit('SET_TOKEN', response.token)
      return response
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  getters: {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  }
}

// Temporary mock functions
async function fakeAuth(email, _password) {
  console.log(_password);
  return {
    user: { email, name: 'Test User' },
    token: 'fake-jwt-token'
  }
}

async function fakeRegister(userData) {
  return {
    user: userData,
    token: 'fake-jwt-token'
  }
}
