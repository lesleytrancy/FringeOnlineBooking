<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Create Account</h1>
      
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              v-model="form.firstName"
              required
              placeholder="Enter your first name"
              :class="{ 'is-invalid': errors.firstName }"
            >
            <div v-if="errors.firstName" class="invalid-feedback">
              {{ errors.firstName }}
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="form.lastName"
              required
              placeholder="Enter your last name"
              :class="{ 'is-invalid': errors.lastName }"
            >
            <div v-if="errors.lastName" class="invalid-feedback">
              {{ errors.lastName }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
            :class="{ 'is-invalid': errors.email }"
          >
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone (Optional)</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            placeholder="Enter your phone number"
            :class="{ 'is-invalid': errors.phone }"
          >
          <div v-if="errors.phone" class="invalid-feedback">
            {{ errors.phone }}
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Create a password"
            :class="{ 'is-invalid': errors.password }"
          >
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
          <div class="password-hint">
            Must be at least 8 characters
          </div>
        </div>

        <div class="form-group">
          <label for="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            required
            placeholder="Confirm your password"
            :class="{ 'is-invalid': errors.passwordConfirm }"
          >
          <div v-if="errors.passwordConfirm" class="invalid-feedback">
            {{ errors.passwordConfirm }}
          </div>
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div class="form-group terms">
          <input
            type="checkbox"
            id="terms"
            v-model="form.acceptedTerms"
            required
          >
          <label for="terms">
            I agree to the <a href="#" @click.prevent="showTerms">Terms of Service</a> and <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
          </label>
          <div v-if="errors.acceptedTerms" class="invalid-feedback">
            {{ errors.acceptedTerms }}
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-spin"></i> Creating account...
          </span>
          <span v-else>Create Account</span>
        </button>

        <div class="form-footer">
          Already have an account? <router-link :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </form>
    </div>

    <!-- Terms Modal -->
    <div v-if="showTermsModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Terms of Service</h2>
          <button @click="closeModal" class="modal-close">
            &times;
          </button>
        </div>
        <div class="modal-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <!-- Full terms content would go here -->
        </div>
      </div>
    </div>

    <!-- Privacy Modal -->
    <div v-if="showPrivacyModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Privacy Policy</h2>
          <button @click="closeModal" class="modal-close">
            &times;
          </button>
        </div>
        <div class="modal-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <!-- Full privacy policy content would go here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        acceptedTerms: false
      },
      errors: {},
      error: '',
      loading: false,
      showTermsModal: false,
      showPrivacyModal: false
    }
  },
  methods: {
    ...mapActions('user', ['register']),
    async handleSubmit() {
      this.errors = {}
      this.error = ''
      
      // Validate passwords match
      if (this.form.password !== this.form.passwordConfirm) {
        this.errors.passwordConfirm = 'Passwords do not match'
        return
      }

      this.loading = true

      try {
        await this.register(this.form)
        
        // Redirect to email verification page
        this.$router.push({ 
          name: 'VerifyEmail', 
          query: { email: this.form.email } 
        })
      } catch (err) {
        if (err.response && err.response.status === 422) {
          // Validation errors
          this.errors = err.response.data.errors || {}
        } else {
          // General error
          this.error = err.response?.data?.message || 'Registration failed. Please try again.'
        }
      } finally {
        this.loading = false
      }
    },
    showTerms() {
      this.showTermsModal = true
    },
    showPrivacy() {
      this.showPrivacyModal = true
    },
    closeModal() {
      this.showTermsModal = false
      this.showPrivacyModal = false
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
}

.register-container {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-container h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
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

.form-group input.is-invalid {
  border-color: #e74c3c;
}

.invalid-feedback {
  color: #e74c3c;
  font-size: 0.875rem;
}

.password-hint {
  font-size: 0.75rem;
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

.terms {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.terms label {
  font-size: 0.875rem;
}

.terms a {
  color: #42b983;
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

.btn-primary {
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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

.form-footer {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.form-footer a {
  color: #42b983;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-content {
  padding: 1.5rem;
}

.modal-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}
</style>
