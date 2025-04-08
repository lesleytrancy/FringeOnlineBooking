<template>
  <div class="login-container">
    <!-- Left side: Login Form -->
    <div class="login-form">
      <h1 class="brand"><span>ADELAIDE</span> FRINGE</h1>
      <h2>Sign In</h2>

      <form @submit.prevent="handleLogin">
        <label>
          YOUR EMAIL
          <input type="email" v-model="email" placeholder="Enter your mail" required />
        </label>

        <label class="password-label">
          PASSWORD
          <span class="forgot">Forgot your password?</span>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </label>

        <button type="submit" class="login-btn">Sign In</button>
      </form>

      <div class="or">Or</div>

      <button class="google-btn">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
        Sign up with Google
      </button>
    </div>

    <!-- Right side: Welcome message -->
    <div class="login-welcome">
      <h2>Hello Friend</h2>
      <p>To keep connected with us provide us with your information</p>
      <button class="signup-btn" @click="goToSignup">Signup</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

function handleLogin() {
  // Fake login logic
  if (email.value && password.value) {
    localStorage.setItem('token', 'mock_token')
    router.push('/dashboard')
  }
}

function goToSignup() {
  router.push('/reg')
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  font-family: 'ABeeZee', sans-serif;
  border-radius: 12px;
  overflow: hidden;
}

.login-form {
  flex: 1;
  padding: 60px;
  background: #f9f9fb;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand {
  font-size: 24px;
  margin-bottom: 20px;
}
.brand span {
  color: #f25c94;
}

h2 {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #555;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.password-label {
  position: relative;
}
.forgot {
  position: absolute;
  right: 0;
  top: 0;
  font-weight: normal;
  font-size: 12px;
  color: #888;
  cursor: pointer;
}

.login-btn {
  background: #f25c94;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}

.or {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: white;
  border: 1px solid #ddd;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
}
.google-btn img {
  width: 18px;
}

.login-welcome {
  flex: 1;
  position: relative;
  background: url('@/assets/images/banner.png');
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
}

/* Dark overlay */
.login-welcome::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); /* semi-transparent black mask */
  z-index: 1;
}

.login-welcome > * {
  position: relative;
  z-index: 2;
}

.signup-btn {
  margin-top: 20px;
  background: white;
  color: black;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
