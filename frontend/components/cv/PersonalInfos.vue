<template>
    <div class="personal-infos-container">
      <p class="section-desc">Renseignez vos informations de contact essentielles pour votre CV.</p>
      
      <div class="form-grid">
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input 
            id="prenom" 
            class="form-input"
            v-model="personalInfos.prenom" 
            type="text" 
            placeholder="Ex: Jean"
            @change="handleSubmit"
          />
          <small class="form-hint">Votre prénom</small>
        </div>
        
        <div class="form-group">
          <label for="nom">Nom</label>
          <input 
            id="nom" 
            class="form-input"
            v-model="personalInfos.nom" 
            type="text" 
            placeholder="Ex: Dupont"
            @change="handleSubmit"
          />
          <small class="form-hint">Votre nom de famille</small>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            class="form-input"
            v-model="personalInfos.email" 
            type="email" 
            placeholder="Ex: jean.dupont@email.com"
            @change="handleSubmit"
          />
          <small class="form-hint">Votre adresse email professionnelle</small>
        </div>
        
        <div class="form-group">
          <label for="telephone">Téléphone</label>
          <input 
            id="telephone" 
            class="form-input"
            v-model="personalInfos.telephone" 
            type="tel" 
            placeholder="Ex: 06 12 34 56 78"
            @change="handleSubmit"
          />
          <small class="form-hint">Numéro où vous êtes joignable</small>
        </div>
        
        <div class="form-group full-width">
          <label for="adresse">Adresse</label>
          <input 
            id="adresse" 
            class="form-input"
            v-model="personalInfos.adresse" 
            type="text" 
            placeholder="Ex: 123 rue des Exemples, 75000 Paris"
            @change="handleSubmit"
          />
          <small class="form-hint">Votre adresse complète</small>
        </div>
        
        <div class="form-group">
          <label for="dateNaissance">Date de naissance</label>
          <input 
            id="dateNaissance" 
            class="form-input"
            v-model="personalInfos.dateNaissance" 
            type="date" 
            @change="handleSubmit"
          />
          <small class="form-hint">Format JJ/MM/AAAA</small>
        </div>
      </div>
      
      <div class="preview-box">
        <h4>Aperçu</h4>
        <div class="preview-content">
          <div class="preview-name" v-if="personalInfos.prenom || personalInfos.nom">
            {{ personalInfos.prenom }} {{ personalInfos.nom }}
          </div>
          <div class="preview-name preview-placeholder" v-else>Prénom Nom</div>
          
          <div class="preview-contact">
            <div v-if="personalInfos.email">
              <i class="fas fa-envelope"></i> {{ personalInfos.email }}
            </div>
            <div v-if="personalInfos.telephone">
              <i class="fas fa-phone"></i> {{ personalInfos.telephone }}
            </div>
            <div v-if="personalInfos.adresse">
              <i class="fas fa-map-marker-alt"></i> {{ personalInfos.adresse }}
            </div>
            <div v-if="personalInfos.dateNaissance">
              <i class="fas fa-birthday-cake"></i> {{ formatDate(personalInfos.dateNaissance) }}
            </div>
            <div class="preview-placeholder" v-if="!personalInfos.email && !personalInfos.telephone && !personalInfos.adresse && !personalInfos.dateNaissance">
              Vos coordonnées apparaîtront ici
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useStorage } from '@vueuse/core'
  
  const emit = defineEmits(['submit'])
  
  const storedData = useStorage('personalInfos', {
      nom: '',
      prenom: '',
      dateNaissance: '',
      adresse: '',
      telephone: '',
      email: ''
  })
  
  const personalInfos = reactive({
      nom: storedData.value.nom,
      prenom: storedData.value.prenom,
      dateNaissance: storedData.value.dateNaissance,
      adresse: storedData.value.adresse,
      telephone: storedData.value.telephone,
      email: storedData.value.email
  })
  
  const handleSubmit = () => {
      storedData.value = { ...personalInfos }
      emit('submit', personalInfos)
  }
  
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  </script>
  
  <style scoped>
  .personal-infos-container {
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
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
  
  .form-group {
    margin-bottom: 0.5rem;
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
  
  .preview-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }
  
  .preview-contact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  .preview-contact i {
    width: 20px;
    color: var(--accent-color);
    margin-right: 8px;
  }
  
  .preview-placeholder {
    color: #aaa;
    font-style: italic;
  }
  
  @media (max-width: 600px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .preview-contact {
      grid-template-columns: 1fr;
    }
  }
  </style>