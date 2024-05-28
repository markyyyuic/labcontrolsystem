<template>
    <div class="bg-pink-700 flex items-center justify-center min-h-screen">
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-form" style="height: auto;">
        <div class="text-center mb-6">
          <h1 class="text-4xl font-cursive text-pink-700 font-bold mb-2">Laboratory Booking System</h1>
          <h2 class="text-xl text-gray-700 mb-4">Booking Details</h2>
        </div>
        
        <!-- Display booking details here -->
        <div v-if="bookingData" class="mb-4">
          <p><strong>First Name:</strong> {{ bookingData.firstName }}</p>
          <p><strong>Last Name:</strong> {{ bookingData.lastName }}</p>
          <p><strong>ID:</strong> {{ bookingData.id }}</p>
          <p><strong>Email:</strong> {{ bookingData.email }}</p>
          <p><strong>Room:</strong> {{ bookingData.room }}</p>
          <p><strong>Time In:</strong> {{ bookingData.timeIn }}</p>
          <p><strong>Time Out:</strong> {{ bookingData.timeOut }}</p>
          <p><strong>Purpose:</strong> {{ bookingData.purpose }}</p>
        </div>
        
        <!-- Add checkout form elements here -->
        <form>
          <div class="flex justify-end">
            <!-- Add submit button for checkout -->
            <button type="submit" class="btn-next">
              Confirm Booking
              <i class="fas fa-check-circle ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutForm',
    created() {
      // Parse the bookingData from the query string
      const bookingDataString = this.$route.query.bookingData;
      if (bookingDataString) {
        this.bookingData = JSON.parse(bookingDataString);
        console.log('Received Booking Data:', this.bookingData); // Log received booking data
      }
    },
    data() {
      return {
        bookingData: {} // Initialize bookingData
      };
    }
  }
  </script>
  
  
  <style scoped>
    /* Scoped styles */
    html,
    body,
    #app {
      font-family: 'Inter', sans-serif;
    }
  
    /* Rest of your CSS styles */
    .shadow-form {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .btn-next {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.60rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background-color: rgb(190 24 93);
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .btn-next:hover {
      background-color: #e60082; /* Darker shade for hover effect */
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .max-w-2xl {
        padding: 1rem;
      }
  
      .btn-next {
        padding: 0.5rem 1rem;
      }
    }
  
    @media (max-width: 480px) {
      .text-4xl {
        font-size: 2.5rem;
      }
  
      .text-xl {
        font-size: 1.25rem;
      }
  
      .btn-next {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
  