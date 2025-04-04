<template>
  <div class="profile-page">
    <div class="profile-container">
      <h1>My Profile</h1>

      <div class="profile-sections">
        <!-- Personal Information Section -->
        <section class="profile-section">
          <div class="section-header">
            <h2>Personal Information</h2>
            <button 
              @click="editPersonalInfo"
              class="btn-edit"
              v-if="!editingPersonalInfo"
            >
              Edit
            </button>
          </div>

          <form 
            @submit.prevent="savePersonalInfo"
            v-if="editingPersonalInfo"
            class="profile-form"
          >
            <div class="form-group">
              <label>First Name</label>
              <input
                type="text"
                v-model="user.firstName"
                required
              >
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <input
                type="text"
                v-model="user.lastName"
                required
              >
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="user.email"
                required
                disabled
              >
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input
                type="tel"
                v-model="user.phone"
              >
            </div>

            <div class="form-actions">
              <button 
                type="button"
                @click="cancelEditPersonalInfo"
                class="btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="btn-primary"
                :disabled="savingPersonalInfo"
              >
                <span v-if="savingPersonalInfo">
                  <i class="fas fa-spinner fa-spin"></i> Saving...
                </span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>

          <div v-else class="profile-info">
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">{{ fullName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">{{ user.email }}</span>
            </div>
            <div class="info-row" v-if="user.phone">
              <span class="info-label">Phone:</span>
              <span class="info-value">{{ user.phone }}</span>
            </div>
          </div>
        </section>

        <!-- Change Password Section -->
        <section class="profile-section">
          <div class="section-header">
            <h2>Change Password</h2>
            <button 
              @click="toggleChangePassword"
              class="btn-edit"
              v-if="!changingPassword"
            >
              Change
            </button>
          </div>

          <form 
            @submit.prevent="changePassword"
            v-if="changingPassword"
            class="profile-form"
          >
            <div class="form-group">
              <label>Current Password</label>
              <input
                type="password"
                v-model="password.current"
                required
              >
            </div>

            <div class="form-group">
              <label>New Password</label>
              <input
                type="password"
                v-model="password.new"
                required
              >
            </div>

            <div class="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                v-model="password.confirm"
                required
              >
            </div>

            <div v-if="passwordError" class="alert alert-danger">
              {{ passwordError }}
            </div>

            <div class="form-actions">
              <button 
                type="button"
                @click="toggleChangePassword"
                class="btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="btn-primary"
                :disabled="changingPasswordLoading"
              >
                <span v-if="changingPasswordLoading">
                  <i class="fas fa-spinner fa-spin"></i> Updating...
                </span>
                <span v-else>Update Password</span>
              </button>
            </div>
          </form>
        </section>

        <!-- Booking History Section -->
        <section class="profile-section">
          <div class="section-header">
            <h2>Booking History</h2>
          </div>

          <div v-if="bookingsLoading" class="loading">
            <i class="fas fa-spinner fa-spin"></i> Loading bookings...
          </div>

          <div v-else-if="bookingsError" class="error">
            <i class="fas fa-exclamation-triangle"></i> {{ bookingsError }}
          </div>

          <div v-else-if="bookings.length === 0" class="no-bookings">
            You haven't made any bookings yet.
          </div>

          <div v-else class="bookings-list">
            <div 
              v-for="booking in bookings" 
              :key="booking.id"
              class="booking-item"
            >
              <div class="booking-header">
                <h3>{{ booking.event.title }}</h3>
                <span class="booking-date">
                  {{ formatDate(booking.createdAt) }}
                </span>
              </div>
              
              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">
                    {{ formatEventDate(booking.event.date) }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Location:</span>
                  <span class="detail-value">
                    {{ booking.event.location }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tickets:</span>
                  <span class="detail-value">
                    {{ booking.tickets.length }} tickets
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total:</span>
                  <span class="detail-value">
                    ${{ booking.total.toFixed(2) }}
                  </span>
                </div>
              </div>

              <div class="booking-actions">
                <router-link 
                  :to="{ name: 'EventDetails', params: { id: booking.event.id } }"
                  class="btn-view"
                >
                  View Event
                </router-link>
                <button 
                  @click="cancelBooking(booking.id)"
                  class="btn-cancel"
                  v-if="booking.canCancel"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'ProfilePage',
  data() {
    return {
      editingPersonalInfo: false,
      savingPersonalInfo: false,
      changingPassword: false,
      changingPasswordLoading: false,
      passwordError: '',
      bookingsLoading: false,
      bookingsError: '',
      originalUser: {},
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      password: {
        current: '',
        new: '',
        confirm: ''
      },
      bookings: []
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  },
  created() {
    this.loadUserData()
    this.loadBookings()
  },
  methods: {
    ...mapActions('user', ['updateProfile', 'changeUserPassword']),
    ...mapActions('tickets', ['getUserBookings', 'cancelUserBooking']),

    loadUserData() {
      if (this.currentUser) {
        this.user = { ...this.currentUser }
        this.originalUser = { ...this.currentUser }
      }
    },

    loadBookings() {
      this.bookingsLoading = true
      this.bookingsError = ''

      this.getUserBookings()
        .then(bookings => {
          this.bookings = bookings
        })
        .catch(err => {
          this.bookingsError = err.response?.data?.message || 'Failed to load bookings'
        })
        .finally(() => {
          this.bookingsLoading = false
        })
    },

    editPersonalInfo() {
      this.editingPersonalInfo = true
    },

    cancelEditPersonalInfo() {
      this.user = { ...this.originalUser }
      this.editingPersonalInfo = false
    },

    async savePersonalInfo() {
      this.savingPersonalInfo = true

      try {
        await this.updateProfile(this.user)
        this.originalUser = { ...this.user }
        this.editingPersonalInfo = false
      } catch (err) {
        console.error('Failed to update profile:', err)
      } finally {
        this.savingPersonalInfo = false
      }
    },

    toggleChangePassword() {
      this.changingPassword = !this.changingPassword
      this.password = {
        current: '',
        new: '',
        confirm: ''
      }
      this.passwordError = ''
    },

    async changePassword() {
      if (this.password.new !== this.password.confirm) {
        this.passwordError = 'New passwords do not match'
        return
      }

      this.changingPasswordLoading = true
      this.passwordError = ''

      try {
        await this.changeUserPassword({
          currentPassword: this.password.current,
          newPassword: this.password.new
        })
        
        this.toggleChangePassword()
      } catch (err) {
        this.passwordError = err.response?.data?.message || 'Failed to change password'
      } finally {
        this.changingPasswordLoading = false
      }
    },

    async cancelBooking(bookingId) {
      if (confirm('Are you sure you want to cancel this booking?')) {
        try {
          await this.cancelUserBooking(bookingId)
          this.loadBookings()
        } catch (err) {
          console.error('Failed to cancel booking:', err)
        }
      }
    },

    formatDate(date) {
      return moment(date).format('MMMM D, YYYY [at] h:mm A')
    },

    formatEventDate(date) {
      return moment(date).format('dddd, MMMM D, YYYY [at] h:mm A')
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-container h1 {
  margin-bottom: 2rem;
  color: #333;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.25rem;
  color: #444;
}

.btn-edit {
  background: none;
  border: none;
  color: #42b983;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-edit:hover {
  text-decoration: underline;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.form-group input[disabled] {
  background-color: #f8f9fa;
  color: #666;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
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
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  gap: 1rem;
}

.info-label {
  font-weight: 500;
  color: #555;
  min-width: 100px;
}

.info-value {
  color: #333;
}

.loading, .error, .no-bookings {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

.no-bookings {
  color: #666;
}

.alert-danger {
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 0.875rem;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.booking-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.booking-header h3 {
  font-size: 1.1rem;
  color: #333;
}

.booking-date {
  font-size: 0.875rem;
  color: #666;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  gap: 1rem;
}

.detail-label {
  font-weight: 500;
  color: #555;
  min-width: 80px;
}

.detail-value {
  color: #333;
}

.booking-actions {
  display: flex;
  gap: 1rem;
}

.btn-view {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-view:hover {
  background-color: #3aa876;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  background-color: white;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background-color: #f8d7da;
}
</style>
