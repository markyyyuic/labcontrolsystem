<template>
    <div class="flex flex-col items-center min-h-screen bg-pink-300 p-8">
      <h1 class="text-4xl font-bold mb-2 text-center text-pink-900">Monday Classes</h1>
      <h2 class="text-xl mb-1 text-center text-pink-700">{{ greetingMessage }}</h2>
      <h3 class="text-lg mb-6 text-center text-pink-700">{{ currentTime }}</h3>
  
      <!-- Morning Classes -->
      <div v-if="morningClasses.length > 0" class="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        <div v-for="classItem in morningClasses" :key="classItem.id" class="bg-pink-100 p-6 rounded-lg shadow-md relative">
          <div class="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
          <p class="mb-2"><span class="font-bold">Subject:</span> {{ classItem.subject }}</p>
          <p class="mb-2"><span class="font-bold">Section:</span> {{ classItem.section }}</p>
          <p class="mb-2"><span class="font-bold">Professor:</span> {{ classItem.professor }}</p>
          <p class="mb-2"><span class="font-bold">Time:</span> {{ formatTime(classItem.time) }}</p>
          <p class="mb-2"><span class="font-bold">Room:</span> {{ classItem.room }}</p>
        </div>
      </div>
  
      <!-- Afternoon Classes -->
      <div v-if="afternoonClasses.length > 0" class="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        <div v-for="classItem in afternoonClasses" :key="classItem.id" class="bg-pink-100 p-6 rounded-lg shadow-md relative">
          <div class="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
          <p class="mb-2"><span class="font-bold">Subject:</span> {{ classItem.subject }}</p>
          <p class="mb-2"><span class="font-bold">Section:</span> {{ classItem.section }}</p>
          <p class="mb-2"><span class="font-bold">Professor:</span> {{ classItem.professor }}</p>
          <p class="mb-2"><span class="font-bold">Time:</span> {{ formatTime(classItem.time) }}</p>
          <p class="mb-2"><span class="font-bold">Room:</span> {{ classItem.room }}</p>
        </div>
      </div>
  
      <!-- Lunchtime Message -->
      <div v-if="isLunchTime" class="text-center mt-8 text-pink-700">
        <h2>Lunch Break!</h2>
        <p>Enjoy your lunch!</p>
      </div>
  
      <!-- Afternoon Message -->
      <div v-if="isAfternoon && afternoonClasses.length === 0" class="text-center mt-8 text-pink-700">
        <h2>No More Classes Today</h2>
        <p>Enjoy the rest of your day!</p>
      </div>
  
      <!-- Loading or Error Message -->
      <div v-if="schedules.length === 0" class="text-center mt-8 text-pink-700">
        <p v-if="!isLoading && !hasError">Loading...</p>
        <p v-if="hasError">Error loading schedules. Please try again later.</p>
      </div>
  
      <footer class="text-center mt-8 text-pink-700">
        <p>University of the Immaculate Conception</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDay: '', // Initialize currentDay as an empty string
        schedules: [],  // This will hold the schedules fetched from your backend
        greetingMessage: 'Praise be Jesus and Mary!', // Define greetingMessage
        currentTime: '', // Define currentTime to hold live current time
        isLoading: false, // Define isLoading
        hasError: false // Define hasError
      };
    },
    computed: {
      morningClasses() {
        return this.schedules.filter(schedule => {
          const startTime = this.parseTime(schedule.time);
          return startTime < 12;
        });
      },
      afternoonClasses() {
        return this.schedules.filter(schedule => {
          const startTime = this.parseTime(schedule.time);
          return startTime >= 12;
        });
      },
      isAfternoon() {
        const currentTime = new Date().getHours();
        return currentTime >= 13; // Assuming afternoon starts at 1PM
      },
      isLunchTime() {
        const currentTime = new Date().getHours();
        return currentTime === 12;  // Assuming lunch break is at 12NN
      }
    },
    methods: {
      getCurrentDay() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
      },
      parseTime(timeString) {
        return parseInt(timeString.split(':')[0]);
      },
      formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const formattedHours = parseInt(hours) % 12 || 12;
        const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
        return `${formattedHours}:${minutes} ${period}`;
      },
      fetchSchedules() {
        // Replace this URL with your actual API endpoint
        fetch('http://127.0.0.1:8000/get-schedules/')
          .then(response => response.json())
          .then(data => {
            this.schedules = data.filter(schedule => schedule.day === this.currentDay); // Assuming the schedule data has a 'day' property
          })
          .catch(error => console.error('Error fetching schedules:', error));
      },
      updateCurrentTime() {
        this.currentTime = 'Current time: ' + new Date().toLocaleTimeString();
      }
    },
    created() {
      this.currentDay = this.getCurrentDay(); // Set the currentDay on component creation
      this.fetchSchedules();
      this.updateCurrentTime(); // Update current time initially
      // Update current time every second
      setInterval(() => {
        this.updateCurrentTime();
      }, 1000); // 1 second in milliseconds
  
      // Refresh the schedule every 5 minutes
      setInterval(() => {
        this.fetchSchedules();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
  };
  </script>
  

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>