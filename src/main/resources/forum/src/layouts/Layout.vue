<template>
  <div>
    <router-view v-if="shouldDisplayLoginForum"></router-view>
  </div>
</template>

<script>
import LoginForum from './LoginForum.vue';

export default {
  components: {
    LoginForum,
  },
  computed: {
    shouldDisplayLoginForum() {
      // Adjust the condition based on your requirements
      return this.$route.fullPath !== '/page2';
    },
  },
};
</script>