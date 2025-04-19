<template>
  <div class="skills-container">
    <p class="section-desc">Ajoutez vos compétences professionnelles et techniques avec leur niveau de maîtrise.</p>

    <div class="skills-list">
      <div v-for="(skill, index) in skills" :key="index" class="skill-item">
        <div class="skill-header">
          <h4>Compétence #{{ index + 1 }}</h4>
          <button type="button" class="btn-remove" @click="removeSkill(index)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label :for="`skillName-${index}`">Compétence</label>
            <input 
              :id="`skillName-${index}`" 
              class="form-input"
              v-model="skill.name" 
              type="text" 
              placeholder="Ex: JavaScript"
              @change="handleSubmit"
            />
            <small class="form-hint">Nom de la compétence</small>
          </div>
          
          <div class="form-group">
            <label :for="`category-${index}`">Catégorie</label>
            <input 
              :id="`category-${index}`" 
              class="form-input"
              v-model="skill.category" 
              type="text" 
              placeholder="Ex: Développement Web"
              @change="handleSubmit"
            />
            <small class="form-hint">Technique, Soft skill, Langue, etc.</small>
          </div>
          
          <div class="form-group full-width">
            <label :for="`level-${index}`">Niveau</label>
            <select 
              :id="`level-${index}`" 
              class="form-input"
              v-model="skill.level" 
              @change="handleSubmit"
            >
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
            <small class="form-hint">Votre niveau de maîtrise</small>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn-add" @click="addSkill">
        <i class="fas fa-plus-circle"></i> Ajouter une compétence
      </button>
    </div>
    
    <div class="preview-box" v-if="skills.length">
      <h4>Aperçu</h4>
      <div class="preview-content">
        <div class="preview-skills-grid">
          <div v-for="(skill, index) in skills" :key="`preview-${index}`" class="preview-skill">
            <div class="preview-skill-name">{{ skill.name || 'Nom de la compétence' }}</div>
            <div class="preview-skill-level">
              <div class="level-indicator" :data-level="skill.level">
                <div 
                  class="level-bar" 
                  :style="{width: getLevelWidth(skill.level)}"
                ></div>
              </div>
              <span class="level-text">{{ skill.level }}</span>
            </div>
            <div v-if="skill.category" class="preview-skill-category">{{ skill.category }}</div>
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

const storedData = useStorage('skills', [])

const skills = reactive(
  storedData.value.length 
    ? [...storedData.value] 
    : [createEmptySkill()]
)

function createEmptySkill() {
  return {
    name: '',
    category: '',
    level: 'Intermédiaire'
  }
}

function addSkill() {
  skills.push(createEmptySkill())
  handleSubmit()
}

function removeSkill(index) {
  skills.splice(index, 1)
  
  if (skills.length === 0) {
    skills.push(createEmptySkill())
  }
  
  handleSubmit()
}

function handleSubmit() {
  storedData.value = [...skills]
  emit('submit', skills)
}

function getLevelWidth(level) {
  switch(level) {
    case 'Débutant': return '25%';
    case 'Intermédiaire': return '50%';
    case 'Avancé': return '75%';
    case 'Expert': return '100%';
    default: return '0%';
  }
}
</script>

<style scoped>
.skills-container {
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

.skill-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.skill-header h4 {
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

.preview-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.preview-skill {
  padding: 1rem;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-skill-name {
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: var(--secondary-color);
}

.preview-skill-category {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
}

.preview-skill-level {
  display: flex;
  align-items: center;
}

.level-indicator {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  flex: 1;
  overflow: hidden;
  margin-right: 8px;
}

.level-bar {
  height: 100%;
  background-color: var(--accent-color);
  border-radius: 4px;
}

.level-text {
  font-size: 0.8rem;
  color: #666;
  width: 75px;
  text-align: right;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .preview-skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>