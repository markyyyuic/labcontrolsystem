<template>
  <div class="flex h-screen">
    <!-- Navigation Bar -->
    <NavigationBar :username="username" />

    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <!-- Greeting Message -->
      <div class="mb-6">
        <!-- Icon and Greeting Message -->
        <div class="flex items-center">
          <ion-icon :name="currentPeriod === 'evening' ? 'moon-outline' : 'sunny-outline'"
            :class="[currentPeriod === 'evening' ? 'text-sky-400' : currentPeriod === 'afternoon' ? 'text-orange-400' : 'text-amber-400']"
            class="h-8 w-8 mr-3" />
          <h2 class="text-2xl font-semibold" :class="timeOfDayClass">{{ greetingMessage }}</h2>
        </div>
      </div>

      <!-- Recent Activity Feed Section -->
      <div class="container mx-auto">
        <div class="bg-white rounded-lg shadow-md mb-6 p-6">
          <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
          <!-- Display recent activity items -->
          <div>
            <!-- Example activity item -->
            <div class="flex items-center mb-4">
              <!-- Icon indicating the type of activity -->
              <div class="flex-shrink-0 mr-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <!-- Details of the activity -->
              <div>
                <p class="text-sm text-gray-600">Admin John Doe created a new product.</p>
                <p class="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <!-- Repeat similar structure for other activity items -->
          </div>
        </div>
      </div>

      <!-- Summary Statistics Section -->


      <!-- Announcements or News Section -->
      <!-- Your existing code for announcements or news goes here -->
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';


export default {
  components: {
    NavigationBar,
  },
  props: {
    username: String,
  },
  data() {
    return {
      currentTime: new Date(),
    };
  },
  computed: {
    timeOfDayClass() {
      const hour = this.currentTime.getHours();
      return hour < 12 ? 'text-green-600' : hour < 18 ? 'text-blue-600' : 'text-orange-600';
    },
    greetingMessage() {
      const hour = this.currentTime.getHours();
      if (hour < 12) {
        return `Good morning, ${this.username}!`;
      } else if (hour < 18) {
        return `Good afternoon, ${this.username}!`;
      } else {
        return `Good evening, ${this.username}!`;
      }
    },
    currentPeriod() {
      const hour = this.currentTime.getHours();
      return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Update time every second
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
