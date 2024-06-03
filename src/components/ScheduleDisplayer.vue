<template>
    <div class="flex flex-col items-center min-h-screen bg-pink-300 p-8">
      <h1 class="text-4xl font-bold mb-2 text-center text-pink-900">Monday Classes</h1>
      <h2 class="text-xl mb-1 text-center text-pink-700">{{ greetingMessage }}</h2>
      <h3 class="text-lg mb-6 text-center text-pink-700">{{ timeMessage }}</h3>
  
      <transition name="fade" mode="out-in">
        <div class="grid gap-8 md:grid-cols-3 w-full max-w-6xl" v-if="filteredClasses.length > 0" key="classes">
          <div
            v-for="(classItem, index) in filteredClasses"
            :key="index"
            class="bg-pink-100 p-6 rounded-lg shadow-md relative">
            <div class="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
            <p class="mb-2"><span class="font-bold">Subject:</span> {{ classItem.subject }}</p>
            <p class="mb-2"><span class="font-bold">Section:</span> {{ classItem.section }}</p>
            <p class="mb-2"><span class="font-bold">Professor:</span> {{ classItem.professor }}</p>
            <p class="mb-2"><span class="font-bold">Time:</span> {{ classItem.time }}</p>
            <p class="mb-2"><span class="font-bold">Room:</span> {{ classItem.room }}</p>
          </div>
        </div>
  
        <div v-else key="no-classes" class="text-center mt-8 text-pink-700">
          <p>No more classes for today. See you tomorrow!</p>
        </div>
      </transition>
  
      <footer class="text-center mt-8 text-pink-700">
        <p>University of the Immaculate Conception</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MondayClasses',
    data() {
      return {
        classes: [],
        currentTime: new Date(),
        filteredClasses: [],
      };
    },
    computed: {
      greetingMessage() {
        const hours = this.currentTime.getHours();
        return hours < 12 ? 'Good Morning UIC\'ians!' : 'Good Afternoon UIC\'ians!';
      },
      timeMessage() {
        const hours = this.currentTime.getHours();
        if (hours < 12) {
          return 'Morning Classes';
        } else if (hours >= 13 && hours < 17) {
          return 'Afternoon Classes';
        } else {
          return 'Lunch Break!';
        }
      }
    },
    methods: {
      fetchSchedule() {
        fetch('http://127.0.0.1:8000/schedule')  // Adjust the URL if different
          .then(response => response.json())
          .then(data => {
            this.classes = data;
            this.filterClasses();
          })
          .catch(error => {
            console.error('Error fetching schedule:', error);
          });
      },
      filterClasses() {
        const currentHour = this.currentTime.getHours();
        if (currentHour < 12) {
          this.filteredClasses = this.classes.filter(classItem => {
            const classStartHour = parseInt(classItem.time.split('-')[0].split(':')[0]);
            return classStartHour < 12;
          });
        } else if (currentHour >= 13 && currentHour < 17) {
          this.filteredClasses = this.classes.filter(classItem => {
            const classStartHour = parseInt(classItem.time.split('-')[0].split(':')[0]);
            return classStartHour >= 13 && classStartHour < 17;
          });
        } else {
          this.filteredClasses = [];
        }
      }
    },
    mounted() {
      this.fetchSchedule();
      this.filterClasses();
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  