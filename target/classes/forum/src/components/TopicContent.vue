<template>
  <div>
    <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
      <button class="buttonTopic" @click="goToHomepage">Homepage</button>
      <p style="color: black; font-size: medium; font-weight: bold; margin-left: -4%;">{{ userEmail }}</p>
      <button class="buttonTopic" style="align-content: start" @click="logout">Logout</button>
    </div>
    <div class="login-container" style="margin-top: 20px">
      <div class="login-form">
        <h1>Topic</h1>
        <div>
          <label for="title">Title:</label>
          <textarea id="title" v-model="title" rows="1" maxlength="50" readonly></textarea>
        </div>
        <div>
          <label for="email">User:</label>
          <textarea id="email" v-model="email" rows="1" maxlength="50" readonly></textarea>
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" rows="8" maxlength="200" readonly></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',   // Bound to the title textarea
      content: '', // Bound to the content textarea
      userEmail: ''
    };
  },
  async created() {
    if (!this.isAuthenticated()) {
      // If not authenticated, handle it accordingly (e.g., redirect to login page)
      console.error('User not authenticated');
      // Redirect to login page or take appropriate action
      await this.$router.push('/login'); // Adjust the route accordingly
    }
    await this.fetchContentFromApi();
    this.userEmail = "User: " + localStorage.getItem('email') || 'Email not available';
  },
  methods: {
    async getToken(code) {
      const clientId = '99b1cf377d949cb46802';
      const clientSecret = 'f62921a4d075811259680fbb53b84ce8f9e4e8b6';
      const redirectUri = 'http://localhost:8081/newtopic';

      // Use your HTTP client (e.g., axios) to make the token request
      const response = await this.$axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      });
      // Extract and return the access token
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
    goToHomepage() {
      this.$router.push('/homepage');
    },
    async fetchContentFromApi() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      console.log(headers)
      const response = await this.$axios.post('http://localhost:8080/secured/getTopicByTitle', {
        email: localStorage.getItem('topicEmail'),
        title: localStorage.getItem('topicTitle'),
        content: ""
      }, {headers});
      this.title = response.data.title;
      this.content = response.data.content;
      this.email = response.data.email;
    }
  }
};
</script>

<style scoped>
@import './TopicContent.css';

</style>