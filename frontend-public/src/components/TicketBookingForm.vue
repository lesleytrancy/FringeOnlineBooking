<template>
  <div class="ticket-booking-form">
    <h2 v-if="title">{{ title }}</h2>
    
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading tickets...
    </div>

    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <div v-else>
      <div v-if="tickets.length > 0" class="ticket-options">
        <div 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          class="ticket-option"
          :class="{ selected: selectedTickets[ticket.id] > 0 }"
        >
          <div class="ticket-info">
            <h3>{{ ticket.name }}</h3>
            <p class="ticket-description">{{ ticket.description }}</p>
            <p class="ticket-price">${{ ticket.price.toFixed(2) }}</p>
            <p class="ticket-availability" v-if="ticket.available !== undefined">
              {{ ticket.available }} available
            </p>
          </div>

          <div class="ticket-quantity">
            <button 
              @click="decrementTicket(ticket.id)"
              :disabled="selectedTickets[ticket.id] <= 0"
              class="quantity-btn"
            >
              -
            </button>
            <input
              type="number"
              min="0"
              :max="ticket.available || 10"
              v-model.number="selectedTickets[ticket.id]"
              @change="validateQuantity(ticket.id)"
              class="quantity-input"
            >
            <button 
              @click="incrementTicket(ticket.id)"
              :disabled="ticket.available !== undefined && selectedTickets[ticket.id] >= ticket.available"
              class="quantity-btn"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div v-else class="no-tickets">
        No tickets available for this event.
      </div>

      <div v-if="showSummary && hasSelectedTickets" class="booking-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row" v-if="fees > 0">
          <span>Fees:</span>
          <span>${{ fees.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>

      <div v-if="showActions" class="form-actions">
        <button 
          v-if="hasSelectedTickets"
          @click="onProceed"
          class="btn-primary"
        >
          {{ proceedButtonText || 'Proceed' }}
        </button>
        <button 
          v-if="showCancel"
          @click="onCancel"
          class="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketBookingForm',
  props: {
    tickets: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    showSummary: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    proceedButtonText: {
      type: String,
      default: ''
    },
    feesPercentage: {
      type: Number,
      default: 0
    },
    fixedFee: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      selectedTickets: {}
    }
  },
  computed: {
    hasSelectedTickets() {
      return Object.values(this.selectedTickets).some(qty => qty > 0)
    },
    subtotal() {
      return this.tickets.reduce((total, ticket) => {
        const quantity = this.selectedTickets[ticket.id] || 0
        return total + (ticket.price * quantity)
      }, 0)
    },
    fees() {
      const percentageFee = this.subtotal * (this.feesPercentage / 100)
      return percentageFee + this.fixedFee
    },
    total() {
      return this.subtotal + this.fees
    }
  },
  watch: {
    tickets: {
      immediate: true,
      handler(newTickets) {
        // Initialize selected tickets
        const newSelected = {}
        newTickets.forEach(ticket => {
          newSelected[ticket.id] = this.selectedTickets[ticket.id] || 0
        })
        this.selectedTickets = newSelected
      }
    }
  },
  methods: {
    incrementTicket(ticketId) {
      this.$set(this.selectedTickets, ticketId, (this.selectedTickets[ticketId] || 0) + 1)
      this.emitSelection()
    },
    decrementTicket(ticketId) {
      if (this.selectedTickets[ticketId] > 0) {
        this.$set(this.selectedTickets, ticketId, this.selectedTickets[ticketId] - 1)
        this.emitSelection()
      }
    },
    validateQuantity(ticketId) {
      const ticket = this.tickets.find(t => t.id === ticketId)
      if (!ticket) return

      let quantity = this.selectedTickets[ticketId] || 0
      
      // Ensure quantity is a number
      if (isNaN(quantity)) {
        quantity = 0
      }
      
      // Ensure quantity is not negative
      quantity = Math.max(0, quantity)
      
      // Ensure quantity doesn't exceed available tickets
      if (ticket.available !== undefined) {
        quantity = Math.min(quantity, ticket.available)
      }
      
      this.$set(this.selectedTickets, ticketId, quantity)
      this.emitSelection()
    },
    emitSelection() {
      const selected = Object.entries(this.selectedTickets)
        .filter(([_, qty]) => qty > 0)
        .map(([ticketId, qty]) => ({
          ticketId,
          quantity: qty
        }))
      
      this.$emit('update:selected', selected)
      this.$emit('update:total', this.total)
    },
    onProceed() {
      this.$emit('proceed', {
        selected: this.getSelectedTickets(),
        total: this.total
      })
    },
    onCancel() {
      this.$emit('cancel')
    },
    getSelectedTickets() {
      return Object.entries(this.selectedTickets)
        .filter(([_, qty]) => qty > 0)
        .map(([ticketId, qty]) => ({
          ticketId,
          quantity: qty
        }))
    },
    resetSelection() {
      const reset = {}
      this.tickets.forEach(ticket => {
        reset[ticket.id] = 0
      })
      this.selectedTickets = reset
    }
  }
}
</script>

<style scoped>
.ticket-booking-form {
  padding: 1rem;
}

.ticket-booking-form h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

.ticket-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ticket-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.2s;
}

.ticket-option.selected {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.05);
}

.ticket-info {
  flex: 1;
}

.ticket-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.ticket-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.ticket-price {
  font-weight: bold;
  color: #42b983;
}

.ticket-availability {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.3rem;
}

.ticket-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-weight: bold;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.no-tickets {
  padding: 1rem;
  text-align: center;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}

.booking-summary {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 1.1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary {
  flex: 1;
  padding: 0.75rem;
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

.btn-secondary {
  flex: 1;
  padding: 0.75rem;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
}
</style>
