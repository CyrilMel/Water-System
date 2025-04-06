<template>
    <div class="login-container">
      <div class="login-card">
        
        <LoginSignupHeader />

        <!-- REGISTER FORM -->
        <form  @submit.prevent="handleRegister">
          <div class="input-group">
            <i class="fa-solid fa-user input-icon"></i>
            <input type="text" placeholder="Name" class="login-input" v-model="name" required />
          </div>
          <div class="input-group">
            <i class="fa-solid fa-envelope input-icon"></i>
            <input type="email" placeholder="Email" class="login-input" v-model="email" required />
          </div>
          <div class="input-group">
            <i class="fa-solid fa-lock input-icon"></i>
            <input :type="showPassword ? 'text' : 'password'" placeholder="Password" class="login-input" v-model="password" required />
            <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
          </div>
          <div class="input-group">
            <i class="fa-solid fa-lock input-icon"></i>
            <input :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" class="login-input" v-model="confirmPassword" required />
            <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
          </div>
          <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
          <p v-if="errorMessages" class="error-message">{{ errorMessages }}</p>
          <button type="submit" class="login-btn">REGISTER</button>
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessages: '',
        confirmPasswordError: '',
        showPassword: false,
        auth: useAuthStore(),
      }
    },
    components: {
      LoginSignupHeader,
    },
    methods: {
      async handleRegister() {
        this.confirmPasswordError = ''
        this.errorMessages = ''
  
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = 'Passwords do not match.'
          return
        } else {
          await this.auth.register({
            name: this.name,
            email: this.email,
            password: this.password,
          })
        }
  
        if (this.auth.user) {
          this.$router.push('/')
        } else {
          this.errorMessages = this.auth.error || 'Registration failed.'
        }
      },
      togglePassword() {
        this.showPassword = !this.showPassword
      },
    },
  }
  </script>