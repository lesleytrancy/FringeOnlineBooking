<template>
  <div class="verify-email-page">
    <div class="verify-email-container">
      <div v-if="!verified">
        <h1>Verify Your Email</h1>
        <p class="instructions">
          We've sent a verification link to <strong>{{ email }}</strong>.
          Please check your email and click the link to verify your account.
        </p>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div class="resend-section">
          <p>Didn't receive the email?</p>
          <button 
            @click="resendVerificationEmail"
            class="btn-resend"
            :disabled="resending"
          >
            <span v-if="resending">
              <i class="fas fa-spinner fa-spin"></i> Sending...
            </span>
            <span v-else>Resend Verification Email</span>
          </button>
          <p v-if="resendSuccess" class="resend-success">
            Verification email resent successfully!
          </p>
        </div>
      </div>

      <div v-else class="verification-success">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h1>Email Verified Successfully!</h1>
        <p>Your email address has been successfully verified.</p>
        <router-link 
          :to="{ name: 'Login' }" 
          class="btn-login"
        >
          Continue to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'VerifyEmail',
  data() {
    return {
      email: this.$route.query.email || '',
      verified: false,
      error: '',
      resending: false,
      resendSuccess: false
    }
  },
  methods: {
    ...mapActions('user', ['verifyEmail', 'resendVerification']),
    async resendVerificationEmail() {
      this.resending = true
      this.error = ''
      this.resendSuccess = false

      try {
        await this.resendVerification({ email: this.email })
        this.resendSuccess = true
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to resend verification email'
      } finally {
        this.resending = false
      }
    },
    async checkVerification() {
      const token = this.$route.query.token
      if (!token) return

      try {
        await this.verifyEmail({ token })
        this.verified = true
      } catch (err) {
        this.error = err.response?.data?.message || 'Email verification failed'
      }
    }
  },
  created() {
    this.checkVerification()
  }
}
</script>

<style scoped>
.verify-email-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
}

.verify-email-container {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.verify-email-container h1 {
  margin-bottom: 1rem;
  color: #333;
}

.instructions {
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}

.instructions strong {
  color: #333;
}

.alert-danger {
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.resend-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.resend-section p {
  margin-bottom: 1rem;
  color: #666;
}

.btn-resend {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-resend:hover {
  background-color: #3aa876;
}

.btn-resend:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.resend-success {
  margin-top: 1rem;
  color: #42b983;
  font-weight: 500;
}

.verification-success {
  padding: 1rem;
}

.success-icon {
  font-size: 4rem;
  color: #42b983;
  margin-bottom: 1.5rem;
}

.verification-success h1 {
  margin-bottom: 1rem;
}

.verification-success p {
  margin-bottom: 2rem;
  color: #555;
}

.btn-login {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #3aa876;
}
</style>
