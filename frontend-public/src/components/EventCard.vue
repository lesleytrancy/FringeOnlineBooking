<template>
  <div class="event-card">
    <div class="event-image">
      <img :src="event.imageUrl || placeholderImage" :alt="event.name">
    </div>
    <div class="event-details">
      <h3>{{ event.name }}</h3>
      <div class="event-meta">
        <span class="event-date">
          <i class="fas fa-calendar-alt"></i>
          {{ formatDate(event.date) }}
        </span>
        <span class="event-location">
          <i class="fas fa-map-marker-alt"></i>
          {{ event.location }}
        </span>
      </div>
      <p class="event-description">{{ truncateDescription(event.description) }}</p>
      <div class="event-footer">
        <span class="event-price">From ${{ event.minPrice }}</span>
        <router-link 
          :to="`/events/${event.id}`" 
          class="btn-secondary"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import placeholderImage from '@/assets/images/event-placeholder.jpg'

export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholderImage
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    truncateDescription(description) {
      if (!description) return ''
      return description.length > 100 
        ? `${description.substring(0, 100)}...` 
        : description
    }
  }
}
</script>

<style scoped>
.event-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.event-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-details {
  padding: 1.5rem;
}

.event-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.event-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.event-meta i {
  margin-right: 0.3rem;
}

.event-description {
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-price {
  font-weight: bold;
  color: #42b983;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background-color: white;
  color: #42b983;
  border: 1px solid #42b983;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #42b983;
  color: white;
}
</style>
