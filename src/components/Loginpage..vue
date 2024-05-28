<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <div class="signup-container flex justify-end items-center h-screen w-screen bg-pink-700">
    <div class="form-wrapperss bg-white w-full max-w-lg shadow-lg p-10 h-full box-border absolute right-0 top-0 flex flex-col items-center">
      <img src="../assets/logo.png" alt="" class="w-1/4 mt-5">
      <h1 class="text-4xl text-pink-700 font-bold text-center mb-4">Welcome Back</h1>
      <p class="text-center text-xl text-gray-900 font-bold mb-10">Login to your account.</p>
      
      <form @submit.prevent="loginAdmin" class="w-full max-w-md">
        <div class="form-group relative mb-8">
          <input v-model="email" type="email" id="email" class="form-input w-full py-4 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-black-700" placeholder=" ">
          <label for="email" class="form-label absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 text-lg text-gray-600 transition-all">
            <i class="pi pi-envelope"></i> Email
          </label>
        </div>
        <div class="form-group relative mb-8">
          <input v-model="password" type="password" id="password" class="form-input w-full py-4 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-pink-700" placeholder=" ">
          <label for="password" class="form-label absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 text-lg text-gray-600 transition-all">
            <i class="pi pi-lock"></i> Password
          </label>
        </div>
        <button type="submit" class="btn-signup w-full py-4 text-xl font-bold text-white bg-pink-700 rounded-lg hover:bg-pink-800 transition-colors">Login</button>
      </form>

      <div class="w-full max-w-md flex justify-between mt-4">
        <p class="text-gray-900 font-bold">
          Don't have an account? <a href="#" class="text-pink-700 no-underline hover:underline">Sign Up</a>.
        </p>
        <p class="text-gray-900 font-bold">
          <RouterLink to="/retrieve">
          <a href="#" class="text-pink-700 no-underline hover:underline">Forgot Password?</a>
        </RouterLink>
        </p>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
  name: 'LoginForm',
  
  components: {
    Toast
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginAdmin() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
          email: this.email,
          password: this.password,
        });
        this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
        // Redirect to the desired page after successful login
        this.$router.push('/bookingpage');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Admin not found', life: 3000 });
        } else if (error.response && error.response.status === 401) {
          this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password', life: 3000 });
        } else {
          this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred during login', life: 3000 });
        }
      }
    },
  },
};
</script>

<style scoped>
html,
body,
#app {
  font-family: 'Inter', sans-serif;
}

.signup-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #BC185B;
}

.form-wrapperss {
  width: 90%;
  max-width: 600px;
  background: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.form-wrapperss img {
  width: 100%;
  max-width: 100px;
  margin: 0 auto;
  display: block;
}

.form-wrapperss h1 {
  font-size: 2.5rem;
  color: #BC185B;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.form-wrapperss p {
  text-align: center;
  font-size: 1rem;
  color: #0b0b0b;
  font-weight: bolder;
  margin-bottom: 1.5rem;
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
  top: 0.5rem;
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
