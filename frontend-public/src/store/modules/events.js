export default {
  namespaced: true,
  state: () => ({
    events: [],
    featuredEvents: [],
    categories: [],
    loading: false,
    error: null
  }),
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_FEATURED_EVENTS(state, events) {
      state.featuredEvents = events
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchEvents({ commit }, filters = {}) {
      commit('SET_LOADING', true)
      try {
        // TODO: Implement API call with filters
        const events = await fakeFetchEvents(filters)
        commit('SET_EVENTS', events)
        return events
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchFeaturedEvents({ commit }) {
      commit('SET_LOADING', true)
      try {
        // TODO: Implement API call
        const events = await fakeFetchFeaturedEvents()
        commit('SET_FEATURED_EVENTS', events)
        return events
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true)
      try {
        // TODO: Implement API call
        const categories = await fakeFetchCategories()
        commit('SET_CATEGORIES', categories)
        return categories
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allEvents: state => state.events,
    featuredEvents: state => state.featuredEvents,
    eventCategories: state => state.categories,
    isLoading: state => state.loading,
    error: state => state.error
  }
}

// Temporary mock functions
async function fakeFetchEvents(filters) {
  return [
    {
      id: 1,
      title: 'Sample Event 1',
      description: 'This is a sample event',
      date: '2025-04-15',
      location: 'Adelaide',
      price: 25.00,
      category: 'Music',
      image: '/images/event1.jpg'
    },
    {
      id: 2,
      title: 'Sample Event 2',
      description: 'Another sample event',
      date: '2025-04-20',
      location: 'Melbourne',
      price: 35.00,
      category: 'Theatre',
      image: '/images/event2.jpg'
    }
  ].filter(event => {
    if (filters.category && event.category !== filters.category) return false
    if (filters.location && event.location !== filters.location) return false
    return true
  })
}

async function fakeFetchFeaturedEvents() {
  return [
    {
      id: 3,
      title: 'Featured Event',
      description: 'This is a featured event',
      date: '2025-05-01',
      location: 'Sydney',
      price: 45.00,
      category: 'Comedy',
      image: '/images/featured.jpg'
    }
  ]
}

async function fakeFetchCategories() {
  return ['Music', 'Theatre', 'Comedy', 'Dance', 'Visual Arts']
}
