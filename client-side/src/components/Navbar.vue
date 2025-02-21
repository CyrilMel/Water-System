<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <!-- Brand/Logo with flexible margin -->
      <router-link
        class="navbar-brand"
        to="/"
        style="margin-left: auto; margin-right: auto"
      >
        <img src="../assets/images/logo.png" alt="Logo" class="navbar-logo" />
      </router-link>

      <!-- Toggle Button for Mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links with right margin -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="margin-right: 200px">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/delivery">Delivery</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contacts">Contacts</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: center; /* Centers the logo */
  flex-grow: 1; /* Allow the logo container to grow and take space */
}

.navbar-logo {
  height: 40px; /* Adjust logo size */
  margin-right: 10px;
}

.nav-link {
  color: #4aa3df !important; /* Blue text color */
}

.btn-outline-primary {
  color: #4aa3df; /* Blue text color */
}

.btn-outline-primary:hover {
  background-color: #4aa3df; /* Blue background on hover */
  color: white; /* White text on hover */
}
/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-brand {
    margin-left: 0; /* Remove left margin for smaller screens */
    margin-right: 400px; /* Remove right margin for smaller screens */
    justify-content: center; /* Center logo in smaller screens */
  }

  .navbar-nav {
    margin-right: 200px; /* Reduced margin on smaller screens */
  }

  .navbar-logo {
    height: 30px; /* Reduce logo size on smaller screens */
  }
}
</style>