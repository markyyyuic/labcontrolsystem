<template>
  <PrimeVueToast ref="toast" />
  <div class="signup-container">
    <div class="form-wrappers">
      <img src="../assets/logo.png" alt="">
      <h1>Let's Start</h1>
      <p>Create an account.</p>

      <form @submit.prevent="registerAdmin">
        <div class="form-group">
          <input v-model="formData.first_name" type="text" class="form-input" id="first-name" placeholder=" ">
          <label for="first-name" class="form-label">
            <i class="pi pi-user"></i> First Name
          </label>
        </div>
        <div class="form-group">
          <input v-model="formData.last_name" type="text" class="form-input" id="last-name" placeholder=" ">
          <label for="last-name" class="form-label">
            <i class="pi pi-user"></i> Last Name
          </label>
        </div>
        <div class="form-group">
          <input v-model="formData.email" type="email" class="form-input" id="email" placeholder=" ">
          <label for="email" class="form-label">
            <i class="pi pi-envelope"></i> Email
          </label>
        </div>
        <div class="form-group">
          <input v-model="formData.password" type="password" class="form-input" id="password" placeholder=" ">
          <label for="password" class="form-label">
            <i class="pi pi-lock"></i> Password
          </label>
        </div>
        <div class="form-group">
          <input v-model="formData.confirm_password" type="password" class="form-input" id="confirm-password" placeholder=" ">
          <label for="confirm-password" class="form-label">
            <i class="pi pi-lock"></i> Confirm Password
          </label>
        </div>
        <button type="submit" class="btn-signup">Sign Up</button>
      </form>

      <p class="login-text">Already have an account? <RouterLink :to="{ path: '/login' }" class="text-pink-700 no-underline hover:underline">Login</RouterLink>.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios for making HTTP requests
import PrimeVueToast from 'primevue/toast';

export default {
  components: {
    PrimeVueToast
  },
  name: 'SignupForm',
  
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
    };
  },
  methods: {
    async registerAdmin() {
      const { password, image_profile } = this.formData;

      // Check password constraints
      if (!/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password) || password.length < 8) {
        this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long' });
        return;
      }

      // Set image_profile to null if not provided
      if (!image_profile) {
        this.formData.image_profile = null;
      }

      try {
        // Send form data to backend for registration
        const response = await axios.post('http://127.0.0.1:8000/register', this.formData);
        this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: 'Admin registered successfully' });
        console.log(response.data); // Log the response from the backend

        // Reset form data after successful registration
        this.formData = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: '',
        };

        // Redirect or display success message to the user
      } catch (error) {
        if (error.response.status === 400 && error.response.data.detail === "Email already in use") {
          this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Email is already in use' });
        } else {
          this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: 'Error registering admin: ' + error.response.data });
        }
        console.error('Error registering admin:', error.response.data);
        // Handle error response from backend, e.g., display error message to the user
      }
    },
  }
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

.form-wrappers {
  width: 90%;
  max-width: 600px;
  background: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: 'Inter', sans-serif; /* Set font-family to Inter */
  font-weight: 400;
}

.form-wrappers img {
  width: 100%;
  max-width: 100px;
  margin: 0 auto;
  display: block;
}

.form-wrappers h1 {
  font-size: 2.5rem;
  color: #BC185B;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Inter',sans-serif;
}

.form-wrappers p {
  text-align: center;
  font-size: 1rem;
  color: #0b0b0b;
  font-weight: bolder;
  margin-bottom: 1.5rem;
  font-family: 'Inter',sans-serif;

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
  font-family: 'Inter',sans-serif;
  font-weight: 400;
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
