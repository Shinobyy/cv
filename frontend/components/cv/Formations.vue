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

.formation-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.formation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.formation-header h4 {
  margin: 0;
  color: var(--secondary-color);
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

.btn-add {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #333;
}

.btn-add i {
  margin-right: 8px;
}

.btn-remove {
  background-color: #f8f8f8;
  color: #e74c3c;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-remove:hover {
  background-color: #fee;
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

.preview-formation {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.preview-formation:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.preview-degree {
  font-weight: bold;
  color: var(--secondary-color);
  font-size: 1.1rem;
}

.preview-school {
  margin-bottom: 0.5rem;
  font-style: italic;
}

.preview-dates {
  color: #666;
  font-style: italic;
}

.preview-description {
  line-height: 1.5;
  color: #444;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .preview-header {
    flex-direction: column;
  }
  
  .preview-dates {
    margin-top: 0.25rem;
  }
}
</style>