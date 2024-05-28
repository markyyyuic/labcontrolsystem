<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 class="text-center text-3xl font-bold text-pink-700 mb-6">Reset Password</h1>
        <form @submit.prevent="resetPassword">
          <div class="mb-4">
            <label for="newPassword" class="block mb-2 font-semibold text-gray-800">New Password</label>
            <input v-model="formData.newPassword" type="password" id="newPassword" class="form-input w-full h-12">
          </div>
          <div class="mb-4">
            <label for="confirmNewPassword" class="block mb-2 font-semibold text-gray-800">Confirm New Password</label>
            <input v-model="formData.confirmNewPassword" type="password" id="confirmNewPassword" class="form-input w-full h-12">
          </div>
          <button type="submit" class="w-full px-4 py-2 bg-pink-700 text-white font-semibold rounded hover:bg-pink-800">Reset Password</button>
        </form>
      </div>
      <Toast ref="toast"></Toast>
    </div>
</template>

<script>
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    name: 'PasswordReset',
    components: {
      Toast
    },
    data() {
        return {
            formData: {
                newPassword: '',
                confirmNewPassword: ''
            },
            resetToken: '', // Token should be set from URL or other means
            email: '' // Email should be set from URL or other means
        };
    },
    created() {
        // Retrieve token and email from query parameters if needed
        const urlParams = new URLSearchParams(window.location.search);
        this.resetToken = urlParams.get('token');
        this.email = urlParams.get('email');
    },
    methods: {
        async resetPassword() {
            const { newPassword, confirmNewPassword } = this.formData;

            if (newPassword !== confirmNewPassword) {
                this.showError('Passwords do not match');
                return;
            }

            try {
                const response = await axios.post('http://127.0.0.1:8000/reset-password', {
                    new_password: newPassword,
                    confirm_new_password: confirmNewPassword,
                    token: this.resetToken,
                    email: this.email
                });
                this.showSuccess('Password reset successful');
            } catch (error) {
                this.showError('Failed to reset password');
                console.error('Error resetting password:', error.response.data);
            }
        },
        showSuccess(message) {
            this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: message });
        },
        showError(message) {
            this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: message });
        }
    }
};
</script>


<style scoped>
.success {
    color: green;
}
.error {
    color: red;
}
</style>
