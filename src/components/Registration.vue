<template>
    <PrimeVueToast ref="toast" />
    <div class="flex justify-center items-center h-screen bg-gradient-to-br from-pink-400 to-pink-600">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-3xl font-semibold mb-6 text-center text-pink-900">User Registration</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="username" class="block text-pink-900 font-semibold mb-2">Username</label>
            <input type="text" id="username" v-model="username" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600 placeholder-gray-400" placeholder="Enter your username" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-pink-900 font-semibold mb-2">Password</label>
            <input type="password" id="password" v-model="password" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600 placeholder-gray-400" placeholder="Enter your password" required>
          </div>
          <div class="mb-6">
            <label for="confirmPassword" class="block text-pink-900 font-semibold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600 placeholder-gray-400" placeholder="Confirm your password" required>
          </div>
          <!-- Role selection dropdown -->
          <div class="mb-4">
            <label for="role" class="block text-pink-900 font-semibold mb-2">Role</label>
            <select v-model="role" id="role" class="w-full border border-pink-400 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-pink-600">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" class="w-full bg-pink-700 text-white py-2 px-4 rounded-md hover:bg-pink-800 transition duration-300">Register</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-pink-700 hover:underline">Already have an account? Login here</a>
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
        password: '',
        confirmPassword: '',
        role: 'user' // Default role selection
      };
    },
    methods: {
        async register() {
  try {
    // Check password length
    if (this.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(this.password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password)) {
      throw new Error('Password must contain at least one special character');
    }
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    // Send registration request if all criteria met
    const response = await axios.post('http://127.0.0.1:8000/create-user', {
      username: this.username,
      password: this.password,
      role: this.role // Include selected role in registration data
    });
    
    // Handle successful registration
    this.$toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Registration successful.',
      life: 3000
    });
    // Redirect to login page or perform any other action
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.detail || error.message);
    // Show error message to the user
    this.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.detail || error.message || 'Registration failed.',
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
