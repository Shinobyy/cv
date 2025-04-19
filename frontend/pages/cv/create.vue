<template>
  <div class="cv-builder">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
      </div>
      
      <div 
        v-for="(section, index) in sections" 
        :key="index"
        :class="['sidebar-item', { active: activeSection === section.id, completed: isCompleted(section.id) }]"
        @click="activeSection = section.id"
      >
        <i :class="section.icon"></i>
        <span class="sidebar-label">{{ section.label }}</span>
        <i v-if="isCompleted(section.id)" class="fas fa-check-circle completion-mark"></i>
      </div>
      
      <div class="sidebar-item action-button" @click="handleCreateCV">
        <i class="fas fa-file-export"></i>
        <span class="sidebar-label">Generate CV</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Form Container - Only shows active section -->
      <div class="form-container">
        <h2>
          <i :class="currentSection.icon"></i>
          {{ currentSection.label }}
        </h2>
        
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

      <!-- Preview Container -->
      <div class="preview-container">
        <h2>Preview</h2>
        <div class="model-selector">
          <select v-model="selectedModel">
            <option value="model1">Modern Template</option>
            <option value="model2">Classic Template</option>
            <option value="model3">Creative Template</option>
          </select>
        </div>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

const sections = [
  { id: 'personal', label: 'Informations personnelles', icon: 'fas fa-user' },
  { id: 'title', label: 'Titre et accroche', icon: 'fas fa-heading' },
  { id: 'experience', label: 'Expériences professionnelles', icon: 'fas fa-briefcase' },
  { id: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
  { id: 'skills', label: 'Skills', icon: 'fas fa-cogs' },
];

const activeSection = ref('personal');
const selectedModel = ref('model1');

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
        education: 'Education',
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

  createCV(
    data.value.personalInfos,
    data.value.titleAndSub,
    data.value.proExperiences,
    data.value.formations,
    data.value.skills
  )

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
      alert('Error creating CV. Please try again.');
      return;
    }
    
    alert(`CV créé avec succès! Vous allez être redirigé.`);
    navigateTo(data.value.viewUrl);
  } catch (e) {
    console.error('Exception during CV creation:', e);
    alert('An error occurred during CV creation');
  }
};


</script>

<style scoped>

body {
  margin: 0;
}

.cv-builder {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 80px;
  background-color: var(--secondary-color);
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar:hover {
  width: 240px;
}

.logo {
  padding: 10px;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.sidebar-item i {
  font-size: 20px;
  min-width: 30px;
  text-align: center;
}

.sidebar-label {
  margin-left: 15px;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar:hover .sidebar-label {
  opacity: 1;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-item.active {
  background-color: var(--accent-color);
}

.completion-mark {
  position: absolute;
  right: 15px;
  color: #4CAF50;
}

.sidebar-item.completed {
  border-left: 3px solid #4CAF50;
}

.action-button {
  margin-top: auto;
  background-color: var(--accent-color);
}

.main-content {
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
}

.form-container {
  flex: 1;
  background-color: var(--bg-light);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow-y: auto;
}

.preview-container {
  flex: 1;
  background-color: var(--bg-light);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow-y: auto;
  height: calc(100vh - 40px);
}

.model-selector {
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
}

h2 {
  margin-top: 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

h2 i {
  margin-right: 10px;
}

@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
  }
  
  .preview-container {
    height: auto;
  }
}
</style>