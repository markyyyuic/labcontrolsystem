<template>
    <div class="bg-pink-700 flex items-center justify-center" style="height: 100vh;">
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-form">
        <div class="text-center mb-6">
          <img src="../assets/logo.png" alt="Company Logo" class="mx-auto mb-4">
          <h1 class="text-4xl font-cursive mb-2">Laboratory Booking System</h1>
          <h2 class="text-xl text-gray-700 mb-4">Online Booking</h2>
          <p class="text-gray-600">Please fill out the information below to complete your online reservation.</p>
        </div>
        
        <form>
          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <div class="relative">
                <input type="text" class="form-input peer" id="first-name" placeholder=" " required>
                <label for="first-name" class="form-label">First Name*</label>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <div class="relative">
                <input type="text" class="form-input peer" id="last-name" placeholder=" " required>
                <label for="last-name" class="form-label">Last Name*</label>
              </div>
            </div>
          </div>
          <div class="relative mb-4">
            <input type="number" class="form-input peer" id="uic-id" placeholder=" " required>
            <label for="uic-id" class="form-label">ID*</label>
          </div>
          <div class="relative mb-4">
            <input type="email" class="form-input peer" id="email" placeholder=" " required>
            <label for="email" class="form-label">Email Address</label>
          </div>
          <div class="relative mb-4">
            <select class="form-input peer" id="lab-number" required>
              <option value="" disabled selected></option>
              <option value="203">ROOM 203</option>
              <option value="204">ROOM 204</option>
              <option value="205">ROOM 205</option>
            </select>
            <label for="lab-number" class="form-label">Laboratory Number</label>
          </div>
          <div class="relative mb-4">
            <input type="time" class="form-input peer" id="time-in" placeholder=" " required>
            <label for="time-in" class="form-label">Time In</label>
          </div>
          <div class="relative mb-4">
            <input type="time" class="form-input peer" id="time-out" placeholder=" " required>
            <label for="time-out" class="form-label">Time Out</label>
          </div>
          <div class="relative mb-4">
            <input type="text" class="form-input peer" id="purpose" placeholder=" " required>
            <label for="purpose" class="form-label">Purpose</label>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingForm'
  }
  </script>
  
  <style scoped>
 
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
  
  
  .form-input:focus + .form-label,
  .form-input:not(:placeholder-shown) + .form-label,
  select.form-input:valid + .form-label {
    top: 0;
    left: 0.75rem;
    font-size: 0.875rem;
    color: #000000;
  }
  
  
  .shadow-form {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 32%;
  }


  </style>
  