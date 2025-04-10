<template>
    <div>
      <!-- Logo -->
      <div class="logo-wrapper">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo-img" />
      </div>

      <!-- Toggle Buttons -->
      <div class="toggle-buttons" style="cursor: pointer;">
          <router-link :to="{name: 'register'}" class="login-toggle">Sign Up</router-link> |
          <router-link :to="{name: 'login'}" class="login-toggle">Login</router-link>
      </div>
    </div>
</template>