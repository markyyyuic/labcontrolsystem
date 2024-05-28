<template>
    <div class="forgot-password-container flex justify-center items-center h-screen w-screen bg-pink-700">
      <div class="form-wrapper bg-white w-full max-w-lg shadow-lg p-10 flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="w-1/4 mt-5">
        <h1 class="text-4xl text-pink-700 font-bold text-center mb-4">Forgot Password</h1>
        <p class="text-center text-xl text-gray-900 font-bold mb-10">Enter your email to reset your password.</p>
        
        <form @submit.prevent="requestPasswordReset" class="w-full max-w-md">
          <div class="form-group relative mb-8">
            <input v-model="email" type="email" id="email" class="form-input w-full py-4 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-black-700" placeholder=" ">
            <label for="email" class="form-label absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 text-lg text-gray-600 transition-all">
              <i class="pi pi-envelope"></i> Email
            </label>
          </div>
          <button type="submit" class="btn-submit w-full py-4 text-xl font-bold text-white bg-pink-700 rounded-lg hover:bg-pink-800 transition-colors">Request Reset</button>
        </form>
      </div>
      <Toast ref="toast"></Toast>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Toast from 'primevue/toast';
  
  export default {
    name: 'ForgotPassword',
    components: {
      Toast
    },
    data() {
      return {
        email: '',
      };
    },
    methods: {
      async requestPasswordReset() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/forgot-password', {
            email: this.email,
          });
          this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Email not found', life: 3000 });
          } else {
            this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  html,
  body,
  #app {
    font-family: 'Inter', sans-serif;
  }
  
  .forgot-password-container {
    background: #BC185B;
  }
  
  .form-wrapper {
    width: 90%;
    max-width: 600px;
    background: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .form-wrapper img {
    width: 100%;
    max-width: 100px;
    margin: 0 auto;
    display: block;
  }
  
  .form-wrapper h1 {
    font-size: 2.5rem;
    color: #BC185B;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .form-wrapper p {
    text-align: center;
    font-size: 1rem;
    color: #0b0b0b;
    font-weight: bolder;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .form-label {
    position: absolute;
    top: 0.5rem;
    left: 0.75rem;
    transform: translateY(-50%);
    background-color: #fff;
    padding: 0 0.25rem;
    color: #666;
    transition: all 0.2s;
  }
  
  .form-input:focus + .form-label,
  .form-input:not(:placeholder-shown) + .form-label {
    top: 0;
    left: 0.75rem;
    font-size: 0.875rem;
    color: #000000;
  }
  
  .btn-submit {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #BC185B;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-submit:hover {
    background-color: #960d42;
  }
  </style>
  