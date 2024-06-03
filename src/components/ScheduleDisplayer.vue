<template>
    <div>
        <div class="container p-md-4 p-sm-2">

        <h1 class="text-3xl md:text-5xl font-bold mb-4 text-center" style="color: #BC185B;"> {{ currentDay }} Classes</h1>
  
        <!-- Greetings -->
        <div class="text-center mt-4">
          <p class="text-lg md:text-3xl font-bold" style="color: #BC185B;">
            {{ isMorning ? "Praise be Jesus and Mary!" : "Good Afternoon UIC'ians!" }}
          </p>
        </div>
  
        <!-- Morning Classes -->
        <transition name="fade">
          <div v-if="!isLunchTime && morningClasses.length && !isAfternoon">
            <h2 class="text-lg md:text-2xl font-semibold mb-2 text-center" style="color: #BC185B;">Morning Classes</h2>
            <div class="schedule-box-container">
              <div v-for="(schedule, index) in morningClasses" :key="index" class="schedule-box">
                <div class="schedule-item" style="font-size: 1rem; padding: 20px;">
                  <p><span class="label" style="color: #BC185B;">Subject:</span> {{ schedule.subject }}</p>
                  <p><span class="label" style="color: #BC185B;">Section:</span> {{ schedule.section }}</p>
                  <p><span class="label" style="color: #BC185B;">Professor:</span> {{ schedule.professor }}</p>
                  <p><span class="label" style="color: #BC185B;">Time:</span> {{ formatTime(schedule.start_time) }} - {{ formatTime(schedule.end_time) }}</p>
                  <p><span class="label" style="color: #BC185B;">Room:</span> {{ schedule.room_number }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
  
        <!-- Afternoon Classes -->
        <transition name="fade">
          <div v-if="!isLunchTime && isAfternoon && afternoonClasses.length">
            <h2 class="text-lg md:text-2xl font-semibold mb-2 text-center" style="color: #BC185B;">Afternoon Classes</h2>
            <div class="schedule-box-container">
              <div v-for="(schedule, index) in afternoonClasses" :key="index" class="schedule-box">
                <div class="schedule-item" style="font-size: 1rem; padding: 20px;">
                  <p><span class="label" style="color: #BC185B;">Subject:</span> {{ schedule.subject }}</p>
                  <p><span class="label" style="color: #BC185B;">Section:</span> {{ schedule.section }}</p>
                  <p><span class="label" style="color: #BC185B;">Professor:</span> {{ schedule.professor }}</p>
                  <p><span class="label" style="color: #BC185B;">Time:</span> {{ formatTime(schedule.start_time) }} - {{ formatTime(schedule.end_time) }}</p>
                  <p><span class="label" style="color: #BC185B;">Room:</span> {{ schedule.room_number }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
  
        <!-- No Classes -->
        <div v-if="!isLunchTime && !morningClasses.length && !afternoonClasses.length">
          <p class="text-lg md:text-2xl text-center" style="color: #BC185B;">No classes.</p>
        </div>
  
        <!-- Lunch Break -->
        <transition name="fade">
          <div v-if="isLunchTime" class="text-center mt-4">
            <p class="text-lg md:text-xl font-bold" style="color: #BC185B;">Lunch Break!</p>
          </div>
        </transition>
  
      </div>
      
      <!-- School Name -->
      <div class="text-center py-3.5" style="background-color: #BC185B;">
        <p class="text-lg md:text-xl font-bold" style="color: #F0EBE3;">University of the Immaculate Conception</p>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentDay: this.getCurrentDay(),
      schedules: [], // This will hold the schedules fetched from your backend
    };
  },
  computed: {
    morningClasses() {
      return this.schedules.filter(schedule => {
        const startTime = this.parseTime(schedule.start_time);
        return startTime < 12;
      });
    },
    afternoonClasses() {
      return this.schedules.filter(schedule => {
        const startTime = this.parseTime(schedule.start_time);
        return startTime >= 12;
      });
    },
    isAfternoon() {
      const currentTime = new Date().getHours();
      return currentTime >= 12 && currentTime < 18; // Assuming afternoon starts at 12PM and ends at 6PM
    },
    isMorning() {
      const currentTime = new Date().getHours();
      return currentTime < 12;
    },
    isLunchTime() {
      const currentTime = new Date().getHours();
      return currentTime === 12;
    },
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
          this.schedules = data.filter(schedule => schedule.day_of_week === this.currentDay);
        })
        .catch(error => console.error('Error fetching schedules:', error));
    },
  },
  created() {
    this.fetchSchedules();
    // Refresh the schedule every 5 minutes
    setInterval(() => {
      this.fetchSchedules();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  background-color: #F0EBE3;
  padding: 8% 5%; /* Adjust padding based on viewport */
  animation: colorChange 5s infinite alternate;
  overflow-x: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 94vh; /* Set height to fill the viewport */
  width: 100%; /* Set width to fill the entire page */
}


@keyframes colorChange {
  0% {
    background-color: #eee2eb; /* Initial background color */
  }
  50% {
    background-color: #f1bae2; /* Intermediate background color */
  }
  100% {
    background-color: #f097d5; /* Final background color */
  }
}

.p-4 {
  font-family: 'Inter', Arial, sans-serif; /* Set font to Inter */
}

.schedule-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.schedule-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 250px;
  background-color: #F3D0D7;
  border-radius: 5px;
  padding: 20px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.schedule-box::before {
  content: '';
  position: absolute;
  width: calc(100% + 8px); /* Adjust width to cover the outer edge of the border */
  height: calc(100% + 8px); /* Adjust height to cover the outer edge of the border */
  left: -4px; /* Move left to position the border outside the schedule box */
  top: -4px; /* Move top to position the border outside the schedule box */
  border: 3px solid #BC185B;
  border-radius: 5px;
  animation: animate 8s linear infinite;
  box-sizing: border-box;
}

@keyframes animate {
  0%, 100% {
    clip-path: inset(0px 0px 100% 0px);
  }
  25% {
    clip-path: inset(0px 0px 0px 100%);
  }
  50% {
    clip-path: inset(100% 0px 0px 0px);
  }
  75% {
    clip-path: inset(0px 100% 0px 0px);
  }
}

.schedule-item {
  margin: 0;
}

.label {
  font-weight: bold;
  color: #BC185B;
}

.text-center {
  text-align: center;
}

.text-lg {
  font-size: 1.125rem; /* 18px */
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}

/* Responsive Padding */
.p-sm-2 {
  padding: 10px; /* Small devices */
}

.p-md-4 {
  padding: 20px; /* Medium devices */
}

.py-4 {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Responsive Fonts */
.text-md {
  font-size: 1rem; /* 16px */
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}
</style>
