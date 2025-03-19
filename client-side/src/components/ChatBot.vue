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

