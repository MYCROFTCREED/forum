<template>
  <div>
    <form @submit.prevent="signUp" class="signup-form">
      <h2>Sign Up</h2>
      <label>Email: </label>
      <input v-model="user.email" />
      <br/>

      <label>Name: </label>
      <input v-model="user.name"/>
      <br/>

      <label>Surname: </label>
      <input v-model="user.surname" />
      <br/>

      <label>Address: </label>
      <input v-model="user.address" />
      <br/>

      <label for="password">Password: </label>
      <input v-model="user.password" type="password" id="password"  />
      <br />

      <label for="confirmPassword">Confirm Password: </label>
      <input v-model="user.confirmPassword" type="password" id="confirmPassword"  />
      <br />

      <div data-role="main" class="ui-content">
        <fieldset data-role="controlgroup">
          <legend>Choose your gender:</legend>
          <label for="male">Male</label>
          <input type="radio" name="gender" id="male" value="m" v-model="user.gender">
          <label for="female">Female</label>
          <input type="radio" name="gender" id="female" value="f" v-model="user.gender">
        </fieldset>
      </div>


      <button type="submit" class="signup-button">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  data() {
    return {
      user: {
        email: '',
        name: '',
        surname: '',
        address: '',
        password: '',
        gender: '',
        confirmPassword: ''
      }
    };
  },

  methods: {
    signUp() {
      // Prepare the data to send to the backend
      const userData = {
        email: this.user.email,
        name: this.user.name,
        surname: this.user.surname,
        address: this.user.address,
        password: this.user.password,
        gender: this.user.gender
      };

      if (this.user.password !== this.user.confirmPassword) {
        alert("Passwords do not match. Please enter matching passwords.");
        return;
      }
      axios.post('http://localhost:8080/signup', userData)
          .then(response => {
            console.log(response.data);
            this.$router.push('/login');
            window.alert('Signup successful! Please log in.');
          }).catch(error => {
            console.error(error);
            window.alert('Error during Signup! Please try again.');
          });
    },
  }
};

</script>

<style scoped>
@import './SignUp.css';
</style>