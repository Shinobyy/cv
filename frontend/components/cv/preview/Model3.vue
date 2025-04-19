<template>
    <div class="cv-container creative">
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
        <div class="section-content timeline">
          <div class="experience-item" v-for="(exp, index) in proExperiences" :key="'exp-'+index">
            <div class="timeline-point"></div>
            <div class="experience-card">
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
      </div>
  
      <!-- Formations -->
      <div class="section" v-if="formations && formations.length">
        <div class="section-title">
          <i class="fas fa-graduation-cap"></i>
          <h2>Formations</h2>
        </div>
        <div class="section-content timeline">
          <div class="formation-item" v-for="(formation, index) in formations" :key="'form-'+index">
            <div class="timeline-point"></div>
            <div class="formation-card">
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
        <div class="section-content">
          <div class="languages-grid">
            <div class="language-item" v-for="(lang, index) in languages" :key="'lang-'+index">
              <div class="language-name">{{ lang.name }}</div>
              <div class="language-level-container">
                <div class="language-meter">
                  <div class="language-level-indicator" :style="getLanguageLevelWidth(lang.level)"></div>
                </div>
                <div class="language-level-text">{{ lang.level }}</div>
              </div>
            </div>
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
  
  function getLanguageLevelWidth(level) {
    const levels = {
      'Débutant': '25%',
      'Intermédiaire': '50%',
      'Avancé': '75%',
      'Bilingue': '100%',
      'Langue maternelle': '100%'
    };
    return `width: ${levels[level] || '50%'}`;
  }
  </script>
  
  <style scoped>
  .cv-container.creative {
    max-width: 100%;
    margin: 0 auto;
    padding: 40px;
    background-color: #fcfcfc;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    font-family: 'Poppins', 'Roboto', sans-serif;
    color: #333;
    position: relative;
    overflow: hidden;
  }
  
  .cv-container.creative::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  }
  
  .cv-header {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    position: relative;
  }
  
  .cv-header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ddd, transparent);
  }
  
  .profile-picture {
    flex: 0 0 150px;
    margin-right: 30px;
  }
  
  .photo-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 75px;
    background: linear-gradient(135deg, #f5f7fa, #e4e5e6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #ccc;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }
  
  .photo-placeholder::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 2px dashed #ddd;
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
    background-color: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  
  .contact-item {
    margin-bottom: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  
  .contact-item i {
    width: 25px;
    height: 25px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-size: 12px;
  }
  
  h1 {
    font-size: 38px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
    font-weight: 700;
    letter-spacing: -1px;
  }
  
  .subtitle {
    font-size: 20px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 5px;
  }
  
  .subtext {
    font-size: 16px;
    color: #6b7280;
  }
  
  .section {
    margin: 40px 0;
    position: relative;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    position: relative;
  }
  
  .section-title i {
    color: white;
    font-size: 18px;
    width: 35px;
    height: 35px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  }
  
  h2 {
    font-size: 24px;
    color: #2d3748;
    margin: 0;
    font-weight: 600;
  }
  
  .section-content {
    padding-left: 20px;
  }
  
  .timeline {
    position: relative;
  }
  
  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  }
  
  .experience-item, .formation-item {
    position: relative;
    padding-left: 30px;
    margin-bottom: 30px;
  }
  
  .timeline-point {
    position: absolute;
    left: -9px;
    top: 8px;
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #6366f1;
    border-radius: 50%;
    z-index: 2;
  }
  
  .experience-card, .formation-card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .experience-card:hover, .formation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  
  .position, .degree {
    font-weight: 600;
    font-size: 18px;
    color: #111827;
  }
  
  .company, .school {
    font-weight: 500;
    font-size: 16px;
    color: #4b5563;
    margin-bottom: 8px;
  }
  
  .date-location {
    color: #6b7280;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  
  .description {
    font-size: 15px;
    margin-top: 10px;
    color: #4b5563;
    line-height: 1.6;
  }
  
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .skill-category {
    flex: 1 0 45%;
    min-width: 250px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
  }
  
  .skill-category h3 {
    margin-bottom: 15px;
    font-size: 18px;
    color: #2d3748;
    padding-bottom: 5px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .skill-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  
  .skill-name {
    font-size: 15px;
    color: #4b5563;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .skill-bar {
    width: 100%;
    height: 10px;
    background-color: #e5e7eb;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 5px;
    transition: width 0.8s ease;
  }
  
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .language-item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
  }
  
  .language-name {
    font-weight: 600;
    margin-bottom: 10px;
    color: #2d3748;
    font-size: 16px;
  }
  
  .language-level-container {
    display: flex;
    flex-direction: column;
  }
  
  .language-meter {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  
  .language-level-indicator {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 4px;
  }
  
  .language-level-text {
    color: #6b7280;
    font-size: 13px;
    text-align: right;
  }
  
  .summary p {
    font-size: 16px;
    line-height: 1.8;
    color: #4b5563;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
    border-left: 4px solid #6366f1;
  }
  
  @media print {
    .cv-container {
      box-shadow: none;
      padding: 0;
    }
    
    .experience-card:hover, .formation-card:hover {
      transform: none;
      box-shadow: 0 8px 16px rgba(0,0,0,0.05);
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
      margin-bottom: 30px;
    }
    
    .header-content {
      flex-direction: column;
    }
    
    .contact-info {
      text-align: center;
      margin-top: 20px;
      width: 100%;
    }
    
    .skill-category {
      width: 100%;
    }
    
    .header-row {
      flex-direction: column;
    }
    
    .date-location {
      margin-top: 5px;
    }
  }
  </style>