<!-- pages/index.vue -->
<template>
  <div class="main-container">
    <header>
      <div class="logo">CV-Builder</div>
      <nav class="desktop-nav">
        <a href="#features">Fonctionnalités</a>
        <a href="#how-it-works">Comment ça marche</a>
        <a href="#pricing">Tarifs</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-buttons">
        <NuxtLink to="/login" class="btn-outline">Connexion</NuxtLink>
        <NuxtLink to="/register" class="btn-primary">Essayer gratuitement</NuxtLink>
      </div>
      <button class="mobile-menu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Créez votre CV <span class="underline">professionnel</span> en quelques minutes</h1>
          <p>Partagez votre CV avec une URL unique, adaptez-le à tous les écrans et téléchargez-le en PDF en un clic.</p>
          <div class="hero-buttons">
            <NuxtLink to="cv/create" class="btn-primary">Créer mon CV</NuxtLink>
          </div>
        </div>
        <div class="hero-image">
          <img src="" alt="CV-Builder Preview" />
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features">
        <h2>Pourquoi choisir CV-Builder ?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>CV Dynamique</h3>
            <p>Créez un CV interactif avec une URL unique à partager avec vos recruteurs.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3>Export PDF</h3>
            <p>Téléchargez instantanément votre CV au format PDF prêt pour l'impression.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3>100% Responsive</h3>
            <p>Votre CV s'adapte parfaitement à tous les appareils, du mobile à l'ordinateur.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3>Templates Pro</h3>
            <p>Choisissez parmi une sélection de designs modernes créés par des experts en recrutement.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3>Suivi des vues</h3>
            <p>Suivez qui consulte votre CV en ligne et combien de temps ils y passent.</p>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section id="how-it-works" class="how-it-works">
        <h2>Comment ça marche</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Créez votre compte</h3>
            <p>Inscrivez-vous gratuitement et accédez immédiatement à tous nos modèles de CV.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Personnalisez votre CV</h3>
            <p>Ajoutez vos informations et personnalisez l'apparence selon vos préférences.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Partagez et exportez</h3>
            <p>Partagez votre URL unique ou téléchargez votre CV en PDF pour vos candidatures.</p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta">
        <h2>Prêt à créer votre CV professionnel ?</h2>
        <p>Rejoignez plus de 10 000 utilisateurs satisfaits et boostez vos chances de décrocher le job de vos rêves.</p>
        <button class="btn-primary">Commencer gratuitement</button>
      </section>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-column">
          <div class="logo">CV-Builder</div>
          <p>Créez des CV professionnels qui se démarquent et augmentez vos chances de décrocher un entretien.</p>
        </div>
        <div class="footer-column">
          <h3>Liens rapides</h3>
          <ul>
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#how-it-works">Comment ça marche</a></li>
            <li><a href="#pricing">Tarifs</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Légal</h3>
          <ul>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Mentions légales</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:contact@cv-builder.com">contact@cv-builder.com</a></li>
            <li><a href="tel:+33612345678">+33 6 12 34 56 78</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        © 2025 CV-Builder. Tous droits réservés.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'CV-Builder - Créez votre CV professionnel en ligne',
      meta: [
        { hid: 'description', name: 'description', content: 'CV-Builder vous permet de créer des CV dynamiques, responsive et téléchargeables en PDF.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cantarell:wght@400;700&display=swap' }
      ]
    }
  }
}
</script>

<style>
:root {
  --primary-color: #F5F2EE;
  --secondary-color: #1a1a1a;
  --accent-color: #FF6B6B;
  --bg-light: #F9F7F5;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Cantarell', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

h1, h2, h3, .logo {
  font-family: 'Archivo Black', sans-serif;
}

/* Layout */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

section {
  padding: 3rem 1.5rem;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: var(--secondary-color);
}

nav a:hover {
  color: var(--accent-color);
}

.desktop-nav {
  display: none;
}

.header-buttons {
  display: none;
}

.mobile-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
}

/* Buttons */
.btn-primary, .btn-outline {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
}

.btn-primary:hover {
  background-color: rgba(26, 26, 26, 0.9);
}

.btn-outline {
  background-color: transparent;
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.btn-outline:hover {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  width: 100%;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero h1 .underline {
  text-decoration: underline;
  text-decoration-color: var(--accent-color);
}

.hero p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.hero-image {
  width: 100%;
}

.hero-image img {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

/* Features Section */
.features {
  background-color: var(--bg-light);
}

section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: var(--primary-color);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.feature-icon {
  background-color: rgba(26, 26, 26, 0.1);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* How It Works Section */
.how-it-works {
  max-width: 1200px;
  margin: 0 auto;
}

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.step {
  text-align: center;
}

.step-number {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: bold;
  font-size: 1.25rem;
}

/* CTA Section */
.cta {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  text-align: center;
}

.cta p {
  max-width: 600px;
  margin: 0 auto 2rem;
}

/* Footer */
footer {
  background-color: var(--bg-light);
  padding: 3rem 1.5rem 1.5rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.footer-column h3 {
  margin-bottom: 1rem;
}

.footer-column ul {
  list-style: none;
}

.footer-column li {
  margin-bottom: 0.5rem;
}

.footer-column a {
  text-decoration: none;
  color: var(--secondary-color);
}

.footer-column a:hover {
  color: var(--accent-color);
}

.copyright {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(26, 26, 26, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  
  .header-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .mobile-menu-btn {
    display: none;
  }
  
  .hero {
    flex-direction: row;
    gap: 2rem;
  }
  
  .hero-content, .hero-image {
    width: 50%;
  }
  
  .hero-content {
    margin-bottom: 0;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .steps {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .footer-content {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .hero h1 {
    font-size: 3rem;
  }
}
</style>