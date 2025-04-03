<template>
  <div class="event-list">
    <div class="list-header">
      <h1>All Events</h1>
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search events..." 
            v-model="searchQuery"
            @keyup.enter="applyFilters"
          >
          <button @click="applyFilters" class="btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="filter-group">
          <label>Category:</label>
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
        </div>
        <div class="filter-group">
          <label>Date:</label>
          <select v-model="selectedDate">
            <option value="">Any Date</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Price:</label>
          <select v-model="selectedPrice">
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="under50">Under $50</option>
            <option value="under100">Under $100</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading events...
    </div>

    <div v-else>
      <div v-if="filteredEvents.length === 0" class="no-results">
        No events found matching your criteria.
      </div>

      <div v-else class="events-container">
        <EventCard 
          v-for="event in filteredEvents" 
          :key="event.id" 
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedDate: '',
      selectedPrice: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('events', ['allEvents', 'eventCategories']),
    categories() {
      return this.eventCategories || []
    },
    filteredEvents() {
      return this.allEvents.filter(event => {
        // Search query filter
        const matchesSearch = this.searchQuery === '' || 
          event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(this.searchQuery.toLowerCase())

        // Category filter
        const matchesCategory = this.selectedCategory === '' || 
          event.category === this.selectedCategory

        // Date filter
        let matchesDate = true
        if (this.selectedDate) {
          const eventDate = new Date(event.date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (this.selectedDate === 'today') {
            matchesDate = eventDate.toDateString() === today.toDateString()
          } else if (this.selectedDate === 'week') {
            const weekEnd = new Date(today)
            weekEnd.setDate(today.getDate() + 7)
            matchesDate = eventDate >= today && eventDate <= weekEnd
          } else if (this.selectedDate === 'month') {
            const monthEnd = new Date(today)
            monthEnd.setMonth(today.getMonth() + 1)
            matchesDate = eventDate >= today && eventDate <= monthEnd
          }
        }

        // Price filter
        let matchesPrice = true
        if (this.selectedPrice) {
          if (this.selectedPrice === 'free') {
            matchesPrice = event.minPrice === 0
          } else if (this.selectedPrice === 'under50') {
            matchesPrice = event.minPrice < 50
          } else if (this.selectedPrice === 'under100') {
            matchesPrice = event.minPrice < 100
          }
        }

        return matchesSearch && matchesCategory && matchesDate && matchesPrice
      })
    }
  },
  async created() {
    this.loading = true
    await this.fetchAllEvents()
    await this.fetchCategories()
    this.loading = false

    // Initialize filters from query params
    const { search, category } = this.$route.query
    if (search) this.searchQuery = search
    if (category) this.selectedCategory = category
  },
  methods: {
    ...mapActions('events', ['fetchAllEvents', 'fetchCategories']),
    applyFilters() {
      // Update URL with current filters
      this.$router.push({
        query: {
          search: this.searchQuery || undefined,
          category: this.selectedCategory || undefined
        }
      })
    }
  }
}
</script>

<style scoped>
.event-list {
  padding: 2rem 0;
}

.list-header {
  margin-bottom: 2rem;
}

.list-header h1 {
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-box {
  display: flex;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.search-box input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.search-box button {
  padding: 0 1.5rem;
  border-radius: 0 4px 4px 0;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.events-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>
