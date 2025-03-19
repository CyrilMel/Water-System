<template>
    <div>
      <div class="input-group">
        <i class="fa-solid fa-user input-icon"></i>
        <input type="text" placeholder="Name" class="login-input" v-model="name" required />
      </div>
  
      <div class="input-group">
        <i class="fa-solid fa-envelope input-icon"></i>
        <input type="text" placeholder="Email" class="login-input" v-model="email" required />
      </div>
      <p v-if="emailError" class="error-message">{{ emailError }}</p>
  
      <!-- Password Input with Toggle -->
      <div class="input-group">
        <i class="fa-solid fa-lock input-icon"></i>
        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" class="login-input" v-model="password" required />
        <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
      </div>
      <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
  
      <div class="input-group">
        <i class="fa-solid fa-lock input-icon"></i>
        <input :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" class="login-input" v-model="confirmPassword" required />
        <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
      </div>
      <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
  
      <!-- Register Button -->
      <button type="submit" class="login-btn" @click="validateRegister" style="cursor: pointer;">
        REGISTER
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPassword: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      validateRegister() {
        this.emailError = "";
        this.passwordError = "";
        this.confirmPasswordError = "";
  
        if (!this.email.includes("@") || !this.email.includes(".")) {
          this.emailError = "Please enter a valid email.";
        }
  
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = "Passwords do not match.";
        }
  
        if (this.emailError || this.passwordError || this.confirmPasswordError) {
          return;
        }
  
        alert("Registration Successful!");
      }
    }
  };
  </script>
  
  <style scoped>
  /* Register Form CSS */
  .input-group {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    transition: all 0.3s ease-in-out;
    position: relative;
  }
  
  .input-group:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  
  .input-icon {
    font-size: 16px;
    margin-right: 8px;
    color: black;
  }
  
  .login-input {
    border: none;
    outline: none;
    width: 100%;
    background: none;
    font-size: 14px;
    color: black;
    caret-color: black;
  }
  
  .login-btn {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #4aa3df, #ffffff);
    color: black;
    font-size: 16px;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  
  .login-btn:hover {
    background: linear-gradient(135deg, #ffffff, #4aa3df);
    transform: scale(1.05);
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  