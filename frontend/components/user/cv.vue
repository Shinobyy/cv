<template>
  <div class="cv-card">
    <div class="cv-card-header">
      <div class="title-area">
        <h3 class="cv-title">{{ cv.title }}</h3>
        <span class="cv-date">
          <i class="i-heroicons-calendar-days"></i>
          {{ formatDate(cv.createdAt) }}
        </span>
      </div>
      <div class="cv-badge">CV</div>
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
    <button @click="viewCV" class="action-btn view-btn">
      <i class="i-heroicons-eye"></i>
      Voir
    </button>
    <button @click="editCV" class="action-btn edit-btn">
      <i class="i-heroicons-pencil"></i>
      Éditer
    </button>
    <button @click="confirmDelete" class="action-btn delete-btn">
      <i class="i-heroicons-trash"></i>
      Supprimer
    </button>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showDeleteModal" class="delete-modal-backdrop" @click="showDeleteModal = false">
        <div class="delete-modal" @click.stop>
          <div class="delete-modal-header">
            <i class="i-heroicons-exclamation-triangle text-red-500 text-xl"></i>
            <h3>Confirmer la suppression</h3>
          </div>
          <div class="delete-modal-content">
            <p>Êtes-vous sûr de vouloir supprimer le CV "<span class="font-semibold">{{ cv.title }}</span>" ?</p>
            <p class="text-gray-500 text-sm mt-2">Cette action est irréversible.</p>
          </div>
          <div class="delete-modal-actions">
            <button @click="showDeleteModal = false" class="cancel-btn">
              Annuler
            </button>
            <button @click="deleteCV" class="confirm-delete-btn">
              <i class="i-heroicons-trash mr-1"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  
  </div>
</template>

<script setup>
const props = defineProps({
  cv: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['deleted']);

const showDeleteModal = ref(false);

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
  showDeleteModal.value = true;
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
/* Animations pour le modal */
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Classes de transition Vue */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Modal de suppression */
.delete-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  will-change: opacity;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.delete-modal {
  background-color: white;
  border-radius: var(--radius);
  width: 90%;
  max-width: 450px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transform: translateZ(0);
  will-change: transform, opacity;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.delete-modal-header {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--gray-100);
}

.delete-modal-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0;
}

.delete-modal-content {
  padding: 1.5rem 1.25rem;
}

.delete-modal-actions {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background-color: var(--gray-50);
  border-top: 1px solid var(--gray-100);
}

.cancel-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: white;
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--gray-200);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background-color: var(--gray-50);
  border-color: var(--gray-300);
}

.confirm-delete-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #EF4444;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.confirm-delete-btn:hover {
  background-color: #DC2626;
}

/* Carte CV */
.cv-card {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--gray-100);
}

.cv-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--gray-200);
}

.cv-card-header {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(to right, var(--gray-50), white);
  border-bottom: 1px solid var(--gray-100);
  position: relative;
}

.title-area {
  flex: 1;
}

.cv-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.cv-date {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: var(--gray-500);
}

.cv-date i {
  font-size: 0.95rem;
  opacity: 0.8;
}

.cv-badge {
  position: absolute;
  top: 0;
  right: 1.5rem;
  background-color: var(--primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(20%);
  letter-spacing: 0.05em;
}

.cv-card-content {
  flex: 1;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.personal-info {
  margin-bottom: 1.25rem;
  flex: 1;
}

.full-name {
  font-weight: 600;
  color: var(--gray-800);
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--gray-600);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cv-stats {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-wrap: wrap;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray-50);
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius);
  transition: all 0.2s ease;
  border: 1px solid var(--gray-100);
}

.stat:hover {
  background-color: var(--primary-light);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.stat-count {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--gray-600);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
}

/* Boutons d'action */
.cv-card-actions {
  padding: 1rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  background-color: var(--gray-50);
  border-top: 1px solid var(--gray-100);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.action-btn i {
  font-size: 1rem;
  margin-right: 0.375rem;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.action-btn:active {
  transform: translateY(-1px);
}

/* Styles spécifiques pour chaque type de bouton */
.view-btn {
  background-color: var(--gray-100);
  color: var(--gray-700);
}

.view-btn:hover {
  background-color: var(--gray-200);
  color: var(--gray-800);
}

.edit-btn {
  background-color: var(--primary-light);
  color: var(--primary);
}

.edit-btn:hover {
  background-color: var(--primary-lighter);
  color: var(--primary-dark);
}

.delete-btn {
  background-color: #FEE2E2; /* Rouge clair */
  color: #DC2626; /* Rouge foncé */
}

.delete-btn:hover {
  background-color: #FECACA;
  color: #B91C1C;
}

/* Animation pour les boutons */
@keyframes buttonFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.cv-card-actions .action-btn {
  opacity: 0;
  animation: buttonFadeIn 0.3s forwards;
}

.cv-card-actions .action-btn:nth-child(1) { animation-delay: 0.1s; }
.cv-card-actions .action-btn:nth-child(2) { animation-delay: 0.2s; }
.cv-card-actions .action-btn:nth-child(3) { animation-delay: 0.3s; }

/* Responsive adjustments */
@media (max-width: 640px) {
  .cv-card-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .action-btn {
    flex: 1;
    min-width: 100px;
  }
  
  .cv-stats {
    flex-wrap: wrap;
  }
  
  .stat {
    min-width: 30%;
  }
}
</style>