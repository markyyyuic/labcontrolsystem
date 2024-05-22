<template>
    <div class="signup-container">
      <div class="form-wrappers">
        <img src="../assets/logo.png" alt="">
        <h1>Let's Start</h1>
        <p>Create an account.</p>
  
        <form>
          <div class="form-group">
            <input type="text" class="form-input" id="first-name" placeholder=" ">
            <label for="first-name" class="form-label">First Name</label>
          </div>
          <div class="form-group">
            <input type="text" class="form-input" id="last-name" placeholder=" ">
            <label for="last-name" class="form-label">Last Name</label>
          </div>
          <div class="form-group">
            <input type="email" class="form-input" id="email" placeholder=" ">
            <label for="email" class="form-label">Email</label>
          </div>
          <div class="form-group">
            <input type="password" class="form-input" id="password" placeholder=" ">
            <label for="password" class="form-label">Password</label>
          </div>
          <div class="form-group">
            <input type="password" class="form-input" id="confirm-password" placeholder=" ">
            <label for="confirm-password" class="form-label">Confirm Password</label>
          </div>
          <button type="submit" class="btn-signup">Sign Up</button>
        </form>
  
        <p class="login-text">Already have an account? <a href="#">Login</a>.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupForm'
  }
  </script>
  
  <style scoped>
  .signup-container {
    position: fixed;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: #BC185B;
  }
  
  .form-wrappers {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    background: #FFFFFF;
    height: 100%;
    width: 45%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .form-wrappers h1 {
    font-size: 2.5rem;
    color: #BC185B;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .form-wrappers p {
    text-align: center;
    font-size: 1.2rem;
    color: #0b0b0b;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  
  .form-wrappers img {
    width: 25%;
    margin: 0 auto;
    margin-top: 20px;
    display: block;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    outline: none;
    transition: border-color 0.2s;
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
  .form-input:not(:placeholder-shown) + .form-label {
    top: 0;
    left: 0.75rem;
    font-size: 0.875rem;
    color: #000000;
  }
  
  .btn-signup {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #BC185B;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-signup:hover {
    background-color: #960d42;
  }
  
  .login-text {
    text-align: center;
    font-size: 1rem;
    color: #0b0b0b;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
  }
  
  .login-text a {
    color: #BC185B;
    text-decoration: none;
  }
  
  .login-text a:hover {
    text-decoration: underline;
  }
  </style>
  