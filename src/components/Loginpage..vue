<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <div class="signup-container flex justify-end items-center h-screen w-screen bg-pink-700">
      <div class="form-wrapperss bg-white w-full max-w-lg shadow-lg p-10 h-full box-border absolute right-0 top-0 flex flex-col items-center">
        <img src="../assets/logo.png" alt="" class="w-1/4 mt-5">
        <h1 class="text-4xl text-pink-700 font-bold text-center mb-4">Welcome Back</h1>
        <p class="text-center text-xl text-gray-900 font-bold mb-10">Login to your account.</p>
        
        <form class="w-full max-w-md">
          <div class="form-group relative mb-8">
            <input type="email" id="email" class="form-input w-full py-4 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-pink-700" placeholder=" ">
            <label for="email" class="form-label absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 text-lg text-gray-600 transition-all">Email</label>
          </div>
          <div class="form-group relative mb-8">
            <input type="password" id="password" class="form-input w-full py-4 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-pink-700" placeholder=" ">
            <label for="password" class="form-label absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 text-lg text-gray-600 transition-all">Password</label>
          </div>
          <button type="submit" class="btn-signup w-full py-4 text-xl font-bold text-white bg-pink-700 rounded-lg hover:bg-pink-800 transition-colors">Login</button>
        </form>
  
        <p class="login-text text-center text-lg text-gray-900 font-bold mt-8">Don't have an account? <a href="#" class="text-pink-700 no-underline hover:underline">Sign Up</a>.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginForm'
  }
  </script>
  
  <style scoped>
  .form-group input:focus + .form-label,
  .form-group input:not(:placeholder-shown) + .form-label {
    top: -0.5rem;
    left: 1rem;
    font-size: 0.875rem;
    color: #000000;
  }
  </style>
  