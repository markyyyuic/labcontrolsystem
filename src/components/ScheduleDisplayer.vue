<template>
  <div class="flex flex-col items-center min-h-screen bg-pink-300 p-8">
    <h1 class="text-4xl font-bold  text-center text-pink-900">{{ currentDay }} Classes</h1>
    <h2 class="text-xl mb-1 text-center text-pink-700">{{ greetingMessage }}</h2>
    <h3 class="text-lg mb-6 text-center text-pink-700">{{ currentTime }}</h3>
    
    <!-- Morning Classes Heading (Moved up a bit) -->
    <div v-if="morningClasses.length > 0" class="text-lg mb-1 text-center text-pink-700 font-bold">Morning Classes</div>
  
    <!-- Display Morning Classes -->
    <div v-if="morningClasses.length > 0" class="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
      <div v-for="classItem in morningClasses" :key="classItem.id" class="bg-pink-100 p-6 rounded-lg shadow-md relative">
        <div class="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
        <p class="mb-2"><span class="font-bold">Subject:</span> {{ classItem.subject }}</p>
        <p class="mb-2"><span class="font-bold">Section:</span> {{ classItem.course_code ? classItem.course_code : 'Not specified' }}</p>
        <p class="mb-2"><span class="font-bold">Professor:</span> {{ classItem.professor }}</p>
        <p class="mb-2"><span class="font-bold">Time:</span> {{ formatTime(classItem.start_time, classItem.end_time) }}</p>
        <p class="mb-2"><span class="font-bold">Room:</span> {{ classItem.room_number ? classItem.room_number : 'Not specified' }}</p>
      </div>
    </div>

    <!-- Afternoon Classes Heading -->
    <div v-if="afternoonClasses.length > 0" class="text-lg mb-1 text-center text-pink-700 font-bold">Afternoon Classes</div>
  
    <!-- Display Afternoon Classes -->
    <div v-if="afternoonClasses.length > 0" class="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
      <div v-for="classItem in afternoonClasses" :key="classItem.id" class="bg-pink-100 p-6 rounded-lg shadow-md relative">
        <div class="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
        <p class="mb-2"><span class="font-bold">Subject:</span> {{ classItem.subject }}</p>
        <p class="mb-2"><span class="font-bold">Section:</span> {{ classItem.course_code ? classItem.course_code : 'Not specified' }}</p>
        <p class="mb-2"><span class="font-bold">Professor:</span> {{ classItem.professor }}</p>
        <p class="mb-2"><span class="font-bold">Time:</span> {{ formatTime(classItem.start_time, classItem.end_time) }}</p>
        <p class="mb-2"><span class="font-bold">Room:</span> {{ classItem.room_number ? classItem.room_number : 'Not specified' }}</p>
      </div>
    </div>

    <!-- Lunch Break Message with Animation -->
    <transition name="slide">
  <div v-if="isLunchTime" class="text-center mt-8 text-pink-700 lunch-break">
    <h2 class="text-3xl font-bold">Lunch Break!</h2>
    <p class="text-lg font-bold">Enjoy your lunch!</p>
  </div>
</transition>


    <!-- Afternoon Message -->
    <div v-if="isAfternoon && afternoonClasses.length === 0" class="text-center mt-8 text-pink-700">
      <h2>No More Classes Today</h2>
      <p>Enjoy the rest of your day!</p>
    </div>

    <!-- Loading or Error Message -->
    <div v-if="isLoading" class="text-center mt-8 text-pink-700">
      <p>Loading...</p>
    </div>
    <div v-if="hasError" class="text-center mt-8 text-pink-700">
      <p>Error loading schedules. Please try again later.</p>
    </div>

    <footer class="text-center mt-8 text-pink-700">
      <p class="text-xl font-bold">University of the Immaculate Conception</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDay: '',
      schedules: [],
      greetingMessage: 'Praise be Jesus and Mary!',
      currentTime: '',
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    morningClasses() {
      if (this.isAfternoon) {
        return [];
      }
      return this.schedules.filter(schedule => {
        const startTime = schedule.start_time ? this.parseTime(schedule.start_time) : null;
        return startTime !== null && startTime < 12 && schedule.day_of_week === this.currentDay;
      });
    },
    afternoonClasses() {
      if (!this.isAfternoon) {
        return [];
      }
      return this.schedules.filter(schedule => {
        const startTime = schedule.start_time ? this.parseTime(schedule.start_time) : null;
        return startTime !== null && startTime >= 12 && schedule.day_of_week === this.currentDay;
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
  methods:
  {
    getCurrentDay() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[new Date().getDay()];
    },
    parseTime(timeString) {
      if (!timeString || !timeString.includes(':')) {
        return null;
      }
      return parseInt(timeString.split(':')[0]);
    },
    formatTime(startTime, endTime) {
      if (!startTime || !endTime) {
        return 'Not specified';
      }
      const formatHour = (hour) => {
        return (parseInt(hour) % 12 || 12).toString().padStart(2, '0');
      };
      const [startHour, startMinute] = startTime.split(':');
      const [endHour, endMinute] = endTime.split(':');
      const formattedStartTime = `${formatHour(startHour)}:${startMinute} ${parseInt(startHour) >= 12 ? 'PM' : 'AM'}`;
      const formattedEndTime = `${formatHour(endHour)}:${endMinute} ${parseInt(endHour) >= 12 ? 'PM' : 'AM'}`;
      return `${formattedStartTime} - ${formattedEndTime}`;
    },
    fetchSchedules() {
      if (this.isLunchTime) {
        // Reset schedules to an empty array if it's lunchtime
        this.schedules = [];
        return;
      }

      this.isLoading = true;
      this.hasError = false;

      // Replace this URL with your actual API endpoint
      fetch('http://127.0.0.1:8000/get-schedules/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            this.schedules = data.filter(schedule => {
              return schedule.day_of_week === this.currentDay &&
                     schedule.start_time &&
                     schedule.subject &&
                     schedule.professor;
            });
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching schedules:', error);
          this.hasError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateCurrentTime() {
      this.currentTime = 'Current time: ' + new Date().toLocaleTimeString();
    }
  },
  created() {
    this.currentDay = this.getCurrentDay();

    this.fetchSchedules();
    this.updateCurrentTime();
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000); // Update current time every second

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

/* Animation styles */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}
.lunch-break {
  animation: jump 0.5s infinite alternate;
}
@keyframes jump {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}
</style>
