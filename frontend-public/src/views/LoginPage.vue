<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login</h1>
      
      <form @submit.prevent="handleSubmit" class="login-form">
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
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
            :class="{ 'is-invalid': errors.password }"
          >
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-spin"></i> Logging in...
          </span>
          <span v-else>Login</span>
        </button>

        <div class="form-footer">
          <router-link :to="{ name: 'Register' }">Create an account</router-link>
          <router-link :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      error: '',
      loading: false,
      redirect: null
    }
  },
  created() {
    // Get redirect path from query if exists
    this.redirect = this.$route.query.redirect
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleSubmit() {
      this.errors = {}
      this.error = ''
      this.loading = true

      try {
        await this.login({
          email: this.form.email,
          password: this.form.password
        })

        // Redirect to the original path or home
        this.$router.push(this.redirect || { name: 'Home' })
      } catch (err) {
        if (err.response && err.response.status === 422) {
          // Validation errors
          this.errors = err.response.data.errors || {}
        } else {
          // General error
          this.error = err.response?.data?.message || 'Login failed. Please try again.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.login-form {
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

.form-group input.is-invalid {
  border-color: #e74c3c;
}

.invalid-feedback {
  color: #e74c3c;
  font-size: 0.875rem;
}

.alert-danger {
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 0.875rem;
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
  display: flex;
  justify-content: space-between;
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
</style>
