<template>
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="welcome-title">
            <span class="greeting">Bonjour,</span>
            <span class="user-name">{{ user?.name || 'Utilisateur' }}</span>
          </h1>
          <p class="welcome-subtitle">Bienvenue dans votre espace personnel de gestion de CV</p>
        </div>
        <div class="header-actions">
          <NuxtLink to="/cv/create">
            <button class="create-cv-btn">
              <i class="i-heroicons-plus"></i>
              Créer un nouveau CV
            </button>
          </NuxtLink>
        </div>
      </div>
  
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="i-heroicons-document-text"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ cvs.length }}</div>
            <div class="stat-label">CV créés</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="i-heroicons-clock"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ getLatestCVDate() }}</div>
            <div class="stat-label">Dernier CV créé</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="i-heroicons-template"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">3</div>
            <div class="stat-label">Templates disponibles</div>
          </div>
        </div>
      </div>
  
      <!-- My CVs Section -->
      <section class="cvs-section">
        <h2 class="section-title">
          <i class="i-heroicons-document-duplicate"></i>
          Mes CV
        </h2>
  
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="loading-animation">
            <div class="spinner"></div>
          </div>
          <p>Chargement de vos CV...</p>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="cvs.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="i-heroicons-document"></i>
          </div>
          <h3>Aucun CV trouvé</h3>
          <p>Commencez par créer votre premier CV professionnel</p>
          <NuxtLink to="/cv/create">
          <button class="create-cv-btn mt-4">
            <i class="i-heroicons-plus"></i>
            Créer un CV
          </button>
        </NuxtLink>
        </div>
  
        <!-- CV Grid -->
        <div v-else class="cv-grid">
          <div v-for="cv in cvs" :key="cv.id" class="cv-grid-item">
            <UserCv :cv="cv" @deleted="handleCvDeleted" />
          </div>
        </div>
      </section>
  
      <!-- Tips Section -->
      <section class="tips-section">
        <h2 class="section-title">
          <i class="i-heroicons-light-bulb"></i>
          Conseils pour un CV parfait
        </h2>
        
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon"><i class="i-heroicons-check-badge"></i></div>
            <h3>Soyez concis</h3>
            <p>Un recruteur passe en moyenne 6 secondes sur un CV. Allez à l'essentiel.</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon"><i class="i-heroicons-check-badge"></i></div>
            <h3>Personnalisez</h3>
            <p>Adaptez votre CV pour chaque offre d'emploi en mettant en avant les compétences pertinentes.</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon"><i class="i-heroicons-check-badge"></i></div>
            <h3>Utilisez des mots-clés</h3>
            <p>Intégrez des mots-clés du secteur pour passer les filtres ATS (systèmes de suivi des candidats).</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { UserCv } from '#components';
  import { onMounted, ref } from 'vue';
  
  definePageMeta({
    middleware: ['auth'],
  });
  
  const { loggedIn, user } = useUserSession();
  const cvs = ref([]);
  const loading = ref(true);
  
  onMounted(() => {
    getUserData();
    getCvs();
  });
  
  async function getUserData() {
    try {
      const response = await $fetch('/api/user');
      console.log('User data:', response);
    } catch (error) {
      console.error('Error fetching user data:', error);
      
      if (error.response?.status === 401) {
        navigateTo('/login');
      }
    }
  }
  
  async function getCvs() {
    try {
      const response = await $fetch('/api/cv/user');
      console.log('CVs:', response);
      
      if (response && response.cvs) {
        cvs.value = response.cvs;
      }
    } catch (error) {
      console.error('Error fetching CVs:', error);
    } finally {
      loading.value = false;
    }
  }
  
  function getLatestCVDate() {
    if (cvs.value.length === 0) return 'Aucun';
    
    const sortedCvs = [...cvs.value].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    const date = new Date(sortedCvs[0].createdAt);
    return date.toLocaleDateString('fr-FR');
  }
  
  function handleCvDeleted(cvId) {
    cvs.value = cvs.value.filter(cv => cv.id !== cvId);
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--gray-800);
  }
  
  /* Header Section */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .welcome-title {
    display: flex;
    flex-direction: column;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
    color: var(--gray-900);
    font-size: clamp(1.75rem, 4vw, 2.25rem);
  }
  
  .greeting {
    color: var(--gray-600);
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }
  
  .welcome-subtitle {
    margin-top: 0.75rem;
    color: var(--gray-600);
    font-size: 1.125rem;
    max-width: 600px;
  }
  
  .create-cv-btn {
  padding: 0.75rem 1.5rem !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  border-radius: 0.5rem !important;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer !important;
}

.create-cv-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-hover) 0%, var(--accent) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.create-cv-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.6) !important;
}

.create-cv-btn:hover::after {
  opacity: 1;
}

.create-cv-btn:active {
  transform: translateY(-1px) !important;
  box-shadow: 0 2px 10px rgba(124, 58, 237, 0.4) !important;
}

.create-cv-btn i {
  margin-right: 0.5rem;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.create-cv-btn:hover i {
  transform: rotate(90deg);
}
  /* Stats Section */
  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    background-color: var(--primary-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: var(--primary);
    font-size: 1.5rem;
  }
  
  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--gray-900);
    line-height: 1.2;
  }
  
  .stat-label {
    color: var(--gray-600);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  /* CVs Section */
  .cvs-section {
    background-color: white;
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: var(--shadow);
  }
  
  .section-title {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--gray-900);
    border-bottom: 2px solid var(--gray-100);
    padding-bottom: 1rem;
  }
  
  .section-title i {
    margin-right: 0.75rem;
    color: var(--accent);
  }
  
  /* CV Grid */
  .cv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: var(--gray-600);
  }
  
  .loading-animation {
    margin-bottom: 1.5rem;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--gray-200);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spinner 0.8s linear infinite;
  }
  
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
  
  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--gray-600);
  }
  
  .empty-icon {
    font-size: 4rem;
    color: var(--gray-300);
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
  }
  
  .empty-state p {
    max-width: 400px;
    margin: 0 auto;
  }
  
  /* Tips Section */
  .tips-section {
    background-color: white;
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .tip-card {
    padding: 1.5rem;
    border-radius: var(--radius);
    background-color: var(--gray-50);
    border-left: 4px solid var(--accent);
    transition: transform 0.3s ease;
  }
  
  .tip-card:hover {
    transform: translateY(-4px);
  }
  
  .tip-icon {
    color: var(--accent);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .tip-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--gray-800);
  }
  
  .tip-card p {
    color: var(--gray-600);
    margin: 0;
    line-height: 1.5;
    font-size: 0.95rem;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .header-content, .header-actions {
      width: 100%;
    }
    
    .create-cv-btn {
      width: 100%;
      margin-top: 1rem;
    }
    
    .cvs-section, .tips-section {
      padding: 1.5rem;
    }
    
    .cv-grid {
      grid-template-columns: 1fr;
    }
  }
  
  /* Animation for elements appearing */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .dashboard-header, 
  .stats-section, 
  .cvs-section, 
  .tips-section {
    animation: fadeInUp 0.5s ease forwards;
  }
  
  .stats-section {
    animation-delay: 0.1s;
  }
  
  .cvs-section {
    animation-delay: 0.2s;
  }
  
  .tips-section {
    animation-delay: 0.3s;
  }
  </style>