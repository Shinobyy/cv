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

.section-desc {
  color: var(--gray-700);
  margin-bottom: 1.75rem;
  line-height: 1.6;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
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

.skill-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.skill-item::before {
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

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--gray-100);
}

.skill-header h4 {
  margin: 0;
  color: var(--gray-800);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.skill-header h4::before {
  content: '\f0ad';
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

.preview-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.preview-skill {
  padding: 1.25rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--gray-100);
  display: flex;
  flex-direction: column;
}

.preview-skill:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-color: var(--gray-200);
}

.preview-skill-name {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--primary);
  font-size: 1.1rem;
  position: relative;
  padding-left: 0.5rem;
}

.preview-skill-name::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--primary);
  border-radius: 3px;
}

.preview-skill-level {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.level-indicator {
  height: 10px;
  background-color: var(--gray-100);
  border-radius: 10px;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
  position: relative;
}

.level-bar {
  height: 100%;
  background: linear-gradient(to right, var(--primary), var(--accent));
  border-radius: 10px;
  transition: width 0.5s ease;
}

.level-text {
  font-size: 0.85rem;
  color: var(--gray-600);
  width: 90px;
  text-align: right;
  font-weight: 500;
}

.preview-skill-category {
  font-size: 0.85rem;
  color: var(--gray-600);
  margin-top: 0.75rem;
  font-style: italic;
  align-self: flex-end;
  background-color: var(--gray-50);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .preview-skills-grid {
    grid-template-columns: 1fr;
  }
  
  .skill-item {
    padding: 1.25rem;
  }
}
</style>