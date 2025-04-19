<template>
    <div>
        <h1>Dashboard user logged in</h1>

        <div>
            <h2>Bienvenue {{ user?.name }}</h2>
            <p>Voici votre tableau de bord.</p>
            <p>Vous pouvez gérer vos CVs et accéder à d'autres fonctionnalités.</p>
        </div>


        <div>
            <h2>
                Mes CVs
            </h2>

            <div>
                <!-- Récup les cv et les afficher -->
                <div v-if="cvs.length === 0">
                    <p>Aucun CV trouvé.</p>
                </div>
                <div v-else>
                    <p>Voici la liste de vos CVs :</p>
                    <ul>
                        <li v-for="cv in cvs" :key="cv.id">
                            <UserCv :cv="cv" />
                        </li>
                    </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { UserCv } from '#components';
import { onMounted, ref } from 'vue';

const { loggedIn, user, logout } = useUserSession();

const cvs = ref([]); // Changer let en const pour une variable réactive

onMounted(() => {
    if (!loggedIn.value) {
        navigateTo('/login');
    }

    getUserData();
    getCvs();
})

async function getUserData() {
    try {
        const response = await $fetch('/api/user');
        console.log('User data:', response);
    } catch (error) {
        console.error('Error fetching user data:', error);
    
        if (error.response?.status === 401) {
            navigateTo('/login')
        }
    }
}

async function getCvs() {
    try {
        const response = await $fetch('/api/cv/user');
        console.log('CVs:', response);
        
        // Assigner les données récupérées à la variable réactive
        if (response && response.cvs) {
            cvs.value = response.cvs; // Ajouter cette ligne
        }
    } catch (error) {
        console.error('Error fetching CVs:', error);
    }
}
</script>

<style>

</style>