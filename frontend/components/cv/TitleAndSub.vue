<template>
    <div class="title-and-sub-container">
      <p class="section-desc">Définissez votre titre professionnel et une accroche percutante pour votre CV.</p>
      
      <div class="form-group">
        <label for="cv-title">Titre professionnel</label>
        <input 
          type="text" 
          id="cv-title" 
          class="form-input"
          placeholder="Ex: Développeur Full Stack JavaScript"
          v-model="titleAndSub.title" 
          @change="handleSubmit"
        >
        <small class="form-hint">Votre titre professionnel principal (5-7 mots max)</small>
      </div>
  
      <div class="form-group">
        <label for="cv-subtitle">Accroche</label>
        <textarea 
          id="cv-subtitle" 
          class="form-input form-textarea"
          placeholder="Ex: Développeur passionné avec 5 ans d'expérience dans la création d'applications web performantes et intuitives."
          v-model="titleAndSub.subtitle" 
          @change="handleSubmit"
          rows="3"
        ></textarea>
        <small class="form-hint">Une courte description qui résume votre profil et vos aspirations (20-30 mots recommandés)</small>
      </div>
      
      <div class="preview-box">
        <h4>Aperçu</h4>
        <div class="preview-content">
          <h2 v-if="titleAndSub.title" class="preview-title">{{ titleAndSub.title }}</h2>
          <p v-else class="preview-placeholder">Votre titre apparaîtra ici</p>
          
          <p v-if="titleAndSub.subtitle" class="preview-subtitle">{{ titleAndSub.subtitle }}</p>
          <p v-else class="preview-placeholder">Votre accroche apparaîtra ici</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useStorage } from '@vueuse/core'
  
  const emit = defineEmits(['submit'])
  
  const storedData = useStorage('titleAndSub', {
    title: '',
    subtitle: ''
  })
  
  const titleAndSub = reactive({
    title: storedData.value.title,
    subtitle: storedData.value.subtitle
  })
  
  const handleSubmit = () => {
    storedData.value = { ...titleAndSub }
    emit('submit', titleAndSub)
  }
  </script>
  
  <style scoped>
  .title-and-sub-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 1.5rem;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .section-title i {
    margin-right: 10px;
  }
  
  .section-desc {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .form-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .form-input:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
    outline: none;
  }
  
  .form-textarea {
    min-height: 80px;
    resize: vertical;
  }
  
  .form-hint {
    display: block;
    margin-top: 0.5rem;
    color: #777;
    font-size: 0.85rem;
  }
  
  .preview-box {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .preview-box h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .preview-content {
    padding: 1.5rem;
    background-color: #f8f8f8;
    border-radius: 4px;
  }
  
  .preview-title {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--secondary-color);
    font-size: 1.5rem;
  }
  
  .preview-subtitle {
    margin: 0;
    color: #555;
    line-height: 1.5;
  }
  
  .preview-placeholder {
    color: #aaa;
    font-style: italic;
  }
  </style>