<template>
  <div class="login-container">
    <div class="login-card">

      <LoginSignupHeader />
      
      <!-- LOGIN FORM -->
      <form  @submit.prevent="handleLogin">
        <div class="input-group">
          <i class="fa-solid fa-envelope input-icon"></i>
          <input type="email" placeholder="Email" class="login-input" v-model="email" required />
        </div>
        <div class="input-group">
          <i class="fa-solid fa-lock input-icon"></i>
          <input :type="showPassword ? 'text' : 'password'" placeholder="Password" class="login-input" v-model="password" required />
          <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
        </div>
        <p v-if="errorMessages" class="error-message">{{ errorMessages }}</p>
        <button type="submit" class="login-btn">LOG IN</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'
import LoginSignupHeader from '@/components/LoginSignupHeader.vue'
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessages: '',
      showPassword: false,
      auth: useAuthStore(),
    }
  },
  components: {
    LoginSignupHeader,
  },
  methods: {
    async handleLogin() {
      this.errorMessages = ''
      await this.auth.login(this.email, this.password)
      if (this.auth.user) {
        this.$router.push('/')
      } else {
        this.errorMessages = 'Invalid email or password.'
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>