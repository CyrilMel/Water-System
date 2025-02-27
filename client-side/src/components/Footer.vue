<template>
  ?
  </template>
  
  <script>
  export default {
    data() {
      return {
        brands: [
          "Crystal Rock", "Deep Rock Water", "Hinckley Springs", "Kentwood Springs", "Sierra Springs",
          "Sparkletts", "Vermont Pure", "Primo Water", "Primo Water Plus", "Mount Olympus"
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #004c97;
    color: white;
    padding: 40px 0;
    text-align: center;
  }
  .marquee-container {
    overflow: hidden;
    background: #007bc1;
    padding: 10px 0;
  }
  .marquee {
    display: flex;
    gap: 30px;
    white-space: nowrap;
    animation: marquee-scroll 15s linear infinite;
  }
  .marquee-item {
    font-size: 1.2rem;
    font-weight: bold;
  }
  @keyframes marquee-scroll {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }
  .footer-content ul {
    list-style: none;
    padding: 0;
  }
  .footer-content h5 {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .footer-content ul li:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .email-signup {
    margin-top: 20px;
  }
  .email-input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
  }
  .signup-btn {
    background-color: #ffa500;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  .signup-btn:hover {
    background-color: #ff8700;
  }
  </style>
  