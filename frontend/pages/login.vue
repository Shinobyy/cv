<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})
const loading = ref(false)
const error = ref('')

async function login() {
  error.value = ''
  loading.value = true
  
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })

    if (!response) {
      error.value = 'Une erreur est survenue. Veuillez réessayer.'
      return
    } else {
      // Store the user data in the session
      user.value = response.user
      loggedIn.value = true
    }
    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/dashboard')
  } catch (err) {
    error.value = 'Identifiants invalides. Veuillez réessayer.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (loggedIn.value) {
    navigateTo('/dashboard')
  }
})
</script>


<template>
  <div class="login-page">
    <div class="background-design">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>
    
    <div class="login-container">
      <div class="login-header">
        <div class="logo-area">
          <i class="fa-solid fa-file-lines logo-icon"></i>
          <h1 class="logo-text">CV Builder</h1>
        </div>
        <p class="login-subtitle">Créez des CV professionnels en quelques clics</p>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Connexion</h2>
          <p class="welcome-text">Heureux de vous revoir !</p>
        </div>
        
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">Adresse email</label>
            <div class="input-wrapper">
              <i class="fa-solid fa-envelope input-icon"></i>
              <input 
                id="email"
                v-model="credentials.email" 
                type="email" 
                placeholder="votre@email.com"
                required
                autocomplete="email"
              />
            </div>
          </div>
          
          <div class="form-group">
            <div class="label-row">
              <label for="password">Mot de passe</label>
              <a href="/forgot-password" class="forgot-link">Mot de passe oublié?</a>
            </div>
            <div class="input-wrapper">
              <i class="fa-solid fa-lock input-icon"></i>
              <input 
                id="password"
                v-model="credentials.password" 
                type="password" 
                placeholder="Votre mot de passe"
                required
                autocomplete="current-password"
              />
            </div>
          </div>
          
          <div class="remember-me">
            <label class="checkbox-container">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Se souvenir de moi
            </label>
          </div>
          
          <div v-if="error" class="error-message">
            <i class="fa-solid fa-circle-exclamation"></i>
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            class="submit-btn"
            :class="{ 'loading': loading }"
            :disabled="loading"
          >
            <span v-if="!loading">Se connecter</span>
            <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
          </button>
        </form>
        
        <div class="card-divider">
          <span class="divider-text">OU</span>
        </div>
        
        <div class="social-login">
          <button class="social-btn google-btn">
            <i class="fa-brands fa-google"></i>
            Continuer avec Google
          </button>
        </div>
        
        <div class="card-footer">
          <p>Pas encore de compte? <a href="/register" class="signup-link">S'inscrire</a></p>
        </div>
      </div>
      
      <div class="login-features">
        <div class="feature">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Sécurisé</span>
        </div>
        <div class="feature">
          <i class="fa-solid fa-bolt"></i>
          <span>Rapide</span>
        </div>
        <div class="feature">
          <i class="fa-solid fa-cloud"></i>
          <span>Dans le cloud</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Correction du box-sizing pour empêcher les débordements */
* {
  box-sizing: border-box;
}

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

/* Formes décoratives en arrière-plan */
.background-design {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -150px;
  left: -150px;
  animation: float 8s infinite ease-in-out;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  right: -100px;
  animation: float 10s infinite ease-in-out reverse;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 60%;
  left: 10%;
  animation: float 12s infinite ease-in-out;
}

.shape-4 {
  width: 150px;
  height: 150px;
  top: 10%;
  right: 20%;
  animation: float 9s infinite ease-in-out reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.login-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.login-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.logo-icon {
  font-size: 2rem;
  color: var(--primary);
  filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.3));
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
}

.login-subtitle {
  font-size: 1rem;
  color: var(--gray-600);
  margin: 0;
}

.card {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  border: 1px solid var(--gray-100);
  position: relative;
}

/* Effet de bordure brillante */
.card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary), var(--accent), var(--primary));
  z-index: -1;
  border-radius: calc(var(--radius) + 2px);
  opacity: 0.5;
  filter: blur(5px);
}

.card-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 0.5rem 0;
}

.welcome-text {
  color: var(--gray-600);
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--gray-700);
}

.forgot-link {
  font-size: 0.8rem;
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: white;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

input:focus + .input-icon {
  color: var(--primary);
}

input::placeholder {
  color: var(--gray-400);
}

/* Case à cocher stylisée */
.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--gray-700);
  user-select: none;
  position: relative;
  padding-left: 28px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  background-color: white;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: var(--primary-light);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.submit-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
  border: none;
  border-radius: var(--radius);
  padding: 0.95rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: left 0.7s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(37, 99, 235, 0.35);
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
}

.submit-btn.loading {
  background: var(--primary-hover);
  cursor: not-allowed;
  opacity: 0.8;
}

/* Séparateur avec texte "OU" */
.card-divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.card-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--gray-200);
}

.divider-text {
  background-color: white;
  padding: 0 1rem;
  position: relative;
  color: var(--gray-500);
  font-size: 0.85rem;
  font-weight: 500;
}

/* Bouton de connexion sociale */
.social-login {
  margin-bottom: 1.5rem;
}

.social-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  border: 1px solid var(--gray-200);
  color: var(--gray-800);
}

.social-btn:hover {
  background-color: var(--gray-50);
  border-color: var(--gray-300);
  transform: translateY(-2px);
}

.social-btn i {
  font-size: 1.1rem;
}

.google-btn i {
  color: #DB4437;
}

.card-footer {
  text-align: center;
  color: var(--gray-600);
  font-size: 0.9rem;
}

.signup-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.login-features {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100px;
  color: var(--gray-600);
  font-size: 0.85rem;
}

.feature i {
  font-size: 1.25rem;
  background: linear-gradient(135deg, white 0%, var(--gray-50) 100%);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  color: var(--primary);
  transition: all 0.3s ease;
}

.feature:hover i {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  color: var(--accent);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .card {
    padding: 1.5rem;
  }
  
  .login-features {
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .feature {
    flex: 0 0 25%;
  }
  
  /* Réduire la taille des formes en arrière-plan */
  .shape-1 {
    width: 200px;
    height: 200px;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
  }
  
  .shape-3, .shape-4 {
    display: none;
  }
}
</style>