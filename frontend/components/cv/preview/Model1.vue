<template>
    <div class="cv-container modern">
      <!-- En-tête avec infos personnelles -->
      <div class="cv-header">
        <div class="profile-picture">
          <div class="photo-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <div class="header-content">
          <div class="name-title">
            <h1>{{ personalInfos.prenom }} {{ personalInfos.nom }}</h1>
            <div class="subtitle">{{ titleAndSub.title }}</div>
            <div class="subtext">{{ titleAndSub.subtitle }}</div>
          </div>
          <div class="contact-info">
            <div class="contact-item" v-if="personalInfos.telephone">
              <i class="fas fa-phone"></i> {{ personalInfos.telephone }}
            </div>
            <div class="contact-item" v-if="personalInfos.email">
              <i class="fas fa-envelope"></i> {{ personalInfos.email }}
            </div>
            <div class="contact-item" v-if="personalInfos.adresse">
              <i class="fas fa-map-marker-alt"></i> {{ personalInfos.adresse }}
            </div>
            <div class="contact-item" v-if="personalInfos.dateNaissance">
              <i class="fas fa-calendar"></i> Né(e) le {{ personalInfos.dateNaissance }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Résumé -->
      <div class="section summary" v-if="resume">
        <div class="section-title">
          <i class="fas fa-user-circle"></i>
          <h2>Profil</h2>
        </div>
        <div class="section-content">
          <p>{{ resume }}</p>
        </div>
      </div>
  
      <!-- Expériences professionnelles -->
      <div class="section" v-if="proExperiences && proExperiences.length">
        <div class="section-title">
          <i class="fas fa-briefcase"></i>
          <h2>Expériences Professionnelles</h2>
        </div>
        <div class="section-content">
          <div class="experience-item" v-for="(exp, index) in proExperiences" :key="'exp-'+index">
            <div class="header-row">
              <div class="position">{{ exp.position }}</div>
              <div class="date-location">
                {{ exp.startDate }} - {{ exp.endDate || 'Présent' }} 
                <span v-if="exp.location">| {{ exp.location }}</span>
              </div>
            </div>
            <div class="company">{{ exp.companyName }}</div>
            <div class="description">{{ exp.description }}</div>
          </div>
        </div>
      </div>
  
      <!-- Formations -->
      <div class="section" v-if="formations && formations.length">
        <div class="section-title">
          <i class="fas fa-graduation-cap"></i>
          <h2>Formations</h2>
        </div>
        <div class="section-content">
          <div class="formation-item" v-for="(formation, index) in formations" :key="'form-'+index">
            <div class="header-row">
              <div class="degree"><strong>{{ formation.degree }}</strong></div>
              <div class="date-location">
                {{ formation.startDate }} - {{ formation.endDate || 'Présent' }}
                <span v-if="formation.location">| {{ formation.location }}</span>
              </div>
            </div>
            <div class="school">{{ formation.schoolName }}</div>
            <div class="description">{{ formation.description }}</div>
          </div>
        </div>
      </div>
  
      <!-- Compétences -->
      <div class="section" v-if="skills && skills.length">
        <div class="section-title">
          <i class="fas fa-cogs"></i>
          <h2>Compétences</h2>
        </div>
        <div class="section-content">
          <div class="skills-container">
            <template v-if="!hasSkillCategories">
              <div class="skill-category" style="width: 100%">
                <div class="skill-item" v-for="(skill, index) in skills" :key="'skill-'+index">
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-level">
                    <div class="skill-bar">
                      <div class="skill-progress" :style="getSkillLevelWidth(skill.level)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="skill-category" v-for="(categorySkills, category) in groupedSkills" :key="category">
                <h3>{{ category }}</h3>
                <div class="skill-item" v-for="(skill, index) in categorySkills" :key="'skill-cat-'+index">
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-level">
                    <div class="skill-bar">
                      <div class="skill-progress" :style="getSkillLevelWidth(skill.level)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
  
      <!-- Langues -->
      <div class="section" v-if="languages && languages.length">
        <div class="section-title">
          <i class="fas fa-language"></i>
          <h2>Langues</h2>
        </div>
        <div class="section-content languages-grid">
          <div class="language-item" v-for="(lang, index) in languages" :key="'lang-'+index">
            <div class="language-name">{{ lang.name }}</div>
            <div class="language-level">{{ lang.level }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    personalInfos: {
      type: Object,
      default: () => ({})
    },
    titleAndSub: {
      type: Object,
      default: () => ({})
    },
    resume: {
      type: String,
      default: ''
    },
    proExperiences: {
      type: Array,
      default: () => []
    },
    formations: {
      type: Array,
      default: () => []
    },
    skills: {
      type: Array,
      default: () => []
    },
    languages: {
      type: Array,
      default: () => []
    }
  });
  
  const hasSkillCategories = computed(() => {
    return props.skills.some(skill => skill.category && skill.category.trim() !== '');
  });
  
  const groupedSkills = computed(() => {
    const grouped = {};
    props.skills.forEach(skill => {
      const category = skill.category || 'Autres';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(skill);
    });
    return grouped;
  });
  
  function getSkillLevelWidth(level) {
    const levels = {
      'Débutant': '25%',
      'Intermédiaire': '50%',
      'Avancé': '75%',
      'Expert': '100%'
    };
    return `width: ${levels[level] || '50%'}`;
  }
  </script>
  
  <style scoped>
  .cv-container.modern {
    max-width: 100%;
    margin: 0 auto;
    padding: 40px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-family: 'Roboto', 'Arial', sans-serif;
    color: #333;
  }
  
  .cv-header {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 2px solid #f0f0f0;
  }
  
  .profile-picture {
    flex: 0 0 120px;
    margin-right: 30px;
  }
  
  .photo-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #ccc;
  }
  
  .header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  
  .name-title {
    flex: 2;
  }
  
  .contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .contact-item {
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  h1 {
    font-size: 32px;
    color: #2563eb;
    margin-bottom: 5px;
    font-weight: 700;
  }
  
  .subtitle {
    font-size: 18px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 5px;
  }
  
  .subtext {
    font-size: 15px;
    color: #6b7280;
  }
  
  .section {
    margin: 30px 0;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .section-title i {
    color: #2563eb;
    font-size: 20px;
    margin-right: 10px;
  }
  
  h2 {
    font-size: 22px;
    color: #2563eb;
    margin: 0;
    padding-bottom: 3px;
    border-bottom: 2px solid #2563eb;
  }
  
  .section-content {
    padding-left: 10px;
  }
  
  .experience-item, .formation-item {
    margin-bottom: 20px;
    position: relative;
    padding-left: 20px;
  }
  
  .experience-item:before, .formation-item:before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 10px;
    height: 10px;
    background-color: #2563eb;
    border-radius: 50%;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .position, .degree {
    font-weight: 600;
    font-size: 16px;
    color: #111827;
  }
  
  .company, .school {
    font-weight: 500;
    font-size: 15px;
    color: #4b5563;
    margin-bottom: 5px;
  }
  
  .date-location {
    color: #6b7280;
    font-size: 14px;
  }
  
  .description {
    font-size: 14px;
    margin-top: 5px;
    text-align: justify;
    color: #374151;
    line-height: 1.5;
  }
  
  .skills-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .skill-category {
    width: 48%;
    margin-right: 2%;
    margin-bottom: 20px;
  }
  
  .skill-category h3 {
    margin-bottom: 12px;
    font-size: 16px;
    color: #374151;
  }
  
  .skill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .skill-name {
    font-size: 14px;
    color: #4b5563;
    flex: 1;
  }
  
  .skill-level {
    flex: 2;
  }
  
  .skill-bar {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .skill-progress {
    height: 100%;
    background-color: #2563eb;
    border-radius: 4px;
  }
  
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .language-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 15px;
    background-color: #f9fafb;
    border-radius: 4px;
    border-left: 3px solid #2563eb;
  }
  
  .language-name {
    font-weight: 500;
  }
  
  .language-level {
    color: #6b7280;
  }
  
  .summary p {
    font-size: 15px;
    line-height: 1.6;
    color: #4b5563;
  }
  
  @media print {
    .cv-container {
      box-shadow: none;
      padding: 0;
    }
  }
  
  @media (max-width: 768px) {
    .cv-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .profile-picture {
      margin-right: 0;
      margin-bottom: 20px;
    }
    
    .header-content {
      flex-direction: column;
    }
    
    .contact-info {
      text-align: center;
      margin-top: 15px;
    }
    
    .skill-category {
      width: 100%;
    }
  }
  </style>