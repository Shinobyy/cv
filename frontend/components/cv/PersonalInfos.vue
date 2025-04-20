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
        <div class="input-icon-wrapper">
          <i class="fas fa-envelope input-icon"></i>
          <input 
            id="email" 
            class="form-input with-icon"
            v-model="personalInfos.email" 
            type="email" 
            placeholder="Ex: jean.dupont@email.com"
            @change="handleSubmit"
          />
        </div>
        <small class="form-hint">Votre adresse email professionnelle</small>
      </div>
      
      <div class="form-group">
        <label for="telephone">Téléphone</label>
        <div class="input-icon-wrapper">
          <i class="fas fa-phone input-icon"></i>
          <input 
            id="telephone" 
            class="form-input with-icon"
            v-model="personalInfos.telephone" 
            type="tel" 
            placeholder="Ex: 06 12 34 56 78"
            @change="handleSubmit"
          />
        </div>
        <small class="form-hint">Numéro où vous êtes joignable</small>
      </div>
      
      <div class="form-group full-width">
        <label for="adresse">Adresse</label>
        <div class="input-icon-wrapper">
          <i class="fas fa-map-marker-alt input-icon"></i>
          <input 
            id="adresse" 
            class="form-input with-icon"
            v-model="personalInfos.adresse" 
            type="text" 
            placeholder="Ex: 123 rue des Exemples, 75000 Paris"
            @change="handleSubmit"
          />
        </div>
        <small class="form-hint">Votre adresse complète</small>
      </div>
      
      <div class="form-group">
        <label for="dateNaissance">Date de naissance</label>
        <div class="input-icon-wrapper">
          <i class="fas fa-calendar-alt input-icon"></i>
          <input 
            id="dateNaissance" 
            class="form-input with-icon"
            v-model="personalInfos.dateNaissance" 
            type="date" 
            @change="handleSubmit"
          />
        </div>
        <small class="form-hint">Format JJ/MM/AAAA</small>
      </div>
    </div>
    
    <div class="preview-box">
      <h4>Aperçu <i class="fas fa-eye preview-icon"></i></h4>
      <div class="preview-content">
        <div class="preview-name" v-if="personalInfos.prenom || personalInfos.nom">
          {{ personalInfos.prenom }} {{ personalInfos.nom }}
        </div>
        <div class="preview-name preview-placeholder" v-else>Prénom Nom</div>
        
        <div class="preview-contact">
          <div v-if="personalInfos.email" class="preview-contact-item">
            <i class="fas fa-envelope"></i> {{ personalInfos.email }}
          </div>
          <div v-if="personalInfos.telephone" class="preview-contact-item">
            <i class="fas fa-phone"></i> {{ personalInfos.telephone }}
          </div>
          <div v-if="personalInfos.adresse" class="preview-contact-item">
            <i class="fas fa-map-marker-alt"></i> {{ personalInfos.adresse }}
          </div>
          <div v-if="personalInfos.dateNaissance" class="preview-contact-item">
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

.section-desc {
  color: var(--gray-700);
  margin-bottom: 1.75rem;
  line-height: 1.6;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  margin-bottom: 1rem;
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
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  font-size: 15px;
  opacity: 0.7;
  transition: all 0.2s ease;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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

.preview-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--gray-900);
}

.preview-contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.preview-contact-item {
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.preview-contact-item:hover {
  transform: translateX(5px);
}

.preview-contact i {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-right: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  padding: 5px;
  font-size: 0.85rem;
}

.preview-placeholder {
  color: var(--gray-400);
  font-style: italic;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .preview-contact {
    grid-template-columns: 1fr;
  }
  
  .preview-content {
    padding: 1.5rem;
  }
}
</style>