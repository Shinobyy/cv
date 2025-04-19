<template>
    <div class="cv-card">
      <div class="cv-card-header">
        <h3 class="cv-title">{{ cv.title }}</h3>
        <span class="cv-date">Créé le {{ formatDate(cv.createdAt) }}</span>
      </div>
      
      <div class="cv-card-content">
        <div class="personal-info">
          <p class="full-name">{{ cv.data.personalInfos.prenom }} {{ cv.data.personalInfos.nom }}</p>
          <p class="subtitle">{{ cv.data.titleAndSub.subtitle.substring(0, 70) }}{{ cv.data.titleAndSub.subtitle.length > 70 ? '...' : '' }}</p>
        </div>
        
        <div class="cv-stats">
          <div class="stat">
            <span class="stat-count">{{ cv.data.proExperiences.length }}</span>
            <span class="stat-label">Expériences</span>
          </div>
          <div class="stat">
            <span class="stat-count">{{ cv.data.formations.length }}</span>
            <span class="stat-label">Formations</span>
          </div>
          <div class="stat">
            <span class="stat-count">{{ cv.data.skills.length }}</span>
            <span class="stat-label">Compétences</span>
          </div>
        </div>
      </div>
      
      <div class="cv-card-actions">
        <UButton size="sm" icon="i-heroicons-eye" color="gray" @click="viewCV">Voir</UButton>
        <UButton size="sm" icon="i-heroicons-pencil" color="blue" @click="editCV">Éditer</UButton>
        <UButton size="sm" icon="i-heroicons-trash" color="red" @click="confirmDelete">Supprimer</UButton>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    cv: {
      type: Object,
      required: true
    }
  });
  
  // Format date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
  
  // Navigate to CV view page
  function viewCV() {
    navigateTo(`/cv/${props.cv.id}`);
  }
  
  // Navigate to CV edit page
  function editCV() {
    navigateTo(`/cv/edit/${props.cv.id}`);
  }
  
  // Confirm before deleting the CV
  function confirmDelete() {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le CV "${props.cv.title}" ?`)) {
      deleteCV();
    }
  }
  
  // Delete the CV
  async function deleteCV() {
    try {
      await $fetch(`/api/cv/${props.cv.id}`, {
        method: 'DELETE'
      });
      // Emit event to parent to update the list
      emit('deleted', props.cv.id);
    } catch (error) {
      console.error('Error deleting CV:', error);
      alert('Une erreur est survenue lors de la suppression du CV.');
    }
  }
  </script>
  
  <style scoped>
  .cv-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .cv-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .cv-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  
  .cv-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
  
  .cv-date {
    font-size: 0.8rem;
    color: #666;
  }
  
  .cv-card-content {
    margin-bottom: 16px;
  }
  
  .personal-info {
    margin-bottom: 12px;
  }
  
  .full-name {
    font-weight: 500;
    margin: 0 0 4px 0;
  }
  
  .subtitle {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
    line-height: 1.4;
  }
  
  .cv-stats {
    display: flex;
    gap: 16px;
    margin-top: 12px;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  .stat-count {
    font-size: 1.1rem;
    font-weight: 600;
    color: #0066cc;
  }
  
  .stat-label {
    font-size: 0.7rem;
    color: #666;
  }
  
  .cv-card-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
  </style>