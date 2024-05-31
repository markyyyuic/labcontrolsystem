<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 class="text-2xl font-semibold mb-4">Admin Profile</h2>
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Image Upload Section -->
        <div class="flex flex-col md:w-1/3">
          <label for="profileImage" class="block mb-2 font-semibold">Profile Image</label>
          <input type="file" class="border rounded-lg px-4 py-2 mb-4" id="profileImage" @change="handleImageChange">
          <div class="w-48 h-48 bg-gray-300 rounded-full overflow-hidden">
            <img v-if="image_profile" :src="image_profile" class="w-full h-full object-cover" alt="Profile Image">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-500 text-lg">No Image</div>
          </div>
        </div>
        <!-- Basic Information -->
        <div class="flex flex-col md:w-2/3">
          <div class="bg-gray-100 rounded-lg px-6 py-4 mb-4">
            <h4 class="text-lg font-semibold mb-2">Basic Information:</h4>
            <div class="mb-4">
              <label for="name" class="block mb-1">Name:</label>
              <input type="text" class="border rounded-lg px-4 py-2 w-full" id="name" v-model="name">
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-1">Email:</label>
              <input type="email" class="border rounded-lg px-4 py-2 w-full bg-gray-100 cursor-not-allowed" id="email" v-model="email" readonly>
            </div>
          </div>
          <!-- Change Password Section -->
          <div class="bg-gray-100 rounded-lg px-6 py-4 mb-4">
            <h4 class="text-lg font-semibold mb-2">Change Password:</h4>
            <div class="mb-4">
              <label for="newPassword" class="block mb-1">New Password:</label>
              <input type="password" class="border rounded-lg px-4 py-2 w-full" id="newPassword" v-model="newPassword">
            </div>
            <div class="mb-4">
              <label for="confirmPassword" class="block mb-1">Confirm New Password:</label>
              <input type="password" class="border rounded-lg px-4 py-2 w-full" id="confirmPassword" v-model="confirmPassword">
            </div>
            <button class="bg-pink-700 hover:bg-pink-600 text-white px-6 py-2 rounded-lg" @click="changePassword">Change Password</button>
          </div>
        </div>
      </div>
      <div class="mt-4 text-right">
        <button class="bg-pink-700 hover:bg-pink-600 text-white px-6 py-2 rounded-lg flex items-center justify-center" @click="saveProfile">
          <i class="fas fa-save mr-2"></i> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminProfile',
  data() {
    return {
      image_profile: '', // Holds the image URL
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  mounted() {
    this.fetchAdminProfile();
  },
  methods: {
    fetchAdminProfile() {
      const token = localStorage.getItem('access_token');
      axios.get('http://127.0.0.1:8000/admin-profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const { name, email, image_profile } = response.data;
        this.name = name;
        this.email = email;
        this.image_profile = image_profile;
      })
      .catch(error => {
        console.error('Error fetching admin profile:', error);
      });
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      this.image_profile = URL.createObjectURL(file);
    },
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      console.log("New Password:", this.newPassword);
      console.log("Confirm Password:", this.confirmPassword);
    },
    saveProfile() {
      // Add your logic here to handle profile saving
      console.log("Profile saved");
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
