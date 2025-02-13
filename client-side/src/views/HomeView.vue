<script setup>

</script>

<template>
  <main>
    <div>

    <div class="container-fluid">
      <div class="row">
        <!-- Carousel Section -->
        <!-- Login Section -->
        <div class="col-md-6 login-section">
          <div class="login-form margin-top">
            <div class="logo-container text-center">
              <!-- <img src="@/assets/images/Logo.png" alt="Company Logo" class="company-logo" /> -->
            </div>
            <h2 class="login-title text-center mb-4">
              <!-- <router-link :to="{ name: 'Register' }">Register </router-link> | Login -->
            </h2>
            <div class="underline mb-4"></div>

            <form >
              <div
              
                class="alert"
      
                role="alert"
              >
              </div>
              <div class="form-group form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Enter your email"
                  required
                />
                <label for="floatingInput">Email address</label>
                <small class="form-text text-right mb-0"
                  ><a href="#">We'll never share your email with anyone else. </a></small
                >
              </div>
              <div class="form-group form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <label for="password">Password</label>
                <!-- <small class="form-text text-right mb-0"
                  ><router-link to="/forget password">Forgot password? </router-link></small
                > -->
              </div>
              <button
                type="submit"
                class="form-group btn btn-primary btn-block drag-active"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>

<style scoped>
/* Base styles */
body {
  background-color: #f5f5f5;
  font-family: 'Poppins', sans-serif;
}

.company-logo {
  width: 250px;
  margin-top: -60px;
}

.login-title {
  margin-bottom: 20px;
}

.form-control {
  border: 1px solid #ced4da;
  width: 80%;
  padding: 8px;
  font-size: 17px;
}

.form-group {
  margin-left: 16%;
}

.btn-primary {
  background-color: #2293CD;
  border: none;
}

.btn-primary:hover {
  background-color: #2293CD;
}

.btn-block {
  width: 67%;
  margin-left: 16%;
}

.alert {
  margin-left: 16%;
  width: 67%;
}

.underline {
  margin-left: 16%;
  width: 68%;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 20px;
}

.register-text,
.login-title a,
.form-text a {
  color: #6c757d;
  text-decoration: none;
}

.form-group.has-error .form-control {
  border-color: red;
}

.login-title a:hover,
.form-text a:hover {
  text-decoration: underline;
}

.margin-top {
  margin-top: 15%;
}

.drag-active:active {
  background-color: #343a40;
  border-color: #343a40;
  color: #ffffff;
}
.loading-line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: rgba(128, 0, 225, 0.8);
  animation: loading-bar 1s infinite;
}

@keyframes loading-bar {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
