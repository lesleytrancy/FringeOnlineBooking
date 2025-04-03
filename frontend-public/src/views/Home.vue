<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome to Fringe Online Booking</h1>
      <p>Discover amazing events and performances</p>
      <router-link to="/events" class="btn-primary">Browse Events</router-link>
    </section>

    <section class="featured-events">
      <h2>Featured Events</h2>
      <div class="events-grid">
        <EventCard 
          v-for="event in featuredEvents" 
          :key="event.id" 
          :event="event"
          class="featured-event"
        />
      </div>
    </section>

    <section class="event-search">
      <h2>Find Your Perfect Event</h2>
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search events..." 
          v-model="searchQuery"
          @keyup.enter="searchEvents"
        >
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <option 
            v-for="category in categories" 
            :key="category" 
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <button @click="searchEvents" class="btn-primary">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'Home',
  components: {
    EventCard
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: ''
    }
  },
  computed: {
    ...mapGetters('events', ['featuredEvents', 'eventCategories']),
    categories() {
      return this.eventCategories || []
    }
  },
  async created() {
    await this.fetchFeaturedEvents()
    await this.fetchCategories()
  },
  methods: {
    ...mapActions('events', ['fetchFeaturedEvents', 'fetchCategories']),
    searchEvents() {
      this.$router.push({
        path: '/events',
        query: {
          search: this.searchQuery,
          category: this.selectedCategory
        }
      })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.featured-events {
  margin-bottom: 3rem;
}

.featured-events h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.search-box {
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-box input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-box select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #3aa876;
}
</style>
