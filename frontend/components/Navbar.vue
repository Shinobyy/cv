<template>
    <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="navbar-container">
        <!-- Logo et marque -->
        <div class="navbar-brand">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-icon"><i class="i-heroicons-document-text"></i></span>
            <span class="logo-text">CV Builder</span>
          </NuxtLink>
        </div>
  
        <!-- Navigation principale -->
        <div class="navbar-links" :class="{ 'active': mobileMenuOpen }">
          <NuxtLink to="/" class="nav-link" @click="closeMobileMenu">
            <i class="i-heroicons-home"></i>
            <span>Accueil</span>
          </NuxtLink>
          <NuxtLink to="/dashboard" class="nav-link" @click="closeMobileMenu">
            <i class="i-heroicons-chart-bar"></i>
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/cv/create" class="nav-link create-link" @click="closeMobileMenu">
            <i class="i-heroicons-document-plus"></i>
            <span>Créer un CV</span>
          </NuxtLink>
          <NuxtLink to="/templates" class="nav-link" @click="closeMobileMenu">
            <i class="i-heroicons-template"></i>
            <span>Templates</span>
          </NuxtLink>
        </div>
  
        <!-- Menu utilisateur -->
        <div class="navbar-user">
          <div class="search-bar">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              class="search-input"
              v-model="searchQuery"
              @focus="searchActive = true"
              @blur="searchActive = false"
            />
            <i class="i-heroicons-magnifying-glass" :class="{ 'search-active': searchActive }"></i>
          </div>
  
          <div class="user-menu" @click="toggleUserDropdown" ref="userMenuRef">
            <div class="user-avatar">
              <img v-if="user?.avatar" :src="user.avatar" alt="Avatar">
              <div v-else class="avatar-placeholder">{{ userInitials }}</div>
            </div>
            <span class="user-name">{{ user?.name || 'Utilisateur' }}</span>
            <i class="i-heroicons-chevron-down" :class="{ 'rotated': userDropdownOpen }"></i>
  
            <!-- Dropdown -->
            <div class="user-dropdown" v-if="userDropdownOpen">
              <NuxtLink to="/profile" class="dropdown-item" @click="closeUserDropdown">
                <i class="i-heroicons-user-circle"></i>
                <span>Mon Profil</span>
              </NuxtLink>
              <NuxtLink to="/settings" class="dropdown-item" @click="closeUserDropdown">
                <i class="i-heroicons-cog-6-tooth"></i>
                <span>Paramètres</span>
              </NuxtLink>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="dropdown-item logout-item">
                <i class="i-heroicons-arrow-right-on-rectangle"></i>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
  
          <!-- Bouton menu mobile -->
          <button class="mobile-menu-button" @click="toggleMobileMenu">
            <i class="i-heroicons-bars-3" v-if="!mobileMenuOpen"></i>
            <i class="i-heroicons-x-mark" v-else></i>
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  const user = useState('user', () => null);
  const searchQuery = ref('');
  const searchActive = ref(false);
  const mobileMenuOpen = ref(false);
  const userDropdownOpen = ref(false);
  const scrolled = ref(false);
  const userMenuRef = ref(null);
  
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U';
    return user.value.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  });
  
  // Fermer le dropdown utilisateur quand on clique ailleurs
  onMounted(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('scroll', handleScroll);
  });
  
  function handleClickOutside(event) {
    if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
      userDropdownOpen.value = false;
    }
  }
  
  function handleScroll() {
    scrolled.value = window.scrollY > 10;
  }
  
  function toggleUserDropdown() {
    userDropdownOpen.value = !userDropdownOpen.value;
  }
  
  function closeUserDropdown() {
    userDropdownOpen.value = false;
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    if (mobileMenuOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  function closeMobileMenu() {
    mobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }
  
  async function logout() {
  try {
    // D'abord, appeler votre API de déconnexion côté serveur (si nécessaire)
    // await $fetch('/api/auth/logout', { method: 'POST' });
    
    // Récupérer les méthodes de gestion de session
    const { clear } = useUserSession();
    
    // Effacer la session utilisateur
    if (clear) {
      clear();
    } else {
      // Alternative si clear n'existe pas : réinitialiser manuellement
      const session = useUserSession();
      if (session.user) {
        session.user.value = null;
      }
      if (session.loggedIn) {
        session.loggedIn.value = false;
      }
    }
    
    // Rediriger vers la page de connexion
    navigateTo('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
}

  </script>
  
  <style scoped>
  .navbar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 100;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .navbar-scrolled {
    height: 60px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.98);
  }
  
  .navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  /* Logo et marque */
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  
  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary);
    font-weight: 700;
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  .logo-link:hover {
    transform: translateY(-2px);
  }
  
  .logo-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: var(--primary);
  }
  
  .logo-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  /* Navigation links */
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    color: var(--gray-700);
    text-decoration: none;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .nav-link i {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  .nav-link:hover {
    color: var(--primary);
    background-color: var(--primary-lighter);
  }
  
  .nav-link:hover i {
    transform: translateY(-2px);
  }
  
  .nav-link.router-link-active {
    color: var(--primary);
    background-color: var(--primary-light);
    font-weight: 600;
  }
  
  .create-link {
    background-color: var(--primary);
    color: white;
    font-weight: 600;
    padding: 0.5rem 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .create-link:hover {
    background-color: var(--primary-dark);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* User menu */
  .navbar-user {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .search-bar {
    position: relative;
    margin-right: 0.5rem;
  }
  
  .search-input {
    padding: 0.5rem 0.75rem 0.5rem 2.25rem;
    border-radius: 9999px;
    border: 1px solid var(--gray-200);
    font-size: 0.875rem;
    width: 200px;
    transition: all 0.3s ease;
    background-color: var(--gray-50);
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px var(--primary-lighter);
    background-color: white;
    width: 250px;
  }
  
  .search-bar i {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
    transition: color 0.3s ease;
  }
  
  .search-bar i.search-active {
    color: var(--primary);
  }
  
  .user-menu {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s ease;
  }
  
  .user-menu:hover {
    background-color: var(--gray-100);
  }
  
  .user-avatar {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-light);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-placeholder {
    font-weight: 600;
    color: var(--primary);
    font-size: 0.9rem;
  }
  
  .user-name {
    font-weight: 500;
    color: var(--gray-800);
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .user-menu i {
    color: var(--gray-500);
    transition: transform 0.3s ease;
  }
  
  .user-menu i.rotated {
    transform: rotate(180deg);
  }
  
  /* User dropdown */
  .user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border-radius: 0.5rem;
    width: 220px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
    overflow: hidden;
    animation: dropdownFadeIn 0.2s ease;
    border: 1px solid var(--gray-100);
    z-index: 10;
  }
  
  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--gray-700);
    text-decoration: none;
    transition: background-color 0.2s ease;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border: none;
    background: none;
    font-size: 0.9rem;
  }
  
  .dropdown-item i {
    margin-right: 0.75rem;
    font-size: 1.1rem;
    color: var(--gray-500);
  }
  
  .dropdown-item:hover {
    background-color: var(--gray-50);
    color: var(--gray-900);
  }
  
  .dropdown-item:hover i {
    color: var(--primary);
  }
  
  .dropdown-divider {
    height: 1px;
    background-color: var(--gray-100);
    margin: 0.25rem 0;
  }
  
  .logout-item {
    color: #ef4444;
  }
  
  .logout-item:hover {
    background-color: #fee2e2;
    color: #b91c1c;
  }
  
  .logout-item i {
    color: #ef4444;
  }
  
  /* Mobile menu button */
  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    color: var(--gray-700);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.375rem;
  }
  
  .mobile-menu-button:hover {
    background-color: var(--gray-100);
    color: var(--primary);
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .search-input {
      width: 160px;
    }
    
    .search-input:focus {
      width: 200px;
    }
    
    .user-name {
      max-width: 80px;
    }
  }
  
  @media (max-width: 900px) {
    .navbar-links {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      height: calc(100vh - 70px);
      background-color: white;
      flex-direction: column;
      justify-content: flex-start;
      padding: 2rem 1.5rem;
      gap: 1.5rem;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
      z-index: 99;
      opacity: 0;
    }
    
    .navbar-links.active {
      transform: translateX(0);
      opacity: 1;
    }
    
    .nav-link {
      width: 100%;
      padding: 1rem;
      border-radius: 0.5rem;
      justify-content: flex-start;
      border-left: 3px solid transparent;
    }
    
    .nav-link.router-link-active {
      border-left-color: var(--primary);
    }
    
    .create-link {
      margin-top: 1rem;
      width: 100%;
      justify-content: center;
    }
    
    .mobile-menu-button {
      display: block;
    }
    
    .navbar-scrolled .navbar-links {
      top: 60px;
      height: calc(100vh - 60px);
    }
    
    .search-bar {
      display: none;
    }
  }
  
  @media (max-width: 600px) {
    .navbar-container {
      padding: 0 1rem;
    }
    
    .logo-text {
      display: none;
    }
    
    .user-name {
      display: none;
    }
    
    .user-avatar {
      width: 2rem;
      height: 2rem;
    }
  }
  </style>