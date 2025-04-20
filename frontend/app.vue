<template>
  <div>  
    <Navbar v-if="!isHome && !isLogin && !isRegister && !isCVCreation" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

import Navbar from './components/Navbar.vue';

// if path is /, hide the header
const route = useRoute();

const isHome = computed(() => route.path === '/');
const isLogin = computed(() => route.path === '/login');
const isRegister = computed(() => route.path === '/register');
const isCVCreation = computed(() => route.path === '/cv/create');

</script>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

:root {
  --primary-color: #fff;
  --secondary-color: rgb(26, 26, 26);
  /* --accent-color: #FF6B6B; */
  --text-color: rgb(26, 26, 26);
  --bg-light: #F9F7F5;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: #dbeafe;
  --secondary: #1e293b;
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius: 0.5rem;
}


body {
  font-family: 'Cantarell', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--primary-color);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>