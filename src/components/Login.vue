<template>
  <PrimeVueToast ref="toast" />
  <div class="flex justify-center items-center h-screen bg-gradient-to-br from-pink-400 to-pink-600">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-3xl font-semibold mb-6 text-center text-pink-900">Admin Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-pink-900 font-semibold mb-2">Username</label>
          <input type="text" id="username" v-model="username" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600 placeholder-gray-400" placeholder="Enter your username" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-pink-900 font-semibold mb-2">Password</label>
          <input type="password" id="password" v-model="password" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600 placeholder-gray-400" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="w-full bg-pink-700 text-white py-2 px-4 rounded-md hover:bg-pink-800 transition duration-300">Login</button>
      </form>
      <div class="mt-4 text-center flex justify-center">
        <div class="mt-4 text-center">
  <div class="flex justify-center ml-1">
    <a href="#" class="text-pink-700 hover:underline">Forgot your password?</a>
    <span class="text-gray-600 mx-2">|</span>
    <a href="#" class="text-pink-700 hover:underline">Sign Up</a>
  </div>
</div>

</div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PrimeVueToast from 'primevue/toast';

export default {
  components: {
      PrimeVueToast,
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
  try {
    const formData = new URLSearchParams();
    formData.append('username', this.username);
    formData.append('password', this.password);

    const response = await axios.post('http://127.0.0.1:8000/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = response.data.access_token;
    // Handle successful login
    this.$toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful.',
      life: 3000
    });
    // Redirect to admin dashboard or perform any other action
  } catch (error) {
    console.error('Login failed:', error.response.data.detail);
    // Show error message to the user
    this.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.detail || 'Incorrect username or password.',
      life: 3000
    });
  }
}

  }
};
</script>

<style scoped>
  /* Add custom styles here */
</style>
