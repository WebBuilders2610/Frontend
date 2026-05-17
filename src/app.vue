<script setup>
import AppNavbar from './shared/presentation/components/app-navbar.component.vue';
</script>

<template>
  <AppNavbar />
  
  <router-view />
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>