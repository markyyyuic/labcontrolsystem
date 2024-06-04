<template>
  <div class="flex h-screen">
    <!-- Navigation Bar -->
    <NavigationBar :username="adminName" />

    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <!-- Upload Form Content -->
      <div class="container mx-auto px-4 py-6">
        <h2 class="text-2xl font-semibold mb-2">Schedule Upload Form</h2>
        <div class="bg-white shadow-md rounded-lg p-6">
          <!-- Upload Form -->
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="csvFile" class="text-lg font-semibold mb-2">Upload CSV File</label>
              <input type="file" id="csvFile" accept=".csv" @change="onFileChange" class="border border-gray-300 px-3 py-2 rounded-md w-full">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
          </form>
        </div>
      </div>

      <!-- DATA TABLE -->
      <div class="card" style="max-height: 300px;"> <!-- Adjust max-height as needed -->
        <DataTable :value="schedules" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 1rem">
          <Column field="day_of_week" header="Day of Week" style="width: 12.5%"></Column>
          <Column field="start_time" header="Start Time" style="width: 12.5%"></Column>
          <Column field="end_time" header="End Time" style="width: 12.5%"></Column>
          <Column field="room_number" header="Room Number" style="width: 12.5%"></Column>
          <Column field="semester" header="Semester" style="width: 12.5%"></Column>
          <Column field="course_code" header="Course Code" style="width: 12.5%"></Column>
          <Column field="professor" header="Professor" style="width: 12.5%"></Column>
          <Column field="subject" header="Subject" style="width: 12.5%"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import axios from 'axios'; // Import Axios for making HTTP requests

export default {
  components: {
    NavigationBar
  },
  data() {
    return {
      adminName: 'John Doe',
      file: null,
      schedules: null
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    submitForm() {
      // Implement your logic to handle file upload
      console.log('File:', this.file);
    },
    async fetchSchedules() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-schedules/');
        this.schedules = response.data;
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    }
  },
  mounted() {
    this.fetchSchedules(); // Fetch schedules when the component is mounted
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
