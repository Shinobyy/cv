<template>
  <div class="cv-builder-page">
    <!-- Formes décoratives en arrière-plan -->
    <div class="background-design">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'expanded': sidebarExpanded }">
      <div class="logo-area">
        <NuxtLink to="/dashboard" class="logo-link">
          <i class="fa-solid fa-file-lines logo-icon"></i>
          <span class="logo-text">CV Builder</span>
        </NuxtLink>
      </div>
      
      <div class="sidebar-sections">
        <div 
          v-for="(section, index) in sections" 
          :key="index"
          :class="['sidebar-item', { active: activeSection === section.id, completed: isCompleted(section.id) }]"
          @click="activeSection = section.id"
        >
          <div class="sidebar-item-icon">
            <i :class="section.icon"></i>
          </div>
          <span class="sidebar-label">{{ section.label }}</span>
          <i v-if="isCompleted(section.id)" class="fa-solid fa-check completion-mark"></i>
        </div>
      </div>
      
      <div class="sidebar-item action-button" @click="handleCreateCV">
        <div class="sidebar-item-icon">
          <i class="fa-solid fa-file-export"></i>
        </div>
        <span class="sidebar-label">Générer mon CV</span>
      </div>
      
    </div>

    <button 
      class="toggle-sidebar-btn" 
      :class="{ 'sidebar-expanded': sidebarExpanded }"
      @click="sidebarExpanded = !sidebarExpanded"
    >
      <i class="fa-solid fa-chevron-right" :class="{ 'rotate-180': sidebarExpanded }"></i>
    </button>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header mobile avec nom de la section active -->
      <div class="mobile-header">
        <button class="mobile-sidebar-toggle" @click="sidebarExpanded = !sidebarExpanded">
          <i class="fa-solid fa-bars"></i>
        </button>
        <h2 class="mobile-section-title">{{ currentSection.label }}</h2>
      </div>

      <!-- Container principal avec formulaire et preview -->
      <div class="content-container">
        <!-- Form Container -->
        <div class="form-container card-container">
          <div class="card-header">
            <h2 class="section-title">
              <i :class="currentSection.icon"></i>
              {{ currentSection.label }}
            </h2>
            <p class="section-subtitle">Remplissez les informations ci-dessous pour compléter cette section</p>
          </div>
          
          <div class="form-content">
            <div v-show="activeSection === 'personal'">
              <CvPersonalInfos @submit="(personalInfos) => data.personalInfos = personalInfos" />
            </div>
            
            <div v-show="activeSection === 'title'">
              <CvTitleAndSub @submit="(titleAndSub) => data.titleAndSub = titleAndSub" />
            </div>
            
            <div v-show="activeSection === 'experience'">
              <CvProExperiences @submit="(proExperiences) => data.proExperiences = proExperiences" />
            </div>
            
            <div v-show="activeSection === 'education'">
              <CvFormations @submit="(formations) => data.formations = formations" />
            </div>
            
            <div v-show="activeSection === 'skills'">
              <CvSkills @submit="(skills) => data.skills = skills" />
            </div>
          </div>
          
          <div class="form-navigation">
            <button 
              v-if="getPreviousSection()" 
              class="nav-button prev-button" 
              @click="navigateToPrevious()"
            >
              <i class="fa-solid fa-arrow-left"></i>
              Section précédente
            </button>
            
            <button 
              v-if="getNextSection()" 
              class="nav-button next-button" 
              @click="navigateToNext()"
            >
              Section suivante
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            
            <button 
              v-if="!getNextSection()" 
              class="nav-button finish-button" 
              @click="handleCreateCV"
            >
              Générer mon CV
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>

        <!-- Preview Container -->
        <div class="preview-container card-container">
          <div class="card-header">
            <h2 class="section-title">
              <i class="fa-solid fa-eye"></i>
              Aperçu en temps réel
            </h2>
            
            <div class="model-selector">
              <label for="model-select">Choisir un modèle:</label>
              <div class="select-wrapper">
                <select 
                  id="model-select"
                  v-model="selectedModel"
                  class="model-select"
                >
                  <option value="model1">Modern Template</option>
                  <option value="model2">Classic Template</option>
                  <option value="model3">Creative Template</option>
                </select>
                <i class="fa-solid fa-chevron-down select-icon"></i>
              </div>
            </div>
          </div>
          
          <div class="preview-content">
            <div class="preview-wrapper">
              <CvPreview
                :modelChosen="selectedModel"
                :personal-infos="data.personalInfos"
                :title-and-sub="data.titleAndSub"
                :pro-experiences="data.proExperiences"
                :formations="data.formations"
                :skills="data.skills"
              />
            </div>
          </div>
          
          <div class="preview-actions">
            <button class="action-button print-button">
              <i class="fa-solid fa-print"></i>
              Imprimer
            </button>
            <button class="action-button pdf-button">
              <i class="fa-solid fa-file-pdf"></i>
              Exporter en PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

const sections = [
  { id: 'personal', label: 'Informations personnelles', icon: 'fa-solid fa-user' },
  { id: 'title', label: 'Titre et accroche', icon: 'fa-solid fa-heading' },
  { id: 'experience', label: 'Expériences professionnelles', icon: 'fa-solid fa-briefcase' },
  { id: 'education', label: 'Formation', icon: 'fa-solid fa-graduation-cap' },
  { id: 'skills', label: 'Compétences', icon: 'fa-solid fa-star' },
];

const activeSection = ref('personal');
const selectedModel = ref('model1');
const sidebarExpanded = ref(false);

const data = ref({
  personalInfos: {},
  titleAndSub: {},
  proExperiences: [],
  formations: [],
  skills: []
});

const currentSection = computed(() => {
  return sections.find(section => section.id === activeSection.value) || sections[0];
});

const getPreviousSection = () => {
  const currentIndex = sections.findIndex(section => section.id === activeSection.value);
  return currentIndex > 0 ? sections[currentIndex - 1] : null;
};

const getNextSection = () => {
  const currentIndex = sections.findIndex(section => section.id === activeSection.value);
  return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
};

const navigateToPrevious = () => {
  const prevSection = getPreviousSection();
  if (prevSection) {
    activeSection.value = prevSection.id;
    scrollToTop();
  }
};

const navigateToNext = () => {
  const nextSection = getNextSection();
  if (nextSection) {
    activeSection.value = nextSection.id;
    scrollToTop();
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  const storedPersonalInfos = useStorage('personalInfos', {}).value;
  const storedTitleAndSub = useStorage('titleAndSub', {}).value;
  const storedProExperiences = useStorage('proExperiences', []).value;
  const storedFormations = useStorage('formations', []).value;
  const storedSkills = useStorage('skills', []).value;

  data.value = {
    personalInfos: storedPersonalInfos,
    titleAndSub: storedTitleAndSub,
    proExperiences: storedProExperiences,
    formations: storedFormations,
    skills: storedSkills
  };
  
  // Adapter l'interface pour le mobile
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      sidebarExpanded.value = false;
    }
  };
  
  window.addEventListener('resize', handleResize);
  handleResize();
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

const validatePersonalInfos = (info) => {
  const requiredFields = ['nom', 'prenom', 'email', 'telephone'];
  return requiredFields.every(field => info[field]?.trim?.());
};

const validateTitleAndSub = (titleData) => {
  return Boolean(titleData.title?.trim() && titleData.subtitle?.trim());
};

const validateExperiences = (experiences) => {
  if (!experiences.length) return false;
  return experiences.every(exp => 
    exp.companyName?.trim() && 
    exp.startDate?.trim() &&
    exp.description?.trim()
  );
};

const validateFormations = (formations) => {
  if (!formations.length) return false;
  return formations.every(formation => 
    formation.schoolName?.trim() && 
    formation.degree?.trim() &&
    formation.startDate?.trim()
  );
};

const validateSkills = (skills) => {
  if (!skills.length) return false;
  return skills.every(skill => skill.name?.trim() && skill.level);
};

const isCompleted = (sectionId) => {
  switch(sectionId) {
    case 'personal': return validatePersonalInfos(data.value.personalInfos);
    case 'title': return validateTitleAndSub(data.value.titleAndSub);
    case 'experience': return validateExperiences(data.value.proExperiences);
    case 'education': return validateFormations(data.value.formations);
    case 'skills': return validateSkills(data.value.skills);
    default: return false;
  }
};

const handleCreateCV = async () => {
  const validations = {
    personal: validatePersonalInfos(data.value.personalInfos),
    title: validateTitleAndSub(data.value.titleAndSub),
    experience: validateExperiences(data.value.proExperiences),
    education: validateFormations(data.value.formations),
    skills: validateSkills(data.value.skills)
  };
  
  const allValid = Object.values(validations).every(v => v === true);
  
  if (!allValid) {
    const failedValidations = Object.entries(validations).filter(([_, isValid]) => !isValid);
    
    const missingFields = failedValidations.map(([field]) => {
      const sectionNames = {
        personal: 'Informations personnelles',
        title: 'Titre et accroche',
        experience: 'Expériences professionnelles',
        education: 'Formation',
        skills: 'Compétences'
      };
      return sectionNames[field] || field;
    });
    
    if (missingFields.length > 0) {
      alert(`Veuillez compléter tous les champs requis dans : ${missingFields.join(', ')}`);
    } else {
      alert("Des champs requis sont manquants, mais nous n'avons pas pu identifier lesquels.");
    }
    return;
  }

  // check if user is logged in with the session useUserSession composable
  const { loggedIn, user, fetch: refreshSession } = useUserSession()
  if (!loggedIn.value) {
    alert('Vous devez être connecté pour créer un CV.');
    navigateTo('/login');
    return;
  }

  createCV(
    data.value.personalInfos,
    data.value.titleAndSub,
    data.value.proExperiences,
    data.value.formations,
    data.value.skills
  );
};

const createCV = async (personalInfos, titleAndSub, proExperiences, formations, skills) => {
  try {
    const { data, error } = await useFetch('/api/cv/create', {
      method: 'POST',
      body: {
        personalInfos,
        titleAndSub,
        proExperiences,
        formations,
        skills
      }
    });
    
    if (error.value) {
      console.error('Error creating CV:', error.value);
      alert('Erreur lors de la création du CV. Veuillez réessayer.');
      return;
    }
    
    alert(`CV créé avec succès! Vous allez être redirigé.`);
    // clear local storage
    useStorage('personalInfos', {}).value = {};
    useStorage('titleAndSub', {}).value = {};
    useStorage('proExperiences', []).value = [];
    useStorage('formations', []).value = [];
    useStorage('skills', []).value = [];

    navigateTo("/dashboard");
  } catch (e) {
    console.error('Exception during CV creation:', e);
    alert('Une erreur est survenue pendant la création du CV');
  }
};
</script>

<style scoped>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cv-builder-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  background-color: var(--gray-50);
  overflow: hidden;
}

/* Formes décoratives en arrière-plan */
.background-design {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
}

.shape-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -200px;
  animation: float 15s infinite ease-in-out;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  right: -150px;
  animation: float 20s infinite ease-in-out reverse;
}

.shape-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 5%;
  animation: float 18s infinite ease-in-out;
}

.shape-4 {
  width: 250px;
  height: 250px;
  top: 25%;
  right: 10%;
  animation: float 12s infinite ease-in-out reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

/* Sidebar */
.sidebar {
  width: 80px;
  height: 100vh;
  background: linear-gradient(to bottom, var(--primary), var(--primary-hover));
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, transform 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar.expanded {
  width: 260px;
}

.logo-area {
  padding: 20px 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
}

.logo-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar.expanded .logo-text {
  opacity: 1;
}

.sidebar-sections {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  overflow: hidden;
  white-space: nowrap;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.sidebar-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-item.completed {
  border-left: 3px solid #4CAF50;
}

.sidebar-item-icon {
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 16px;
}

.sidebar-label {
  font-size: 15px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar.expanded .sidebar-label {
  opacity: 1;
}

.completion-mark {
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: #4CAF50;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar.expanded .completion-mark {
  opacity: 1;
}

.action-button {
  margin-top: auto;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
  letter-spacing: 0.3px;
  padding: 15px;
}

.action-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.toggle-sidebar-btn {
  position: absolute;
  top: 50%;
  left: 65px; /* Modifié pour faire chevaucher le bouton */
  transform: translateY(-50%);
  width: 30px; /* Légèrement plus grand pour une meilleure expérience utilisateur */
  height: 30px; /* Légèrement plus grand pour une meilleure expérience utilisateur */
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 101; /* Ajout d'un z-index supérieur pour s'assurer qu'il est au-dessus */
}

.toggle-sidebar-btn.sidebar-expanded {
  left: 245px; /* Position lorsque la sidebar est étendue */
}

.toggle-sidebar-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.toggle-sidebar-btn i {
  font-size: 14px; /* Légèrement plus grand pour être proportionnel au bouton */
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 80px; /* Match sidebar width */
  transition: margin-left 0.3s ease;
  width: calc(100% - 80px);
}

.sidebar.expanded + .main-content {
  margin-left: 260px;
  width: calc(100% - 260px);
}

/* Mobile header */
.mobile-header {
  display: none;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  align-items: center;
}

.mobile-sidebar-toggle {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--primary);
  cursor: pointer;
  margin-right: 15px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

/* Content container */
.content-container {
  display: flex;
  gap: 20px;
  height: calc(100vh - 40px);
}

.card-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--gray-100);
  overflow: hidden;
}

/* Card header styling */
.card-header {
  padding: 20px;
  border-bottom: 1px solid var(--gray-100);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--gray-900);
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  color: var(--primary);
  font-size: 16px;
}

.section-subtitle {
  font-size: 14px;
  color: var(--gray-600);
  margin: 0;
}

/* Form container */
.form-container {
  flex: 1;
  max-width: 50%;
  height: 100%;
}

.form-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 150px);
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-top: 1px solid var(--gray-100);
  background-color: var(--gray-50);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.prev-button {
  background-color: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
}

.prev-button:hover {
  background-color: var(--gray-100);
  transform: translateX(-2px);
}

.next-button, .finish-button {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.2);
}

.next-button:hover, .finish-button:hover {
  background-color: var(--primary-hover);
  transform: translateX(2px);
}

.finish-button {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
}

/* Preview container */
.preview-container {
  flex: 1;
  max-width: 50%;
  height: 100%;
}

.model-selector {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.model-selector label {
  font-size: 14px;
  color: var(--gray-700);
  font-weight: 500;
}

.select-wrapper {
  position: relative;
  flex: 1;
}

.model-select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  background-color: white;
  font-size: 14px;
  appearance: none;
  padding-right: 30px;
}

.model-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--gray-500);
  font-size: 12px;
}

.preview-content {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  height: calc(100% - 180px);
  background-color: var(--gray-50);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.preview-wrapper {
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  min-height: 500px;
  transition: all 0.3s ease;
}

.preview-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px 20px;
  border-top: 1px solid var(--gray-100);
  background-color: var(--gray-50);
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.print-button {
  background-color: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
}

.print-button:hover {
  background-color: var(--gray-100);
  transform: translateY(-2px);
}

.pdf-button {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(229, 62, 62, 0.2);
}

.pdf-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(229, 62, 62, 0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
    height: auto;
  }

  .form-container, .preview-container {
    max-width: 100%;
  }

  .preview-container {
    margin-top: 20px;
  }

  .form-content, .preview-content {
    height: auto;
    max-height: 600px;
  }
}

@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }

  .sidebar {
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar.expanded {
    transform: translateX(0);
    width: 260px;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 10px;
  }

  .sidebar.expanded + .main-content {
    margin-left: 0;
    width: 100%;
  }

  /* Overlay when sidebar is open on mobile */
  .sidebar.expanded::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
</style>