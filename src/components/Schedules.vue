<template>
  <div class="schedule-container min-h-screen w-full p-5 bg-gradient-to-b from-pink-800 to-pink-600 text-white font-sans">
    <h1 class="text-4xl font-bold mb-8">Faculty Schedule</h1>
    <div class="schedule-header flex justify-between items-center mb-8">
      <span class="semester text-lg font-bold">Second Semester 2023-2024</span>
      <div class="filter-buttons">
        <button @click="filterType('All')" class="btn">All</button>
        <button @click="filterType('Lec')" class="btn">Lecture</button>
        <button @click="filterType('Lab')" class="btn">Lab</button>
      </div>
    </div>
    <div class="schedule-grid grid grid-cols-5 gap-4">
      <div class="day-header bg-pink-700 p-4 rounded-lg text-center font-bold" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      <div v-for="day in daysOfWeek" :key="`schedule-${day}`" class="schedule-day flex flex-col">
        <template v-for="(slots, time) in organizedSchedule[day]" :key="time">
          <div class="schedule-time bg-pink-700 p-2 rounded-lg mb-4">{{ time }}</div>
          <div v-for="course in slots" :key="`${course.code}-${course.section}`" class="schedule-item bg-pink-800 p-4 mb-4 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-2">
              <div class="schedule-code font-bold text-lg">{{ course.code }}</div>
              <div class="schedule-type">
                <span v-for="type in course.type" :key="type" :class="[ 'type-badge', type === 'Lec' ? 'lec' : 'lab' ]">{{ type }}</span>
              </div>
            </div>
            <div class="schedule-details">
              <div class="schedule-name text-xl font-bold">{{ course.name }} - Section {{ course.section }}</div>
              <div class="schedule-instructor italic">{{ course.instructor }}</div>
              <div class="schedule-time">Time: {{ course.time }}</div>
              <div class="schedule-room">Room: {{ course.room }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      scheduleData: {
        Mon: [
          {
            code: 'CC221',
            name: 'Web Applications Development 2',
            instructor: 'Balaman',
            type: ['Lec', 'Lab'],
            time: '9:00 AM - 12:00 PM',
            room: '201',
            section: '2A'
          },
          {
            code: 'CC221',
            name: 'Web Applications Development 2',
            instructor: 'Balaman',
            type: ['Lec', 'Lab'],
            time: '9:00 AM - 12:00 PM',
            room: '201',
            section: '2B'
          }
        ],
        Tue: [
          {
            code: 'LIT003/RS002',
            name: 'Religions, Religious Experiences, & Spirituality',
            instructor: 'Buniel',
            type: ['Lec'],
            time: '10:30 AM - 12:00 PM',
            room: '203',
            section: '1A'
          },
          {
            code: 'GEC009',
            name: 'Life & Works of Rizal',
            instructor: 'Aleria',
            type: ['Lec'],
            time: '2:30 PM - 4:00 PM',
            room: '204',
            section: '1B'
          }
        ],
        Wed: [
          {
            code: 'CC222',
            name: 'Advanced Database Systems',
            instructor: 'Badiang',
            type: ['Lec', 'Lab'],
            time: '9:00 AM - 12:00 PM',
            room: '205',
            section: '3A'
          }
        ],
        Thu: [
          {
            code: 'IT221',
            name: 'Networking 2',
            instructor: 'Cloribel',
            type: ['Lec', 'Lab'],
            time: '9:00 AM - 12:00 PM',
            room: '206',
            section: '3B'
          }
        ],
        Fri: [
          {
            code: 'CC223',
            name: 'Software Engineering',
            instructor: 'Ramos',
            type: ['Lec'],
            time: '10:00 AM - 12:00 PM',
            room: '301',
            section: '4A'
          },
          {
            code: 'IT224',
            name: 'Cybersecurity Fundamentals',
            instructor: 'Garcia',
            type: ['Lec', 'Lab'],
            time: '1:00 PM - 4:00 PM',
            room: '302',
            section: '4B'
          }
        ]
      },
      filter: 'All'
    };
  },
  computed: {
    filteredScheduleData() {
      if (this.filter === 'All') {
        return this.scheduleData;
      }

      let filteredData = {};
  
      for (let day in this.scheduleData) {
        filteredData[day] = this.scheduleData[day].filter(course => course.type.includes(this.filter));
      }

      return filteredData;
    },
    organizedSchedule() {
      let organized = {};
      for (let day in this.filteredScheduleData) {
        organized[day] = {};
        this.filteredScheduleData[day].forEach(course => {
          if (!organized[day][course.time]) {
            organized[day][course.time] = [];
          }
          organized[day][course.time].push(course);
        });
      }
      return organized;
    }
  },
  methods: {
    filterType(type) {
      this.filter = type;
    }
  }
};
</script>

<style scoped>
.btn {
  @apply bg-white text-pink-700 border-none py-2 px-4 mr-2 cursor-pointer rounded-lg shadow hover:bg-gray-200 transition-colors;
}

.type-badge {
  @apply px-2 py-1 mr-1 rounded-lg shadow-sm;
}

.type-badge.lec {
  @apply bg-green-600 text-white;
}

.type-badge.lab {
  @apply bg-red-600 text-white;
}

.schedule-item {
  @apply transition-transform transform duration-200 ease-in-out;
}

.schedule-item:hover {
  @apply scale-105;
}


@media only screen and (min-width: 768px) {
  .schedule-grid {
    grid-template-columns: repeat(5, 1fr); /* Display five columns on larger screens */
  }
}

/* Define styles for medium-sized screens */
@media only screen and (max-width: 767px) {
  .schedule-grid {
    grid-template-columns: repeat(3, 1fr); /* Display three columns on medium-sized screens */
  }
}

/* Define styles for small screens */
@media only screen and (max-width: 479px) {
  .schedule-grid {
    grid-template-columns: repeat(2, 1fr); /* Display two columns on small screens */
  }
}
</style>
