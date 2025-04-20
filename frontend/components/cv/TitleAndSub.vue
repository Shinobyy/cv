<template>
  <div class="title-and-sub-container">
    <p class="section-desc">Définissez votre titre professionnel et une accroche percutante pour votre CV.</p>
    
    <div class="form-group">
      <label for="cv-title">Titre professionnel</label>
      <div class="input-icon-wrapper">
        <i class="fas fa-heading input-icon"></i>
        <input 
          type="text" 
          id="cv-title" 
          class="form-input with-icon"
          placeholder="Ex: Développeur Full Stack JavaScript"
          v-model="titleAndSub.title" 
          @change="handleSubmit"
        >
      </div>
      <small class="form-hint">Votre titre professionnel principal (5-7 mots max)</small>
    </div>

    <div class="form-group">
      <label for="cv-subtitle">Accroche</label>
      <div class="input-icon-wrapper textarea-icon">
        <i class="fas fa-quote-left input-icon"></i>
        <textarea 
          id="cv-subtitle" 
          class="form-input form-textarea with-icon"
          placeholder="Ex: Développeur passionné avec 5 ans d'expérience dans la création d'applications web performantes et intuitives."
          v-model="titleAndSub.subtitle" 
          @change="handleSubmit"
          rows="3"
        ></textarea>
      </div>
      <small class="form-hint">Une courte description qui résume votre profil et vos aspirations (20-30 mots recommandés)</small>
    </div>
    
    <div class="preview-box">
      <h4>Aperçu <i class="fas fa-eye preview-icon"></i></h4>
      <div class="preview-content">
        <h2 v-if="titleAndSub.title" class="preview-title">{{ titleAndSub.title }}</h2>
        <div v-else class="preview-placeholder preview-title-placeholder">Votre titre apparaîtra ici</div>
        
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
  
  .section-desc {
    color: var(--gray-700);
    margin-bottom: 1.75rem;
    line-height: 1.6;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--gray-100);
  }
  
  .form-group {
    margin-bottom: 2rem;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .form-group:hover {
    transform: translateY(-2px);
  }
  
  label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: var(--gray-800);
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  label::before {
    content: '';
    width: 3px;
    height: 16px;
    background-color: var(--primary);
    border-radius: 2px;
    display: inline-block;
  }
  
  .input-icon-wrapper {
    position: relative;
    border-radius: var(--radius);
    transition: all 0.2s ease;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .input-icon-wrapper:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
  
  .input-icon {
    position: absolute;
    left: 14px;
    top: 16px;
    color: var(--primary);
    font-size: 15px;
    opacity: 0.7;
    transition: all 0.2s ease;
  }
  
  .textarea-icon .input-icon {
    top: 14px;
  }
  
  .form-input {
    width: 100%;
    padding: 0.9rem 1.2rem;
    font-size: 0.95rem;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius);
    transition: all 0.3s ease;
    color: var(--gray-800);
    background-color: white;
  }
  
  .form-input.with-icon {
    padding-left: 2.8rem;
  }
  
  .form-input:hover {
    border-color: var(--gray-400);
  }
  
  .form-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    outline: none;
  }
  
  .form-input:focus + .input-icon {
    color: var(--primary);
    opacity: 1;
  }
  
  .form-textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
  }
  
  .form-hint {
    display: block;
    margin-top: 0.75rem;
    color: var(--gray-500);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-hint::before {
    content: '\f05a';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: 0.8rem;
    color: var(--primary);
    opacity: 0.6;
  }
  
  .preview-box {
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid var(--gray-100);
    position: relative;
  }
  
  .preview-box:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
  
  .preview-box h4 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
    color: var(--gray-800);
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  
  .preview-icon {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: var(--primary);
    opacity: 0.8;
  }
  
  .preview-content {
    padding: 2rem;
    background-color: var(--gray-50);
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .preview-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--primary), var(--accent));
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .preview-content:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
  
  .preview-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--gray-900);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .preview-title-placeholder {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  .preview-subtitle {
    margin: 0;
    color: var(--gray-700);
    line-height: 1.7;
    font-size: 1.05rem;
  }
  
  .preview-placeholder {
    color: var(--gray-400);
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .preview-box {
      margin-top: 2rem;
    }
    
    .preview-content {
      padding: 1.5rem;
    }
    
    .preview-title {
      font-size: 1.5rem;
    }
    
    .preview-title-placeholder {
      font-size: 1.5rem;
    }
  }
  </style>