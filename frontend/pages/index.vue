<template>
  <div class="main-container">
    <!-- Formes décoratives en arrière-plan -->
    <div class="background-design">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
    </div>

    <!-- Header -->
    <header class="site-header" :class="{ 'scrolled': scrolled }">
      <div class="header-container">
        <div class="logo-area">
          <i class="fa-solid fa-file-lines logo-icon"></i>
          <div class="logo-text">CV Builder</div>
        </div>
        
        <nav class="desktop-nav">
          <a href="#features" class="nav-link">
            <i class="fa-solid fa-star-of-life"></i>
            <span>Fonctionnalités</span>
          </a>
          <a href="#how-it-works" class="nav-link">
            <i class="fa-solid fa-diagram-project"></i>
            <span>Comment ça marche</span>
          </a>
          <a href="#pricing" class="nav-link">
            <i class="fa-solid fa-tag"></i>
            <span>Tarifs</span>
          </a>
          <a href="#faq" class="nav-link">
            <i class="fa-solid fa-circle-question"></i>
            <span>FAQ</span>
          </a>
        </nav>
        
        <div class="header-buttons">
          <NuxtLink to="/login" class="btn-outline">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Connexion</span>
          </NuxtLink>
          <NuxtLink to="/register" class="btn-primary">
            <i class="fa-solid fa-user-plus"></i>
            <span>Essayer gratuitement</span>
          </NuxtLink>
        </div>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fa-solid fa-bars" v-if="!mobileMenuOpen"></i>
          <i class="fa-solid fa-xmark" v-else></i>
        </button>
      </div>
      
      <!-- Menu mobile -->
      <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
        <nav class="mobile-nav">
          <a href="#features" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fa-solid fa-star-of-life"></i>
            <span>Fonctionnalités</span>
          </a>
          <a href="#how-it-works" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fa-solid fa-diagram-project"></i>
            <span>Comment ça marche</span>
          </a>
          <a href="#pricing" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fa-solid fa-tag"></i>
            <span>Tarifs</span>
          </a>
          <a href="#faq" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fa-solid fa-circle-question"></i>
            <span>FAQ</span>
          </a>
          <div class="mobile-buttons">
            <NuxtLink to="/login" class="btn-outline" @click="closeMobileMenu">
              <i class="fa-solid fa-right-to-bracket"></i>
              <span>Connexion</span>
            </NuxtLink>
            <NuxtLink to="/register" class="btn-primary" @click="closeMobileMenu">
              <i class="fa-solid fa-user-plus"></i>
              <span>Inscription</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Créez votre CV <span class="highlight">professionnel</span> en quelques minutes
          </h1>
          <p class="hero-subtitle">
            Partagez votre CV avec une URL unique, adaptez-le à tous les écrans et téléchargez-le en PDF en un clic.
          </p>
          <div class="hero-buttons">
            <NuxtLink to="/cv/create" class="cta-button">
              <span>Créer mon CV</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
            <a href="#features" class="learn-more-link">
              <span>En savoir plus</span>
              <i class="fa-solid fa-arrow-down"></i>
            </a>
          </div>
        </div>
        
        <div class="hero-image-container">
          <div class="image-decoration"></div>
          <img src="" alt="CV-Builder Preview" class="hero-image" />
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features">
        <div class="section-header">
          <h2>Pourquoi choisir CV-Builder ?</h2>
          <p class="section-subtitle">Découvrez nos fonctionnalités qui font la différence</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-link"></i>
            </div>
            <div class="feature-content">
              <h3>CV Dynamique</h3>
              <p>Créez un CV interactif avec une URL unique à partager avec vos recruteurs.</p>
            </div>
            <div class="feature-decoration"></div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-file-pdf"></i>
            </div>
            <div class="feature-content">
              <h3>Export PDF</h3>
              <p>Téléchargez instantanément votre CV au format PDF prêt pour l'impression.</p>
            </div>
            <div class="feature-decoration"></div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-mobile-screen"></i>
            </div>
            <div class="feature-content">
              <h3>100% Responsive</h3>
              <p>Votre CV s'adapte parfaitement à tous les appareils, du mobile à l'ordinateur.</p>
            </div>
            <div class="feature-decoration"></div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-palette"></i>
            </div>
            <div class="feature-content">
              <h3>Templates Pro</h3>
              <p>Choisissez parmi une sélection de designs modernes créés par des experts en recrutement.</p>
            </div>
            <div class="feature-decoration"></div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div class="feature-content">
              <h3>Suivi des vues</h3>
              <p>Suivez qui consulte votre CV en ligne et combien de temps ils y passent.</p>
            </div>
            <div class="feature-decoration"></div>
          </div>
          
        </div>
      </section>

      <!-- How It Works Section -->
      <section id="how-it-works" class="how-it-works">
        <div class="section-header">
          <h2>Comment ça marche</h2>
          <p class="section-subtitle">En seulement trois étapes simples</p>
        </div>
        
        <div class="steps-container">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon">
              <i class="fa-solid fa-user-plus"></i>
            </div>
            <h3>Créez votre compte</h3>
            <p>Inscrivez-vous gratuitement et accédez immédiatement à tous nos modèles de CV.</p>
            <div class="step-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <h3>Personnalisez votre CV</h3>
            <p>Ajoutez vos informations et personnalisez l'apparence selon vos préférences.</p>
            <div class="step-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon">
              <i class="fa-solid fa-share-from-square"></i>
            </div>
            <h3>Partagez et exportez</h3>
            <p>Partagez votre URL unique ou téléchargez votre CV en PDF pour vos candidatures.</p>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials">
        <div class="section-header">
          <h2>Ce que disent nos utilisateurs</h2>
          <p class="section-subtitle">Des milliers de personnes ont déjà trouvé un emploi grâce à nous</p>
        </div>
        
        <div class="testimonial-slider">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"J'ai décroché un entretien dès ma première candidature grâce à mon nouveau CV. Le design professionnel a vraiment fait la différence."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>SM</span>
              </div>
              <div class="author-info">
                <h4>Sophie Martin</h4>
                <p>Développeuse Web</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"L'export PDF est impeccable, et j'adore pouvoir partager mon CV en ligne avec une simple URL. Très pratique!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>TD</span>
              </div>
              <div class="author-info">
                <h4>Thomas Dubois</h4>
                <p>Chef de Projet</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"J'utilisais des templates Word depuis des années. Quelle différence! Mon CV se démarque vraiment maintenant."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>JR</span>
              </div>
              <div class="author-info">
                <h4>Julie Roux</h4>
                <p>Graphiste</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section">
        <div class="cta-container">
          <h2>Prêt à créer votre CV professionnel ?</h2>
          <p>Rejoignez plus de 10 000 utilisateurs satisfaits et boostez vos chances de décrocher le job de vos rêves.</p>
          <div class="cta-buttons">
            <NuxtLink to="/register" class="cta-button">
              <span>Commencer gratuitement</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
            <NuxtLink to="/templates" class="secondary-button">
              <span>Voir les templates</span>
              <i class="fa-solid fa-eye"></i>
            </NuxtLink>
          </div>
          <div class="cta-features">
            <div class="mini-feature">
              <i class="fa-solid fa-check"></i>
              <span>Sans carte bancaire</span>
            </div>
            <div class="mini-feature">
              <i class="fa-solid fa-check"></i>
              <span>Annulation facile</span>
            </div>
            <div class="mini-feature">
              <i class="fa-solid fa-check"></i>
              <span>Support 7j/7</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-column primary-column">
          <div class="logo-area">
            <i class="fa-solid fa-file-lines logo-icon"></i>
            <div class="logo-text">CV Builder</div>
          </div>
          <p>Créez des CV professionnels qui se démarquent et augmentez vos chances de décrocher un entretien.</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
        
        <div class="footer-column">
          <h3>Liens rapides</h3>
          <ul class="footer-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#how-it-works">Comment ça marche</a></li>
            <li><a href="#pricing">Tarifs</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/templates">Templates</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Légal</h3>
          <ul class="footer-links">
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Contact</h3>
          <ul class="contact-info">
            <li>
              <i class="fa-solid fa-envelope"></i>
              <a href="mailto:contact@cv-builder.com">contact@cv-builder.com</a>
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              <a href="tel:+33612345678">+33 6 12 34 56 78</a>
            </li>
            <li>
              <i class="fa-solid fa-location-dot"></i>
              <span>Paris, France</span>
            </li>
          </ul>
          <div class="newsletter">
            <h4>Newsletter</h4>
            <form class="newsletter-form">
              <input type="email" placeholder="Votre email" />
              <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="copyright">
        <p>© 2025 CV-Builder. Tous droits réservés.</p>
        <div class="payment-methods">
          <i class="fa-brands fa-cc-visa"></i>
          <i class="fa-brands fa-cc-mastercard"></i>
          <i class="fa-brands fa-cc-paypal"></i>
          <i class="fa-brands fa-cc-apple-pay"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);
const scrolled = ref(false);

// Détecter le défilement pour changer l'apparence du header
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  scrolled.value = window.scrollY > 30;
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
}
</script>

<style scoped>
/* Styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Cantarell', sans-serif;
  line-height: 1.6;
  color: var(--gray-800);
  background-color: white;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

/* Formes décoratives en arrière-plan */
.background-design {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
}

.shape-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -200px;
  animation: float 15s infinite ease-in-out;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  right: -150px;
  animation: float 20s infinite ease-in-out reverse;
}

.shape-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 5%;
  animation: float 18s infinite ease-in-out;
}

.shape-4 {
  width: 250px;
  height: 250px;
  top: 25%;
  right: 10%;
  animation: float 12s infinite ease-in-out reverse;
}

.shape-5 {
  width: 350px;
  height: 350px;
  bottom: 5%;
  left: 30%;
  animation: float 25s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.site-header.scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.98);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo dans le header */
.logo-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--primary);
  filter: drop-shadow(0 2px 3px rgba(37, 99, 235, 0.2));
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Navigation desktop */
.desktop-nav {
  display: none;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: var(--gray-700);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: var(--radius);
  font-size: 0.95rem;
}

.nav-link:hover {
  color: var(--primary);
  background-color: var(--primary-light);
  transform: translateY(-2px);
}

.nav-link i {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Boutons du header */
.header-buttons {
  display: none;
}

.btn-outline, .btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.btn-outline {
  color: var(--primary);
  border: 1px solid var(--primary-light);
  background-color: white;
}

.btn-outline:hover {
  background-color: var(--primary-light);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover {
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.3);
  transform: translateY(-2px);
}

/* Bouton menu mobile */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--primary-light);
  color: var(--primary);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.25rem;
}

.mobile-menu-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: rotate(90deg);
}

/* Menu mobile */
.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: white;
  z-index: 99;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.1);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-nav {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--gray-800);
  text-decoration: none;
  border-radius: var(--radius);
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.mobile-nav-link:hover {
  background-color: var(--primary-light);
  border-left-color: var(--primary);
  color: var(--primary);
}

.mobile-nav-link i {
  font-size: 1.1rem;
  width: 1.5rem;
  text-align: center;
}

.mobile-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-100);
}

/* Hero Section */
.hero {
  padding: 8rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  gap: 3rem;
}

.hero-content {
  width: 100%;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-title .highlight {
  position: relative;
  color: var(--primary);
}

.hero-title .highlight::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: 3px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--gray-600);
  max-width: 700px;
  margin: 0 auto 2rem;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.25);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
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

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
}

.cta-button:hover::before {
  left: 100%;
}

.learn-more-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-600);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  padding: 0.5rem 1rem;
}

.learn-more-link:hover {
  color: var(--primary);
  transform: translateY(-2px);
}

.learn-more-link i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.learn-more-link:hover i {
  transform: translateY(3px);
}

.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.image-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--accent) 100%);
  border-radius: 10px;
  z-index: -1;
  opacity: 0.5;
}

.hero-image {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.hero-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.floating-badge {
  position: absolute;
  top: -15px;
  right: 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 15px rgba(16, 185, 129, 0.25);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Sections communes */
section {
  padding: 5rem 1.5rem;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.section-header h2 {
  font-size: 2.25rem;
  color: var(--gray-900);
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--gray-600);
}

/* Features Section */
.features {
  background-color: var(--gray-50);
  position: relative;
}

.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, white, var(--gray-50));
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: white;
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--gray-100);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.feature-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.15);
  position: relative;
  z-index: 1;
}

.feature-content h3 {
  font-size: 1.25rem;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.feature-content p {
  color: var(--gray-600);
  line-height: 1.6;
}

.feature-decoration {
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--primary-light) 0%, rgba(255,255,255,0) 70%);
  opacity: 0.3;
  border-radius: 50%;
  z-index: 0;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-decoration {
  transform: scale(1.2);
  opacity: 0.5;
}

/* How It Works Section */
.how-it-works {
  position: relative;
  overflow: hidden;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.step-card {
  background-color: white;
  border-radius: var(--radius);
  padding: 2rem;
  border: 1px solid var(--gray-100);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.2);
}

.step-icon {
  width: 4rem;
  height: 4rem;
  background-color: var(--primary-light);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  transition: all 0.3s ease;
}

.step-card:hover .step-icon {
  background-color: var(--primary);
  color: white;
  transform: rotateY(360deg);
  transition: all 0.5s ease;
}

.step-card h3 {
  font-size: 1.25rem;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.step-card p {
  color: var(--gray-600);
  margin-bottom: 1rem;
}

.step-arrow {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--gray-400);
  font-size: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

/* Testimonials */
.testimonials {
  background-color: var(--gray-50);
  position: relative;
}

.testimonial-slider {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: white;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--gray-100);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.testimonial-content {
  padding: 2rem;
  position: relative;
}

.testimonial-content::before {
  content: '\201C';
  font-size: 5rem;
  position: absolute;
  top: -20px;
  left: 10px;
  color: var(--primary-light);
  opacity: 0.5;
  font-family: serif;
}

.testimonial-content p {
  color: var(--gray-700);
  font-style: italic;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background-color: var(--gray-50);
  border-top: 1px solid var(--gray-100);
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-info h4 {
  font-size: 1rem;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.author-info p {
  font-size: 0.9rem;
  color: var(--gray-600);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.075)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.cta-container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 2rem 1.5rem;
}

.cta-section h2 {
  font-size: 2.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.secondary-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
}

.cta-features {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
}

.mini-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
}

.mini-feature i {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

/* Footer */
.site-footer {
  background-color: var(--gray-900);
  color: var(--gray-300);
  padding-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.primary-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-column h3 {
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--gray-800);
  color: var(--gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.social-link:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-5px);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--gray-400);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: white;
  transform: translateX(5px);
}

.contact-info {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-info li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-info i {
  color: var(--primary);
  font-size: 1rem;
  width: 1.5rem;
}

.contact-info a {
  color: var(--gray-400);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: white;
}

.newsletter {
  margin-top: 2rem;
}

.newsletter h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: none;
  background-color: var(--gray-800);
  color: white;
}

.newsletter-form input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary);
}

.newsletter-form button {
  width: 3rem;
  border-radius: var(--radius);
  border: none;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid var(--gray-800);
  color: var(--gray-500);
  font-size: 0.9rem;
}

.payment-methods {
  display: flex;
  gap: 1rem;
  color: var(--gray-500);
  font-size: 1.5rem;
}

/* Responsive Styles */
@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonial-slider {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .testimonial-card {
    flex: 0 0 calc(50% - 1rem);
  }
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
    gap: 0.5rem;
  }
  
  .header-buttons {
    display: flex;
    gap: 0.75rem;
  }
  
  .mobile-menu-btn {
    display: none;
  }
  
  .hero {
    flex-direction: row;
    align-items: center;
    padding-top: 10rem;
  }
  
  .hero-content {
    flex: 1;
    text-align: left;
  }
  
  .hero-buttons {
    justify-content: flex-start;
  }
  
  .hero-image-container {
    flex: 1;
  }
  
  .steps-container {
    flex-direction: row;
  }
  
  .step-card {
    flex: 1;
  }
  
  .step-arrow {
    top: 50%;
    left: auto;
    right: -40px;
    bottom: auto;
    transform: translateY(-50%);
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .copyright {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .testimonial-card {
    flex: 0 0 calc(33.333% - 1.33rem);
  }
  
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
  }
}

@media (min-width: 1280px) {
  .hero-title {
    font-size: 3.5rem;
  }
  
  section {
    padding: 6rem 2rem;
  }
}
</style>