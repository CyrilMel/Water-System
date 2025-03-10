<template>
  <div>
    <div class="messenger-chat" @click="toggleChat">
      <i class="fab fa-facebook-messenger"></i>
    </div>

    <div v-if="showChatBox" class="chat-box">
      <div class="chat-header">
        <span>Messenger Chat</span>
        <button @click="toggleChat" class="close-btn">&times;</button>
      </div>
      <div class="chat-body">
        <p>👋 Hi there! How can we assist you today?</p>
        <p>Click "Start Message" to chat with our admin on Messenger.</p>
      </div>
      <div class="chat-footer">
        <button class="start-message" @click="redirectToMessenger">Start Message</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChatBox: false
    };
  },
  methods: {
    toggleChat() {
      this.showChatBox = !this.showChatBox;
    },
    redirectToMessenger() {
      window.open("https://www.messenger.com/e2ee/t/25229921943289018", "_blank", "noopener,noreferrer");
    }
  }
};
</script>

<style scoped>
.messenger-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #0084FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  z-index: 1000;
}

.messenger-chat i {
  color: white;
  font-size: 28px;
}

.messenger-chat:hover {
  transform: scale(1.1);
  background: #006AFF;
}

.chat-box {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
}

.chat-header {
  background: #0084FF;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-body {
  padding: 15px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.chat-footer {
  padding: 10px;
  text-align: center;
  background: #f1f1f1;
}

.start-message {
  background: #0084FF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.start-message:hover {
  background: #006AFF;
}
</style>
