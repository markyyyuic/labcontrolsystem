<template>
  <div class="dashboard font-sans">
    <header class="header bg-gray-100 px-4 py-2 flex justify-between items-center">
      <img src="../assets/logo.png" alt="Logo" class="logo text-xl font-bold w-24">
      <nav class="nav">
        <router-link to="/" class="mr-4 text-black">Home</router-link>
        <router-link to="/bookings" class="mr-4 text-black">Bookings</router-link>
        <router-link to="/adminprofile" class="mr-4 text-black">Profile</router-link>


        <a @click="logout" class="text-black cursor-pointer">Log-out</a>
      </nav>
    </header>
    <main class="main-content px-4 py-8">
      <section class="info-cards flex">
        <div class="card bg-gray-100 p-6 rounded-lg w-1/4 mr-4">
          <h2 class="text-lg font-bold mb-4 text-pink-700">Room Availability</h2>
          <ul>
            <li v-for="room in roomAvailability" :key="room.id" class="mb-2">{{ `Room ${room.number}: ${room.status}` }}</li>
          </ul>
        </div>
        <div class="card bg-gray-100 p-6 rounded-lg w-1/4 mr-4">
          <h2 class="text-lg font-bold mb-4 text-pink-700">Current Bookings</h2>
          <ul>
            <li v-for="booking in currentBookings" :key="booking.id" class="mb-2">{{ `Room ${booking.room} | ${booking.date} | ${booking.time} | ${booking.name}` }}</li>
          </ul>
        </div>
        <div class="card bg-gray-100 p-6 rounded-lg w-1/4 mr-4">
          <h2 class="text-lg font-bold mb-4 text-pink-700">Cancelled Bookings</h2>
          <ul>
            <li v-for="booking in cancelledBookings" :key="booking.id" class="mb-2">{{ `Booking #${booking.id} | ${booking.date} | ${booking.reason}` }}</li>
          </ul>
        </div>
        <div class="card bg-gray-100 p-6 rounded-lg w-1/4">
          <h2 class="text-lg font-bold mb-4 text-pink-700">Booking Calendar</h2>
          <Calendar v-model="date" inline showWeek />
        </div>
      </section>
      <section class="history mt-8">
        <h2 class="text-lg font-bold mb-4 text-pink-700">History</h2>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 text-left">Booking ID</th>
              <th class="p-2 text-left">Name</th>
              <th class="p-2 text-left">Email Address</th>
              <th class="p-2 text-left">Room</th>
              <th class="p-2 text-left">Date</th>
              <th class="p-2 text-left">Time</th>
              <th class="p-2 text-left">Purpose</th>
              <th class="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in historyRecords" :key="record.bookingId" class="bg-gray-100">
              <td class="p-2">{{ record.bookingId }}</td>
              <td class="p-2">{{ record.name }}</td>
              <td class="p-2">{{ record.email }}</td>
              <td class="p-2">{{ record.room }}</td>
              <td class="p-2">{{ record.date }}</td>
              <td class="p-2">{{ record.time }}</td>
              <td class="p-2">{{ record.purpose }}</td>
              <td class="p-2">{{ record.status }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import axios from 'axios'; 

export default {
  name: 'MainDashboard',
  components: {
    Calendar
  },
  data() {
    return {
      roomAvailability: [
        { id: 1, number: 101, status: 'Available' },
        { id: 2, number: 102, status: 'Booked' },
        { id: 3, number: 103, status: 'Available' },
        { id: 4, number: 104, status: 'Available' },
        { id: 5, number: 105, status: 'Available' },
      ],
      currentBookings: [
        { id: 1, room: 102, date: '5/23/24', time: '2-4 PM', name: 'John Doe' },
        { id: 2, room: 105, date: '5/24/24', time: '10-12 AM', name: 'Marky' },
        { id: 3, room: 104, date: '5/26/24', time: '3-5 PM', name: 'Anton' },
      ],
      cancelledBookings: [
        { id: 567, date: '5/22/24', reason: 'Cancelled by User' },
        { id: 568, date: '5/23/24', reason: 'Room Unavailable' },
        { id: 569, date: '5/25/24', reason: 'Change in Schedule' },
      ],
      historyRecords: [
        {
          bookingId: 1001,
          name: 'Mark Anthony Nisnea',
          email: 'markybeats@gmail.com',
          room: 'L204',
          date: 'May 18, 2024',
          time: '10:00 AM - 12:00 PM',
          purpose: 'Class',
          status: 'Completed'
        },
        {
          bookingId: 1002,
          name: 'Mark Anthony Nisnea',
          email: 'markybeats@gmail.com',
          room: 'L201',
          date: 'May 20, 2024',
          time: '01:00 PM - 03:00 PM',
          purpose: 'Webdev',
          status: 'Cancelled'
        },
        // Add more records as needed
      ]
    };
  },
  methods: {
    async logout() {
      const token = localStorage.getItem('access_token');
      try {
        await axios.post('http://127.0.0.1:8000/logout', { token });

        // Remove token from localStorage
        localStorage.removeItem('access_token');

        // Redirect to the login page
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
};
</script>