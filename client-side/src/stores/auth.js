import { defineStore } from "pinia";
import axios from "@/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
      user: JSON.parse(localStorage.getItem('user')) || null,
      loading: false,
      error: null,
    }),
    actions: {
      async register(userData) {
        this.loading = true
        this.error = null
        try {
          const res = await axios.post('/api/users', userData)
      
          if (res.data.success) {
            this.user = res.data.user
            localStorage.setItem('user', JSON.stringify(this.user))
          } else {
            this.error = res.data.message
          }
        } catch (err) {
          this.error = err.response?.data?.message || 'Server error'
        } finally {
          this.loading = false
        }
      },
      
      async login(email, password) {
        this.loading = true
        this.error = null
        try {
          const res = await axios.post('/api/users/login', { email, password })
  
          if (res.data.success) {
            this.user = res.data.user
            localStorage.setItem('user', JSON.stringify(this.user))
          } else {
            this.error = res.data.message
          }
        } catch (err) {
          this.error = err.response?.data?.message || 'Server error'
        } finally {
          this.loading = false
        }
      },
      
      logout() {
        this.user = null
        localStorage.removeItem('user')
        window.location.href = '/login'
      },
    },
})