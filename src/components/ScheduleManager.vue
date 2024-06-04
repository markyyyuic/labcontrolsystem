<template>
    <div class="flex h-screen">
      <!-- Navigation Bar -->
      <NavigationBar :username="adminName" />
  
      <!-- Main Content -->
      <div class="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <!-- Manage Schedules Content -->
        <div class="container mx-auto px-4 py-8">
          <h2 class="text-2xl font-semibold mb-4">Manage Schedules</h2>
          <div class="bg-white shadow-md rounded-lg p-6">
            <!-- Data Table Container with Max Height -->
            <div class="max-h-table overflow-y-auto">
              <!-- Data Table -->
              <div class="card">
                <DataTable :value="schedules" stripedRows tableStyle="min-width: 1rem">
                  <Column field="day_of_week" header="Day of Week" style="width: 12.5%"></Column>
                  <Column field="start_time" header="Start Time" style="width: 12.5%"></Column>
                  <Column field="end_time" header="End Time" style="width: 12.5%"></Column>
                  <Column field="room_number" header="Room Number" style="width: 12.5%"></Column>
                  <Column field="semester" header="Semester" style="width: 12.5%"></Column>
                  <Column field="course_code" header="Course Code" style="width: 12.5%"></Column>
                  <Column field="professor" header="Professor" style="width: 12.5%"></Column>
                  <Column field="subject" header="Subject" style="width: 12.5%"></Column>
                  <Column header="Actions" style="width: 12.5%">
                    <template #body="rowData">
                      <button @click="editSchedule(rowData)" class="text-blue-600 mr-2">Edit</button>
                      <button @click="deleteSchedule(rowData.id)" class="text-red-600">Delete</button>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
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
        schedules: null
      };
    },
    methods: {
      async fetchSchedules() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/get-schedules/');
          this.schedules = response.data;
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      },
      editSchedule(schedule) {
        // Implement edit schedule functionality
        console.log('Editing schedule:', schedule);
      },
      async deleteSchedule(scheduleId) {
        try {
          await axios.delete(`http://127.0.0.1:8000/delete-schedule/${scheduleId}`);
          // Remove the deleted schedule from the local data
          this.schedules = this.schedules.filter(schedule => schedule.id !== scheduleId);
          console.log('Schedule deleted successfully');
        } catch (error) {
          console.error('Error deleting schedule:', error);
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
  .max-h-table {
    max-height: 400px; /* Adjust the value as needed */
  }
  </style>
  