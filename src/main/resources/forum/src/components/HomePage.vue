<template>
  <div>
    <div class="header" style=" display: flex;
    justify-content: space-between;
    align-items: center;">
      <button class="buttonTopic" @click="goToNewTopic">New Topic</button>
      <p style="color: black; font-size: medium; font-weight: bold; margin-left: -4%;">{{ userEmail }}</p>
      <button class="buttonTopic" style="align-content: start" @click="logout">Logout</button>
    </div>

    <table class="topic-table">
      <thead>
      <tr>
        <th>Title</th>
        <th>User</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="topic in paginatedTopics" :key="topic.id" @click="handleTopicClick(topic.title, topic.email)">
        <td>{{ topic.title }}</td>
        <td>{{ topic.email }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div style="margin-top: 5%">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <button class="buttonMyTopic" @click="loadMyTopics">My Topics</button>

  </div>

</template>

<script>
export default {
  data() {
    return {
      topics: [],
      currentPage: 1,
      itemsPerPage: 10,
      userEmail: ''
    };
  },
  computed: {
    // Calculate the total number of pages based on the itemsPerPage
    totalPages() {
      return Math.ceil(this.topics.length / this.itemsPerPage);
    },
    // Calculate the paginated topics for the current page
    paginatedTopics() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.topics.slice(startIndex, endIndex);
    },
  },
  async created() {
    // Extract the code parameter from the URL
    const code = this.$route.query.code;

    // Check if the code parameter is present
    if (code) {
      // Obtain the access token
      const accessToken = await this.getToken(code);
      // Store the accessToken securely (e.g., Vuex, local storage)

      localStorage.setItem('accessToken', accessToken);
      // Proceed with your logic here, e.g., redirect to another page
    } else {
      // Handle the case where the code parameter is not present
      console.error('Missing code parameter in the URL');
    }
    if (!this.isAuthenticated()) {
      console.error('User not authenticated');
      await this.$router.push('/login');
    }
    this.userEmail = "User: " + localStorage.getItem('email') || 'Email not available';
    // Fetch topics when the component is created
    await this.fetchTopics();
  },
  methods: {
    handleTopicClick(title, email) {
      // Store the topic title and email in local storage
      localStorage.setItem('topicEmail', email );
      localStorage.setItem('topicTitle', title);
      // Navigate to the topic content page
      this.$router.push('/topiccontent');
    },
    async loadMyTopics() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      try {
        const email = localStorage.getItem('email');
        const response = await this.$axios.post('http://localhost:8080/secured/getTopic',email,{headers}) ;
        this.topics = response.data;
        this.currentPage = 1;
      } catch (error) {
        console.error('Errore nel recupero dei tuoi argomenti:', error);
      }
    },
    async fetchTopics() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      try {
        const response = await this.$axios.get('http://localhost:8080/secured/getAllTopic', {headers});
        this.topics = response.data;
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    // Go to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Go to the next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async getToken(code) {
      const clientId = 'placeholder_oauth2';
      const clientSecret = 'placeholder_oauth2';
      const redirectUri = 'http://localhost:8081/homepage';

      // Use your HTTP client (e.g., axios) to make the token request
      const response = await this.$axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        "scope": "user:email"
      });

      const emailResponse = await this.$axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${new URLSearchParams(response.data).get('access_token')}`,
        },
      });
      const userEmails = emailResponse.data;
      const primaryEmail = userEmails.find(email => email.primary);
      if (primaryEmail) {
        const userEmail = primaryEmail.email;
        console.log('User Primary Email:', userEmail);
        localStorage.setItem('email', userEmail);
      } else {
        console.error('No primary email found');
      }
      // Extract and return the access token
      return new URLSearchParams(response.data).get('access_token');
    },
    isAuthenticated() {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken !== null && accessToken !== 'undefined';
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    goToNewTopic() {
      this.$router.push('/newtopic');
    },
  },
};
</script>

<style>
/* Add styles as needed */
@import './HomePage.css';
</style>