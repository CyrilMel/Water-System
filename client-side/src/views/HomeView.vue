<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo with Water Splashes Inside Card -->
      <div class="logo-wrapper">
        <img src="../assets/images/logo.png" alt="Water Splash Left" class="logo-img" />
      </div>

      <!-- Registration/Login Toggle -->
      <div class="toggle-buttons">
        <span :class="{ active: isRegistering }" @click="isRegistering = true">Registration</span> |
        <span :class="{ active: !isRegistering }" @click="isRegistering = false">Login</span>
      </div>

      <div v-if="isRegistering" class="registration-form">
        <div class="input-group">
          <i class="fa-solid fa-user input-icon"></i>
          <input type="text" placeholder="Name" class="login-input" v-model="name" required />
        </div>
      </div>

      <!-- Email Input -->
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

      <div v-if="isRegistering" class="input-group">
        <i class="fa-solid fa-lock input-icon"></i>
        <input :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" class="login-input" v-model="confirmPassword" required />
        <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
      </div>
      <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>

      <!-- Login/Register Button -->
      <button type="submit" class="login-btn" @click="validateForm">{{ isRegistering ? 'REGISTER' : 'LOG IN' }}</button>
    </div>
  </div>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      isRegistering: false,
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateForm() {
      this.emailError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";

      // Email validation
      if (!this.email.includes("@") || !this.email.includes(".")) {
        this.emailError = "Please enter a valid email.";
      }

      // Password validation (at least 8 characters and one number)
      const passwordPattern = /^(?=.*\d).{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.passwordError = "Password must be at least 8 characters and contain a number.";
      }

      // Confirm password validation (only for registration)
      if (this.isRegistering && this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Passwords do not match.";
      }

      // Prevent submission if any errors exist
      if (this.emailError || this.passwordError || this.confirmPasswordError) {
        return;
      }

      alert(this.isRegistering ? "Registration Successful!" : "Login Successful!");
    }
  }
};
</script>

<style scoped>
/* Background */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #b3e0ff, white);
  position: relative;
}

.logo-img {
  width: 150px;
  height: auto;
}

/* Logo Wrapper */
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
}

/* Toggle Buttons */
.toggle-buttons {
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.toggle-buttons span {
  cursor: pointer;
  color: #4aa3df;
}

.toggle-buttons .active {
  text-decoration: underline;
}

/* Water Splash Images */
.splash-img {
  width: 50px;
  opacity: 0.7;
  position: absolute;
}

.splash-img.left {
  left: -60px;
}

.splash-img.right {
  right: -60px;
}

/* Login Card */
.login-card {
  background: white;
  border: 3px solid #4aa3df;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

/* Card Hover Effect */
.login-card:hover {
  transform: translateY(-5px);
}

/* Input Fields */
.input-group {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #4aa3df;
  border-radius: 10px;
  margin: 8px 0;
  padding: 8px;
  transition: 0.3s;
  position: relative;
}

/* Input Hover & Focus Animation */
.input-group:hover,
.input-group:focus-within {
  box-shadow: 0px 0px 10px rgba(74, 163, 223, 0.5);
  transform: scale(1.03);
}

/* Icons */
.input-icon {
  font-size: 16px;
  margin-right: 8px;
  color: #333;
}

/* Password Toggle */
.fa-eye,
.fa-eye-slash {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #555;
}

/* Input */
.login-input {
  border: none;
  outline: none;
  width: 100%;
  background: none;
  font-size: 14px;
  color: #333;
}

/* Button */
.login-btn {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #4aa3df;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 5px 15px rgba(74, 163, 223, 0.4);
}

/* Button Hover */
.login-btn:hover {
  background: #2e8ac8;
  transform: scale(1.05);
}

/* Error Messages */
.error-message {
  color: red;
  font-size: 12px;
  text-align: left;
  margin-top: -5px;
  margin-bottom: 5px;
}
</style>
