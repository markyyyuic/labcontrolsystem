<template>
  <div class="landing-page-container flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-gray-100 py-4 px-6 flex justify-between items-center shadow-sm">
      <img src="../assets/logo.png" alt="Logo" class="h-10">
      <!-- Burger Menu Icon -->
      <button @click="toggleNav" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <!-- Navigation Links -->
      <nav :class="{'hidden': !showNav, 'flex': showNav, 'flex-col': showNav}" class="md:flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-700">
        <a href="#" class="hover:text-gray-900">Home</a>
        <a href="#" class="hover:text-gray-900">About</a>
        <a href="#" class="hover:text-gray-900">Contact Us</a>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex flex-col md:flex-row flex-grow items-center md:justify-between bg-white py-10 px-6 md:px-12">
      <div class="max-w-md text-center md:text-left md:mr-10">
        <h1 class="text-5xl font-bold text-pink-700">LABORATORY</h1>
        <h2 class="text-5xl font-normal text-black">BOOKING</h2>
        <p class="mt-4 text-lg text-gray-700">
          "Experience the convenience of scheduling laboratory appointments online through our efficient Laboratory Booking System."
        </p>
        <router-link to="/bookingpage">
          <button class="mt-6 px-6 py-3 bg-pink-700 text-white text-lg font-bold rounded-md hover:bg-pink-800 transition duration-200">
            Book now
          </button>
        </router-link>
      </div>
      <div class="mt-10 md:mt-0 flex-1 flex justify-center items-center md:justify-end">
        <img src="../assets/Landingpage.png" alt="Laboratory Booking" class="max-w-full h-auto object-contain">
      </div>
    </main>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: "LandingPage",
  components: {
    RouterLink
  },
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Add any additional custom styles if needed */
</style>
