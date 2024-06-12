<template>
  <MainHeader />
  <RouterView />
  <LoginView />
</template>

<script>
// import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import MainHeader from './components/home/MainHeader.vue';
import LoginView from './views/LoginAdmin.vue';

export default {
  components: {
    RouterView,
    MainHeader,
    LoginView,
  }
}
</script>
