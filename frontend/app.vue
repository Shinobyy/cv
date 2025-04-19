<template>
  <NuxtPage />
</template>

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
  --primary-color: #F5F2EE;
  --secondary-color: rgb(26, 26, 26);
  --accent-color: #FF6B6B;
  --text-color: rgb(26, 26, 26);
  --bg-light: #F9F7F5;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


body {
  font-family: 'Cantarell', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--primary-color);
}

h1, h2, h3, .logo {
  font-family: 'Archivo Black', sans-serif;
}

</style>