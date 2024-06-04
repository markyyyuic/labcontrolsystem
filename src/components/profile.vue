<template>
    <div class="flex h-screen">
      <!-- Navigation Bar -->
      <NavigationBar :username="adminName" />
  
      <!-- Main Content -->
      <div class="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <!-- Profile Content -->
        <div class="container mx-auto px-4 py-8">
          <h2 class="text-2xl font-semibold mb-4">Profile</h2>
          <div class="bg-white shadow-md rounded-lg p-6">
            <!-- Profile details -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 class="text-lg font-semibold mb-2">Role</h3>
                <p>{{ adminRole }}</p>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">Identification Number</h3>
                <input type="text" v-model="uicId" class="border border-gray-300 px-3 py-2 rounded-md w-full">
              </div>
            </div>
            <!-- Update Profile Form -->
            <form @submit.prevent="updateProfile">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="text-lg font-semibold mb-2">First Name</label>
                  <input type="text" id="firstName" v-model="firstName" class="border border-gray-300 px-3 py-2 rounded-md w-full">
                </div>
                <div>
                  <label for="lastName" class="text-lg font-semibold mb-2">Last Name</label>
                  <input type="text" id="lastName" v-model="lastName" class="border border-gray-300 px-3 py-2 rounded-md w-full">
                </div>
                <div>
                  <label for="birthdate" class="text-lg font-semibold mb-2">Birthdate</label>
                  <input type="date" id="birthdate" v-model="birthdate" class="border border-gray-300 px-3 py-2 rounded-md w-full">
                </div>
                <div>
                  <label for="gender" class="text-lg font-semibold mb-2">Gender</label>
                  <select id="gender" v-model="gender" class="border border-gray-300 px-3 py-2 rounded-md w-full">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavigationBar from './NavigationBar.vue';
  
  export default {
    components: {
      NavigationBar
    },
    data() {
      return {
        adminName: 'John Doe',
        adminRole: 'Administrator',
        uicId: '', // Set a default identification number
        firstName: '', // Initialize empty strings for input fields
        lastName: '',
        birthdate: '',
        gender: 'male' // Initialize with default value
      };
    },
    methods: {
      async updateProfile() {
        try {
          // Send updated profile data to the server
          const updatedProfile = {
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthdate,
            gender: this.gender,
            uicId: this.uicId // Include identification number in the updated profile data
          };
          // Make an API request to update the profile information
          const response = await axios.put('http://127.0.0.1:8000/user-profile/', updatedProfile);
          console.log('Updated profile:', response.data);
          // Optionally, you can update the local data with the response from the server
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      },
      async fetchUserProfile() {
        try {
          // Fetch user profile data from the server
          const response = await axios.get('http://127.0.0.1:8000/user-profile/');
          const userProfile = response.data;
          // Bind the retrieved data to the input fields
          this.firstName = userProfile.first_name || '';
          this.lastName = userProfile.last_name || '';
          this.birthdate = userProfile.birthdate || '';
          this.gender = userProfile.gender || 'male';
          this.uicId = userProfile.uic_id || '';
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    },
    mounted() {
      // Fetch user profile data when the component is mounted
      this.fetchUserProfile();
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  