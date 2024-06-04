<template>
  <nav class="bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg">
    <div class="container mx-auto px-6 py-3">
      <!-- Logo and Dashboard link -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <a class="text-white text-2xl font-semibold mr-4" href="#">Dashboard</a>
          <!-- Add logo or icon if needed -->
        </div>
        <!-- User profile dropdown -->
        <div class="relative">
          <button @mouseenter="showDropdown = true" class="flex items-center text-gray-300 focus:outline-none">
            <img class="h-8 w-8 rounded-full object-cover mr-2" src="https://via.placeholder.com/150" alt="User avatar">
            <span class="hidden md:block">{{ username }}</span>
            <!-- Add arrow down icon if needed -->
          </button>
          <!-- Profile dropdown menu -->
          <div v-show="showDropdown" @mouseenter="showDropdown = true" @mouseleave="hideDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul class="py-1">
              <li><a class="block px-4 py-2 text-gray-800 hover:bg-gray-200" @click="naviGateProfile" href="#">Profile</a></li>
              <li><a class="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Settings</a></li>
              <li><a class="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Navigation links -->
      <ul class="mt-4 flex flex-col space-y-3">
  <!-- Original navigation items with icons -->
  <li><button @click="navigateToHome" class="text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-home mr-2"></i>Home</button></li>
  <!-- Additional navigation items with button styles and icons -->
  <li><button @click="navigateToUploadForm" class="text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-cloud-upload-alt mr-2"></i>Schedule Upload Form</button></li>
  <li><button @click="navigateToManageSchedules" class="text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-tasks mr-2"></i>Manage Schedules</button></li>
  <li><button @click="navigateToUserManagement" class="text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-user-cog mr-2"></i>User Management</button></li>
  <li><button @click="navigateToSystemSettings" class="text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-cog mr-2"></i>System Settings</button></li>
</ul>
<!-- Sign-out button -->
<button class="mt-3 text-white bg-pink-700 hover:bg-pink-800 px-4 py-3 mt-48 rounded-md focus:outline-none flex items-center justify-center w-full"><i class="fas fa-sign-out-alt mr-2"></i>Sign-out</button>

    </div>
  </nav>
</template>

<script>
export default {
  props: {
    username: String, // Pass the username as a prop
  },
  data() {
    return {
      showDropdown: false, // Variable to control dropdown visibility
    };
  },
  methods: {
    hideDropdown() {
      // Delay hiding dropdown to allow moving mouse to dropdown
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    navigateToHome() {
        // Implement navigation to the home page
        this.$router.push({ name: 'maindashboard' });
      },
      navigateToUploadForm() {
        // Implement navigation to the schedule upload form
        this.$router.push({ name: 'uploadschedule' });
      },
      navigateToManageSchedules() {
        // Implement navigation to the manage schedules page
        this.$router.push({ name: 'manageschedule' });
      },
      navigateToUserManagement() {
        // Implement navigation to the user management page
        console.log("Navigating to User Management");
      },
      naviGateProfile() {
        // Implement navigation to the system settings page
        this.$router.push({ name: 'profile' });
      },
      navigateToSystemSettings() {
        // Implement navigation to the system settings page
        console.log("Navigating to System Settings");
      },
      navigateToAuditTrail() {
        // Implement navigation to the audit trail page
        console.log("Navigating to Audit Trail");
      },
    },
  };
</script>

<style scoped>
/* Add custom styles here */
</style>
