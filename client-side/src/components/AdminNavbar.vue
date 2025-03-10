<template>
  <div class="navbar">
    <div class="profile">
      <i class="fas fa-bell text-white"></i>
      <img src="/src/assets/images/blank-profile.png" class="profile-img" />
      <span class="username text-white">Aldrin Cruz</span>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: relative; /* Not fixed, so it scrolls away */
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #0099ff;
}

.profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.username {
  font-weight: bold;
  cursor: pointer;
}
</style>
