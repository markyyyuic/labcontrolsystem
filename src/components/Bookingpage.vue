<template>
  <div class="bg-pink-700 flex items-center justify-center min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-form" style="height: auto;">
      <div class="text-center mb-6">
        <img src="../assets/logo.png" alt="Company Logo" class="mx-auto mb-4">
        <h1 class="text-4xl font-cursive text-pink-700 font-bold mb-2">Laboratory Booking System</h1>
        <h2 class="text-xl text-gray-700 mb-4">Online Booking</h2>
        <p class="text-gray-600">Please fill out the information below to complete your online reservation.</p>
      </div>
      
      <form @submit.prevent="submitForm">
        <div class="flex flex-wrap -mx-2 mb-4">
          <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <div class="relative">
              <input type="text" class="form-input peer" id="first-name" v-model="bookingFormData.firstName" placeholder=" " required>
              <label for="first-name" class="form-label">First Name*</label>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2">
            <div class="relative">
              <input type="text" class="form-input peer" id="last-name" v-model="bookingFormData.lastName" placeholder=" " required>
              <label for="last-name" class="form-label">Last Name*</label>
            </div>
          </div>
        </div>
        <div class="relative mb-4">
          <input type="number" class="form-input peer" id="uic-id" v-model="bookingFormData.id" placeholder=" " required>
          <label for="uic-id" class="form-label">ID*</label>
        </div>
        <div class="relative mb-4">
          <input type="email" class="form-input peer" id="email" v-model="bookingFormData.email" placeholder=" " required>
          <label for="email" class="form-label">Email Address</label>
        </div>
        <div class="relative mb-4">
          <select class="form-input peer" id="lab-number" v-model="bookingFormData.room" required>
            <option value="" disabled selected></option>
            <option value="203">ROOM 203</option>
            <option value="204">ROOM 204</option>
            <option value="205">ROOM 205</option>
          </select>
          <label for="lab-number" class="form-label">Available Rooms</label>
        </div>
        <div class="flex flex-wrap -mx-2 mb-4">
          <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <div class="relative">
              <input type="time" class="form-input peer" id="time-in" v-model="bookingFormData.timeIn" placeholder=" " required>
              <label for="time-in" class="form-label">Time In</label>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2">
            <div class="relative">
              <input type="time" class="form-input peer" id="time-out" v-model="bookingFormData.timeOut" placeholder=" " required>
              <label for="time-out" class="form-label">Time Out</label>
            </div>
          </div>
        </div>
        <div class="relative mb-4">
          <input type="text" class="form-input peer" id="purpose" v-model="bookingFormData.purpose" placeholder=" " required>
          <label for="purpose" class="form-label">Purpose</label>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="btn-next">
            Next
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bookingpage',
  data() {
    return {
      bookingFormData: {
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        room: '',
        timeIn: '',
        timeOut: '',
        purpose: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Booking Data:', this.bookingFormData); // Log booking data
      this.$router.push({ name: 'checkout', query: { bookingData: JSON.stringify(this.bookingFormData) } });
    }
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
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.2s;
  height: 100%;
}

.form-label {
  position: absolute;
  top: 0;
  left: 0.75rem;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 0 0.25rem;
  color: #666;
  transition: all 0.2s;
}

/* Label positioning when input is focused or has content */
.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label,
select.form-input:valid + .form-label {
  top: 0;
  left: 0.75rem;
  font-size: 0.875rem;
  color: #000000;
}

/* Drop shadow for form wrapper */
.shadow-form {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

img {
  width: 32%;
}

/* Styles for the Next button */
.btn-next {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.60rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: rgb(190 24 93 );
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

  .form-input {
    padding: 0.5rem;
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
