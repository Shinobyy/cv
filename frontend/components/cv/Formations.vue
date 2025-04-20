<template>
  <div class="formations-container">
    <p class="section-desc">Ajoutez vos diplômes et formations pour mettre en valeur votre parcours académique.</p>

    <div class="formations-list">
      <div v-for="(formation, index) in formations" :key="index" class="formation-item">
        <div class="formation-header">
          <h4>Formation #{{ index + 1 }}</h4>
          <button type="button" class="btn-remove" @click="removeFormation(index)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label :for="`schoolName-${index}`">Établissement</label>
            <input 
              :id="`schoolName-${index}`" 
              class="form-input"
              v-model="formation.schoolName" 
              type="text" 
              placeholder="Ex: Université Paris-Saclay"
              @change="handleSubmit"
            />
            <small class="form-hint">Nom de l'établissement</small>
          </div>
          
          <div class="form-group">
            <label :for="`location-${index}`">Lieu</label>
            <input 
              :id="`location-${index}`" 
              class="form-input"
              v-model="formation.location" 
              type="text" 
              placeholder="Ex: Paris, France"
              @change="handleSubmit"
            />
            <small class="form-hint">Ville ou pays</small>
          </div>
          
          <div class="form-group full-width">
            <label :for="`degree-${index}`">Diplôme/Formation</label>
            <input 
              :id="`degree-${index}`" 
              class="form-input"
              v-model="formation.degree" 
              type="text" 
              placeholder="Ex: Master en Informatique"
              @change="handleSubmit"
            />
            <small class="form-hint">Intitulé du diplôme ou de la formation</small>
          </div>
          
          <div class="form-group">
            <label :for="`startDate-${index}`">Date de début</label>
            <input 
              :id="`startDate-${index}`" 
              class="form-input"
              v-model="formation.startDate" 
              type="date" 
              @change="handleSubmit"
            />
            <small class="form-hint">Début de la formation</small>
          </div>
          
          <div class="form-group">
            <label :for="`endDate-${index}`">Date de fin</label>
            <input 
              :id="`endDate-${index}`" 
              class="form-input"
              v-model="formation.endDate" 
              type="date" 
              @change="handleSubmit"
            />
            <small class="form-hint">Laissez vide si en cours</small>
          </div>
          
          <div class="form-group full-width">
            <label :for="`description-${index}`">Description</label>
            <textarea 
              :id="`description-${index}`" 
              class="form-input form-textarea"
              v-model="formation.description" 
              rows="3"
              placeholder="Ex: Spécialisation en développement web, projet de fin d'études sur..."
              @change="handleSubmit"
            ></textarea>
            <small class="form-hint">Spécialisation, projets importants, mentions, etc.</small>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn-add" @click="addFormation">
        <i class="fas fa-plus-circle"></i> Ajouter une formation
      </button>
    </div>
    
    <div class="preview-box" v-if="formations.length">
      <h4>Aperçu</h4>
      <div class="preview-content">
        <div v-for="(formation, index) in formations" :key="`preview-${index}`" class="preview-formation">
          <div class="preview-header">
            <div class="preview-degree">{{ formation.degree || 'Intitulé du diplôme' }}</div>
            <div class="preview-dates">
              {{ formatDate(formation.startDate) }} - {{ formation.endDate ? formatDate(formation.endDate) : 'Présent' }}
              <span v-if="formation.location">| {{ formation.location }}</span>
            </div>
          </div>
          <div class="preview-school">{{ formation.schoolName || 'Nom de l\'établissement' }}</div>
          <div class="preview-description">{{ formation.description || 'Description de la formation...' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['submit'])

const storedData = useStorage('formations', [])

const formations = reactive(
  storedData.value.length 
    ? [...storedData.value] 
    : [createEmptyFormation()]
)

function createEmptyFormation() {
  return {
    schoolName: '',
    location: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  }
}

function addFormation() {
  formations.push(createEmptyFormation())
  handleSubmit()
}

function removeFormation(index) {
  formations.splice(index, 1)
  
  if (formations.length === 0) {
    formations.push(createEmptyFormation())
  }
  
  handleSubmit()
}

function handleSubmit() {
  storedData.value = [...formations]
  emit('submit', formations)
}

// Format date from YYYY-MM-DD to MM/YYYY
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
}
</script>

<style scoped>
.formations-container {
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

.formations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.formation-item {
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

.formation-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.formation-item::before {
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

.formation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--gray-100);
}

.formation-header h4 {
  margin: 0;
  color: var(--gray-800);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.formation-header h4::before {
  content: '\f19d';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
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

.form-input:hover {
  border-color: var(--gray-400);
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  outline: none;
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

.preview-box h4::after {
  content: '\f06e';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
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

.preview-formation {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed var(--gray-200);
  transition: transform 0.2s ease;
}

.preview-formation:hover {
  transform: translateX(5px);
}

.preview-formation:last-child {
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

.preview-degree {
  font-weight: 700;
  color: var(--primary);
  font-size: 1.1rem;
}

.preview-school {
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: var(--gray-700);
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
  
  .formation-item {
    padding: 1.25rem;
  }
}
</style>