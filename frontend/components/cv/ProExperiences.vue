<template>
  <div class="pro-experiences-container">
    <p class="section-desc">Ajoutez vos expériences professionnelles les plus pertinentes pour votre candidature.</p>

    <div class="experiences-list">
      <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
        <div class="experience-header">
          <h4><i class="fas fa-briefcase"></i> Expérience #{{ index + 1 }}</h4>
          <button type="button" class="btn-remove" @click="removeExperience(index)" aria-label="Supprimer">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label :for="`companyName-${index}`">Entreprise</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-building input-icon"></i>
              <input 
                :id="`companyName-${index}`" 
                class="form-input with-icon"
                v-model="experience.companyName" 
                type="text" 
                placeholder="Ex: ABC Technologies"
                @change="handleSubmit"
              />
            </div>
            <small class="form-hint">Nom de l'entreprise</small>
          </div>
          
          <div class="form-group">
            <label :for="`location-${index}`">Lieu</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-map-marker-alt input-icon"></i>
              <input 
                :id="`location-${index}`" 
                class="form-input with-icon"
                v-model="experience.location" 
                type="text" 
                placeholder="Ex: Paris, France"
                @change="handleSubmit"
              />
            </div>
            <small class="form-hint">Ville ou pays</small>
          </div>
          
          <div class="form-group">
            <label :for="`startDate-${index}`">Date de début</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-calendar input-icon"></i>
              <input 
                :id="`startDate-${index}`" 
                class="form-input with-icon"
                v-model="experience.startDate" 
                type="date" 
                @change="handleSubmit"
              />
            </div>
            <small class="form-hint">Début de l'expérience</small>
          </div>
          
          <div class="form-group">
            <label :for="`endDate-${index}`">Date de fin</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-calendar-check input-icon"></i>
              <input 
                :id="`endDate-${index}`" 
                class="form-input with-icon"
                v-model="experience.endDate" 
                type="date" 
                @change="handleSubmit"
              />
            </div>
            <small class="form-hint">Laissez vide si emploi actuel</small>
          </div>
          
          <div class="form-group full-width">
            <label :for="`description-${index}`">Description</label>
            <div class="input-icon-wrapper textarea-icon">
              <i class="fas fa-tasks input-icon"></i>
              <textarea 
                :id="`description-${index}`" 
                class="form-input form-textarea with-icon"
                v-model="experience.description" 
                rows="4"
                placeholder="Décrivez vos responsabilités et réalisations principales..."
                @change="handleSubmit"
              ></textarea>
            </div>
            <small class="form-hint">Décrivez vos missions et réalisations</small>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn-add" @click="addExperience">
        <i class="fas fa-plus-circle"></i> Ajouter une expérience
      </button>
    </div>
    
    <div class="preview-box" v-if="experiences.length">
      <h4>Aperçu <i class="fas fa-eye preview-icon"></i></h4>
      <div class="preview-content">
        <div v-for="(exp, index) in experiences" :key="`preview-${index}`" class="preview-experience">
          <div class="preview-header">
            <div class="preview-company">{{ exp.companyName || 'Nom de l\'entreprise' }}</div>
            <div class="preview-dates">
              {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Présent' }}
              <span v-if="exp.location">| {{ exp.location }}</span>
            </div>
          </div>
          <div class="preview-description">{{ exp.description || 'Description de vos responsabilités...' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['submit'])

const storedData = useStorage('proExperiences', [])

const experiences = reactive(
  storedData.value.length 
    ? [...storedData.value] 
    : [createEmptyExperience()]
)

function createEmptyExperience() {
  return {
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  }
}

function addExperience() {
  experiences.push(createEmptyExperience())
  handleSubmit()
}

function removeExperience(index) {
  experiences.splice(index, 1)
  
  if (experiences.length === 0) {
    experiences.push(createEmptyExperience())
  }
  
  handleSubmit()
}

function handleSubmit() {
  storedData.value = [...experiences]
  emit('submit', experiences)
}

// Format date from YYYY-MM-DD to MM/YYYY
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
}
</script>

<style scoped>
.pro-experiences-container {
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

.experiences-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item {
  margin-bottom: 1rem;
  padding: 1.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.experience-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.experience-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--primary), var(--accent));
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--gray-100);
}

.experience-header h4 {
  margin: 0;
  color: var(--gray-800);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.experience-header h4 i {
  color: var(--primary);
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

.textarea-icon .input-icon {
  top: 14px;
  transform: none;
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

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, var(--primary), var(--accent));
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
  margin-top: 0.5rem;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.3);
}

.btn-add i {
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.btn-remove {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background-color: var(--danger);
  color: white;
  transform: rotate(5deg);
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

.preview-experience {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed var(--gray-200);
  transition: transform 0.2s ease;
}

.preview-experience:hover {
  transform: translateX(5px);
}

.preview-experience:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.preview-company {
  font-weight: 700;
  color: var(--primary);
  font-size: 1.1rem;
}

.preview-dates {
  color: var(--gray-600);
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgba(37, 99, 235, 0.07);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

.preview-description {
  line-height: 1.6;
  color: var(--gray-700);
  padding-left: 0.75rem;
  border-left: 2px solid var(--gray-200);
  margin-top: 0.75rem;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .preview-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .experience-item {
    padding: 1.25rem;
  }
}
</style>