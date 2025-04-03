<template>
  <div class="event-details-page">
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading event details...
    </div>

    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <div v-else-if="event" class="event-container">
      <div class="event-header">
        <h1>{{ event.name }}</h1>
        <div class="event-meta">
          <span class="event-date">
            <i class="fas fa-calendar-alt"></i>
            {{ formatDate(event.date) }}
          </span>
          <span class="event-location">
            <i class="fas fa-map-marker-alt"></i>
            {{ event.location }}
          </span>
          <span class="event-category">
            <i class="fas fa-tag"></i>
            {{ event.category }}
          </span>
        </div>
      </div>

      <div class="event-content">
        <div class="event-image">
          <img :src="event.imageUrl || placeholderImage" :alt="event.name">
        </div>

        <div class="event-info">
          <div class="event-description">
            <h2>About This Event</h2>
            <p>{{ event.description }}</p>
          </div>

          <div class="event-tickets">
            <h2>Tickets</h2>
            <div v-if="event.ticketTypes.length > 0" class="ticket-types">
              <div 
                v-for="ticket in event.ticketTypes" 
                :key="ticket.id" 
                class="ticket-card"
                :class="{ selected: selectedTickets[ticket.id] }"
                @click="selectTicket(ticket)"
              >
                <div class="ticket-info">
                  <h3>{{ ticket.name }}</h3>
                  <p>{{ ticket.description }}</p>
                  <span class="ticket-price">${{ ticket.price }}</span>
                </div>
                <div v-if="selectedTickets[ticket.id]" class="ticket-quantity">
                  <button 
                    @click.stop="decrementTicket(ticket.id)"
                    :disabled="selectedTickets[ticket.id] <= 0"
                  >
                    -
                  </button>
                  <span>{{ selectedTickets[ticket.id] }}</span>
                  <button @click.stop="incrementTicket(ticket.id)">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="no-tickets">
              No tickets available for this event.
            </div>

            <div v-if="hasSelectedTickets" class="checkout-section">
              <div class="total">
                <span>Total:</span>
                <span>${{ totalPrice.toFixed(2) }}</span>
              </div>
              <button 
                class="btn-primary" 
                @click="proceedToCheckout"
                :disabled="!hasSelectedTickets"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import placeholderImage from '@/assets/images/event-placeholder.jpg'

export default {
  name: 'EventDetailsPage',
  data() {
    return {
      loading: false,
      error: null,
      event: null,
      selectedTickets: {},
      placeholderImage
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    hasSelectedTickets() {
      return Object.values(this.selectedTickets).some(qty => qty > 0)
    },
    totalPrice() {
      return Object.entries(this.selectedTickets).reduce((total, [ticketId, quantity]) => {
        if (quantity > 0) {
          const ticket = this.event.ticketTypes.find(t => t.id === ticketId)
          return total + (ticket.price * quantity)
        }
        return total
      }, 0)
    }
  },
  async created() {
    await this.fetchEventDetails()
  },
  methods: {
    ...mapActions('events', ['fetchEventById']),
    async fetchEventDetails() {
      this.loading = true
      this.error = null
      try {
        const eventId = this.$route.params.id
        this.event = await this.fetchEventById(eventId)
        // Initialize selected tickets object
        this.selectedTickets = this.event.ticketTypes.reduce((acc, ticket) => {
          acc[ticket.id] = 0
          return acc
        }, {})
      } catch (err) {
        this.error = 'Failed to load event details. Please try again later.'
        console.error('Error fetching event:', err)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    selectTicket(ticket) {
      if (this.selectedTickets[ticket.id] === 0) {
        this.$set(this.selectedTickets, ticket.id, 1)
      }
    },
    incrementTicket(ticketId) {
      this.$set(this.selectedTickets, ticketId, this.selectedTickets[ticketId] + 1)
    },
    decrementTicket(ticketId) {
      if (this.selectedTickets[ticketId] > 0) {
        this.$set(this.selectedTickets, ticketId, this.selectedTickets[ticketId] - 1)
      }
    },
    proceedToCheckout() {
      if (!this.isAuthenticated) {
        this.$router.push({ 
          name: 'Login', 
          query: { redirect: this.$route.path }
        })
        return
      }

      const selected = Object.entries(this.selectedTickets)
        .filter(([_, qty]) => qty > 0)
        .map(([ticketId, qty]) => ({
          ticketId,
          quantity: qty
        }))

      this.$router.push({
        name: 'Checkout',
        params: { eventId: this.event.id },
        query: { tickets: JSON.stringify(selected) }
      })
    }
  }
}
</script>

<style scoped>
.event-details-page {
  padding: 2rem 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.event-container {
  max-width: 1200px;
  margin: 0 auto;
}

.event-header {
  margin-bottom: 2rem;
  text-align: center;
}

.event-header h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.event-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.event-meta i {
  margin-right: 0.5rem;
}

.event-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.event-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.event-description h2 {
  margin-bottom: 1rem;
}

.event-description p {
  line-height: 1.6;
}

.ticket-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ticket-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ticket-card.selected {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.05);
}

.ticket-card:hover {
  border-color: #42b983;
}

.ticket-info h3 {
  margin-bottom: 0.5rem;
}

.ticket-info p {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.ticket-price {
  font-weight: bold;
  color: #42b983;
}

.ticket-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.ticket-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.ticket-quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ticket-quantity span {
  min-width: 30px;
  text-align: center;
}

.checkout-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.no-tickets {
  padding: 1rem;
  text-align: center;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>
