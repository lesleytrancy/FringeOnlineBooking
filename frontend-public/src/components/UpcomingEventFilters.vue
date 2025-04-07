<template>
  <div>
  <section class="event-filters">
    <!-- Title -->
    <h2 class="title">
      Upcoming <span class="highlight">Events</span>
    </h2>

    <!-- Dropdown Filters -->
    <div class="filters">
      <select v-model="weekday">
        <option disabled value="">Weekdays</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      <select v-model="eventType">
        <option disabled value="">Event type</option>
        <option>Music</option>
        <option>Comedy</option>
        <option>Workshop</option>
      </select>

      <select v-model="category">
        <option disabled value="">Any category</option>
        <option>Kids</option>
        <option>Adults</option>
        <option>Family</option>
      </select>
    </div>    
  </section>
  <div class="event-container">
    <EventCard
      v-for="(event, index) in events"
      :key="index"
      v-bind="event"
    />    
  </div>
  <div class="load-more-wrapper" v-if="showLoadMore">
    <button class="load-more-btn" @click="loadMore" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Load more...</span>
    </button>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import eventData from '@/mocks/events'

const weekday = ref('Monday')
const eventType = ref('Music')
const category = ref('Kids')

const allEvents = ref(eventData)
const events = ref(allEvents.value.slice(0, 8)) // 👈 only first 8
const isLoading = ref(false)
const showLoadMore = ref(true)

function loadMore() {
  isLoading.value = true
  setTimeout(() => {
    events.value = allEvents.value
    isLoading.value = false
    showLoadMore.value = false
  }, 1000)
}
</script>


<script>
import EventCard from '@/components/EventCard.vue'


export default {
  name: 'UpcommingEvent',
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
   
  },
  async created() {
    
  },
  methods: {
   
  }
}
</script>

<style scoped>
.event-filters {
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #111;
  margin: 0;
}

.highlight {
  color: #f25c94;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filters select {
  user-select: none;
  padding: 10px 14px;
  border-radius: 8px;
  width: 140px;
  border: none;
  background-color: #f3f3f3;
  font-size: 14px;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 8L13 1' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  cursor: pointer;
}

.event-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 0 auto;
  padding: 20px 0;
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 0;
  user-select: none;
}

.load-more-btn {
  background-color: #f25c94;
  color: white;
  font-size: 14px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-more-btn:hover {
  background-color: #e14a82;
}
</style>
