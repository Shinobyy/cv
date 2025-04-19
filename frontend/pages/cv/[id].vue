<!-- filepath: c:\dev\perspective\cv-builder\frontend\pages\cv\[id].vue -->
<template>
    <div v-if="isLoading" class="loading">
      <p>Chargement du CV...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <h2>Erreur</h2>
      <p>{{ error }}</p>
      <button @click="$router.push('/cv/create')">Créer un nouveau CV</button>
    </div>
    
    <div v-else class="cv-container">
      <div class="cv-actions">
        <button @click="printCV" class="print-button">
          <i class="fas fa-print"></i> Imprimer
        </button>
        <button @click="$router.push('/cv/create')" class="new-button">
          <i class="fas fa-plus"></i> Nouveau CV
        </button>
        <button @click="generateQRCode" class="new-button">
            <i class="fas fa-qrcode"></i>
            Générer un QR Code
        </button>
      </div>
      
      <CvPreview
        :modelChosen="cvData.selectedModel || 'model1'"
        :personal-infos="cvData.personalInfos"
        :title-and-sub="cvData.titleAndSub"
        :pro-experiences="cvData.proExperiences"
        :formations="cvData.formations"
        :skills="cvData.skills"
      />

      <div v-if="showQRModal" class="qr-modal">
    <div class="qr-modal-content">
      <div class="qr-modal-header">
        <h3>Scannez ce code pour accéder au CV</h3>
        <button @click="showQRModal = false" class="close-button">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="qr-modal-body">
        <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code du CV" />
        <p>Partagez ce QR code pour permettre à d'autres personnes d'accéder à votre CV.</p>
      </div>
      <div class="qr-modal-footer">
        <button @click="downloadQRCode" class="download-button">
          <i class="fas fa-download"></i> Télécharger
        </button>
        <button @click="showQRModal = false" class="close-button-text">
          Fermer
        </button>
      </div>
    </div>
  </div>

    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import QRCode from 'qrcode';

  const route = useRoute();
  const cvId = route.params.id;
  const cvData = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  const showQRModal = ref(false);
  const qrCodeUrl = ref('');


  onMounted(async () => {
  try {
    console.log(`Fetching CV with ID: ${cvId}`);

    const { data, error: fetchError } = await useFetch(`/api/cv/${cvId}`);

    console.log("API Response:", data.value);

    if (fetchError.value) {
      error.value = "Impossible de charger le CV demandé.";
      console.error("Fetch error:", fetchError.value);
    } else if (!data.value) {
      error.value = "Aucune donnée reçue de l'API.";
    } else if (data.value.status === 404) {
      error.value = "CV introuvable. Il a peut-être été supprimé ou l'URL est incorrecte.";
    } else if (!data.value.personalInfos) {
      // Vérification plus précise pour s'assurer qu'il s'agit bien d'un CV
      error.value = "Les données reçues ne correspondent pas à un CV valide.";
      console.log("Invalid CV data:", data.value);
    } else {
      cvData.value = data.value;
      console.log("CV data loaded successfully");
    }
  } catch (e) {
    error.value = "Une erreur est survenue lors du chargement du CV.";
    console.error("Exception:", e);
  } finally {
    isLoading.value = false;
  }
});

  const printCV = () => {
    window.print();
  };

  const generateQRCode = async () => {
    try {
        const currentUrl = window.location.href;

        const url = await QRCode.toDataURL(currentUrl, {
            width: 300,
            margin: 2,
            color: {
                dark: '#333333', // QR code color
                light: '#FFFFFF' // Background color
            }
        })

        qrCodeUrl.value = url;

        showQRModal.value = true;
    } catch (e) {
      console.error("Error generating QR code:", e);
        alert("Une erreur est survenue lors de la génération du QR code.");
    }
  }




  const downloadQRCode = () => {
    if (!qrCodeUrl.value) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl.value;
    link.download = `cv_${cvId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  </script>

  <style scoped>
  .cv-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .cv-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  .print-button, .new-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  
  .print-button {
    background-color: var(--accent-color);
    color: white;
  }
  
  .new-button {
    background-color: var(--secondary-color);
    color: white;
  }
  
  .print-button i, .new-button i {
    margin-right: 8px;
  }
  
  .loading, .error {
    padding: 40px;
    text-align: center;
  }
  
  .error button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  @media print {
    .cv-actions {
      display: none;
    }
  }


  .qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.qr-modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.qr-modal-header h3 {
  margin: 0;
  color: var(--secondary-color);
}

.qr-modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.qr-modal-body img {
  margin-bottom: 15px;
  max-width: 100%;
}

.qr-modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.download-button {
  padding: 8px 16px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.download-button i {
  margin-right: 8px;
}

.close-button-text {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

  </style>