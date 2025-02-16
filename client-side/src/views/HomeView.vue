<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo -->
      <div class="logo-wrapper">
        <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
      </div>

      <!-- Toggle between Login & Registration -->
      <div class="toggle-buttons">
        <span :class="{ active: isRegistering }" @click="isRegistering = true">Registration</span> |
        <span :class="{ active: !isRegistering }" @click="isRegistering = false">Login</span>
      </div>

      <!-- Registration Form -->
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
      <button type="submit" class="login-btn" @click="validateForm" style="cursor: pointer;">
        {{ isRegistering ? 'REGISTER' : 'LOG IN' }}
      </button>
    </div>
  </div>
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
      staticEmail: "test@gmail.com",
      staticPassword: "testtest",
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

      if (!this.email.includes("@") || !this.email.includes(".")) {
        this.emailError = "Please enter a valid email.";
      }

      if (this.isRegistering && this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Passwords do not match.";
      }

      if (this.emailError || this.passwordError || this.confirmPasswordError) {
        return;
      }

      if (!this.isRegistering) {
        if (this.email === this.staticEmail && this.password === this.staticPassword) {
          alert("Login Successful!");
          this.$router.push("/dashboard");
        } else {
          this.passwordError = "Invalid email or password.";
        }
      } else {
        alert("Registration Successful!");
      }
    }
  }
};
</script>

<style scoped>
/* Background */
.logo-img{
  width: 50%;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #ffffff, #4aa3df);
  overflow: hidden;
}

/* Login Card */
.login-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  width: 380px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease-in-out;
}

.login-card:hover {
  transform: translateY(-5px);
}

/* Input Fields */
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

/* Input */
.login-input {
  border: none;
  outline: none;
  width: 100%;
  background: none;
  font-size: 14px;
  color: black;
  caret-color: black;
}

/* Login Button */
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
</style>
