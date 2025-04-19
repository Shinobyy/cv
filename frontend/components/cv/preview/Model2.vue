<template>
    <div class="cv-container classic">
      <!-- En-tête avec infos personnelles -->
      <div class="cv-header">
        <div class="header-left">
          <h1>{{ personalInfos.prenom }} {{ personalInfos.nom }}</h1>
          <div class="subtitle">{{ titleAndSub.title }}</div>
          <div class="subtext">{{ titleAndSub.subtitle }}</div>
        </div>
        <div class="header-right">
          <div class="photo-container">
            <div class="photo-placeholder">
              <i class="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Contact -->
      <div class="contact-section">
        <div class="contact-item" v-if="personalInfos.telephone">
          <span class="contact-label">Téléphone:</span>
          <span>{{ personalInfos.telephone }}</span>
        </div>
        <div class="contact-item" v-if="personalInfos.email">
          <span class="contact-label">Email:</span>
          <span>{{ personalInfos.email }}</span>
        </div>
        <div class="contact-item" v-if="personalInfos.adresse">
          <span class="contact-label">Adresse:</span>
          <span>{{ personalInfos.adresse }}</span>
        </div>
        <div class="contact-item" v-if="personalInfos.dateNaissance">
          <span class="contact-label">Date de naissance:</span>
          <span>{{ personalInfos.dateNaissance }}</span>
        </div>
      </div>
  
      <!-- Objectif professionnel -->
      <div class="section" v-if="resume">
        <h2>Objectif Professionnel</h2>
        <div class="section-content">
          <p>{{ resume }}</p>
        </div>
      </div>
  
      <!-- Expériences professionnelles -->
      <div class="section" v-if="proExperiences && proExperiences.length">
        <h2>Expériences Professionnelles</h2>
        <div class="section-content">
          <div class="experience-item" v-for="(exp, index) in proExperiences" :key="'exp-'+index">
            <div class="header-row">
              <div class="company-position">
                <div class="position"><strong>{{ exp.position }}</strong></div>
                <div class="company">{{ exp.companyName }}</div>
              </div>
              <div class="date-location">
                <div>{{ exp.startDate }} - {{ exp.endDate || 'Présent' }}</div>
                <div v-if="exp.location">{{ exp.location }}</div>
              </div>
            </div>
            <div class="description">{{ exp.description }}</div>
          </div>
        </div>
      </div>
  
      <!-- Formations -->
      <div class="section" v-if="formations && formations.length">
        <h2>Formations</h2>
        <div class="section-content">
          <div class="formation-item" v-for="(formation, index) in formations" :key="'form-'+index">
            <div class="header-row">
              <div class="school-degree">
                <div class="degree"><strong>{{ formation.degree }}</strong></div>
                <div class="school">{{ formation.schoolName }}</div>
              </div>
              <div class="date-location">
                <div>{{ formation.startDate }} - {{ formation.endDate || 'Présent' }}</div>
                <div v-if="formation.location">{{ formation.location }}</div>
              </div>
            </div>
            <div class="description">{{ formation.description }}</div>
          </div>
        </div>
      </div>
  
      <!-- Compétences -->
      <div class="section" v-if="skills && skills.length">
        <h2>Compétences</h2>
        <div class="section-content">
          <div class="skills-container">
            <template v-if="!hasSkillCategories">
              <table class="skills-table">
                <tr v-for="(skill, index) in skills" :key="'skill-'+index">
                  <td class="skill-name">{{ skill.name }}</td>
                  <td class="skill-level-cell">
                    <div class="skill-dots">
                      <span 
                        v-for="n in 5" 
                        :key="n" 
                        class="skill-dot" 
                        :class="{ 'filled': isSkillLevelFilled(skill.level, n) }"
                      ></span>
                    </div>
                  </td>
                </tr>
              </table>
            </template>
            <template v-else>
              <div class="skill-category" v-for="(categorySkills, category) in groupedSkills" :key="category">
                <h3>{{ category }}</h3>
                <table class="skills-table">
                  <tr v-for="(skill, index) in categorySkills" :key="'skill-cat-'+index">
                    <td class="skill-name">{{ skill.name }}</td>
                    <td class="skill-level-cell">
                      <div class="skill-dots">
                        <span 
                          v-for="n in 5" 
                          :key="n" 
                          class="skill-dot" 
                          :class="{ 'filled': isSkillLevelFilled(skill.level, n) }"
                        ></span>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
          </div>
        </div>
      </div>
  
      <!-- Langues -->
      <div class="section" v-if="languages && languages.length">
        <h2>Langues</h2>
        <div class="section-content">
          <table class="languages-table">
            <tr v-for="(lang, index) in languages" :key="'lang-'+index">
              <td class="language-name">{{ lang.name }}</td>
              <td class="language-level">{{ lang.level }}</td>
            </tr>
          </table>
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
  
  function isSkillLevelFilled(level, dotNumber) {
    const levels = {
      'Débutant': 1,
      'Intermédiaire': 2,
      'Avancé': 4,
      'Expert': 5
    };
    return dotNumber <= (levels[level] || 3);
  }
  </script>
  
  <style scoped>
  .cv-container.classic {
    max-width: 100%;
    margin: 0 auto;
    padding: 40px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    font-family: 'Times New Roman', Times, serif;
    color: #333;
    line-height: 1.6;
  }
  
  .cv-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header-left {
    flex: 3;
  }
  
  .header-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  
  .photo-container {
    width: 120px;
    height: 150px;
    overflow: hidden;
    border: 1px solid #ccc;
  }
  
  .photo-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #ccc;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .subtitle {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .subtext {
    font-size: 16px;
    color: #666;
  }
  
  .contact-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .contact-item {
    flex: 1;
    min-width: 200px;
    margin-bottom: 5px;
  }
  
  .contact-label {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .section {
    margin-bottom: 25px;
  }
  
  h2 {
    font-size: 18px;
    text-transform: uppercase;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
    margin-bottom: 15px;
    letter-spacing: 1px;
  }
  
  .section-content {
    padding-left: 10px;
  }
  
  .experience-item, .formation-item {
    margin-bottom: 20px;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .company-position, .school-degree {
    flex: 3;
  }
  
  .date-location {
    flex: 1;
    text-align: right;
    font-style: italic;
    color: #666;
  }
  
  .position, .degree {
    font-size: 16px;
    margin-bottom: 2px;
  }
  
  .company, .school {
    font-size: 15px;
    margin-bottom: 5px;
  }
  
  .description {
    font-size: 14px;
    text-align: justify;
    color: #444;
  }
  
  .skills-table, .languages-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .skills-table tr, .languages-table tr {
    border-bottom: 1px dotted #ddd;
  }
  
  .skill-name, .language-name {
    padding: 6px 10px 6px 0;
    width: 50%;
  }
  
  .skill-level-cell, .language-level {
    padding: 6px 0;
    text-align: right;
  }
  
  .skill-dots {
    display: inline-flex;
  }
  
  .skill-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #eee;
    border: 1px solid #ccc;
    margin-right: 3px;
  }
  
  .skill-dot.filled {
    background-color: #333;
    border-color: #333;
  }
  
  .skill-category {
    margin-bottom: 15px;
  }
  
  .skill-category h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  @media print {
    .cv-container {
      box-shadow: none;
      padding: 0;
    }
  }
  
  @media (max-width: 768px) {
    .cv-header {
      flex-direction: column-reverse;
      align-items: center;
      text-align: center;
    }
    
    .header-right {
      margin-bottom: 20px;
    }
    
    .contact-section {
      flex-direction: column;
    }
    
    .header-row {
      flex-direction: column;
    }
    
    .date-location {
      text-align: left;
      margin-top: 5px;
    }
  }
  </style>