<template>
  <div>
    <div class="header" style=" display: flex;
    justify-content: space-between;
    align-items: center;">
      <button class="buttonTopic" @click="goToHomepage">Homepage</button>
      <p style="color: black; font-size: medium; font-weight: bold; margin-left: -4%;">{{ userEmail }}</p>
      <button class="buttonTopic" style="align-content: start" @click="logout">Logout</button>
    </div>
    <div class="login-container" style="margin-top: 20px">
      <div class="login-form">
        <h1>New Topic Page</h1>
        <!-- Input boxes for Title and Content -->
        <div>
          <label for="title">Title:</label>
          <textarea id="title" v-model="title" rows="1" maxlength="50"></textarea>
          <p>{{ title.length }} / 50 characters</p>
        </div>
        <!-- Textarea for Content with character limit -->
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" rows="8" maxlength="200"></textarea>
          <p>{{ content.length }} / 200 characters</p>
        </div>
        <!-- Submit Button -->
        <button @click="submitForm">Submit</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      userEmail: ''
    };
  },
  async created() {
    if (!this.isAuthenticated()) {
      // If not authenticated, handle it
      console.error('User not authenticated');
      await this.$router.push('/login');
    }
    this.userEmail = "User: " + localStorage.getItem('email') || 'Email not available';
  },
  methods: {
    async getToken(code) {
      const clientId = 'placeholder_oauth2';
      const clientSecret = 'placeholder_oauth2';
      const redirectUri = 'http://localhost:8081/newtopic';

      const response = await this.$axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      });
      return new URLSearchParams(response.data).get('access_token');
    },
    isAuthenticated() {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      return accessToken !== null && accessToken !== 'undefined';
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    async submitForm() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      const response = await this.$axios.post('http://localhost:8080/secured/insertTopic', {
        email: localStorage.getItem('email'),
        title: this.title,
        content: this.content
      }, {headers});
      console.error(response);
      if (response.status == '200' || response.status == '201' || response.status == '202') {
        alert("Topic inserito con successo!");
      }
      window.location.href = 'http://localhost:8081/homepage';
    },
    goToHomepage() {
      this.$router.push('/homepage');
    }
    ,
  }
}
;
</script>

<style>
@import './NewTopic.css';

</style>