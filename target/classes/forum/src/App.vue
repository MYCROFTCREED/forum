
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import SignUp from './components/SignUp.vue';
import LoginForum from './components/LoginForum.vue';

export default {
  Components: {
    SignUp,
    LoginForum
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
