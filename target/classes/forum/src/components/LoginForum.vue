<template>
  <!-- Background Green Stripe -->
  <div>
    <div class="background-stripe"></div>
    <div class="login-container">
      <!-- Login Form -->
      <div class="login-form">
        <div id=login>
          <h2>Login</h2>
          <br>
          <form>
            <div class="oauth-icons">
              <a id="github" href="#" @click="loginWithOAuth2('github')">GitHub</a>
            </div>
            <br>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      email: '',
      password: '',
      htmlContent: '',
    };
  },

  methods: {
    loginWithOAuth2() {
      const clientId = '99b1cf377d949cb46802'
      const redirectUri = 'http://localhost:8081/homepage'
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`
    },
  },
};
</script>

<style scoped>
@import './LoginForum.css';

</style>