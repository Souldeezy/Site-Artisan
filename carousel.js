// Données des carousels pour chaque catégorie
const carouselsData = {
  'Nos Services': [
    { img: 'PICTURES/woodTools.webp', caption: 'Création de meubles sur mesure adaptés à vos besoins' },
    { img: 'PICTURES/3chaises.webp', caption: 'Restauration de meubles anciens avec passion' },
    { img: 'PICTURES/chaiseBois.webp', caption: 'Ponçage et vernissage pour des finitions parfaites' },
    { img: 'PICTURES/meublesExotiquesBois.webp', caption: 'Agencement d\'intérieur personnalisé' },
    { img: 'PICTURES/woodenBowls.webp', caption: 'Conseils et suivi de projet de A à Z' }
  ],
  'Nos Réalisations': [
    { img: 'PICTURES/woodenTable3.webp', caption: 'Table en chêne massif sculptée à la main' },
    { img: 'PICTURES/woodenTable2.webp', caption: 'Armoire ancienne entièrement restaurée' },
    { img: 'PICTURES/woodneTbaleEdge.webp', caption: 'Bibliothèque sur mesure en noyer' },
    { img: 'PICTURES/woodenShelfandChair.webp', caption: 'Cuisine intégrée avec plan de travail en bois' },
    { img: 'PICTURES/woodenTable1.webp', caption: 'Escalier en chêne avec rampe sculptée' }
  ],
  'Notre Atelier': [
    { img: 'PICTURES/woodenArtisan3.webp', caption: 'Notre atelier au cœur du Gers' },
    { img: 'PICTURES/woodenArtisan2.webp', caption: 'Outils traditionnels et équipements modernes' },
    { img: 'PICTURES/woodenArtisan1.webp', caption: 'Sélection d\'essences nobles' },
    { img: 'PICTURES/ArtisanBois4.webp', caption: 'Espace de travail organisé et fonctionnel' },
    { img: 'PICTURES/ArtisanBois3.webp', caption: 'Passion du bois transmise depuis 30 ans' }
  ],
  'Charte de Qualité': [
    { img: 'PICTURES/1car.webp', caption: 'Essences nobles rigoureusement sélectionnées' },
    { img: 'PICTURES/handshake.webp', caption: 'Finitions impeccables sur chaque création' },
    { img: 'PICTURES/customer.webp', caption: 'Respect strict des délais convenus' },
    { img: 'PICTURES/carftamn1.webp', caption: 'Contrôle qualité à chaque étape' },
    { img: 'PICTURES/woodFactory.webp', caption: 'Garantie satisfaction client' }
  ]
};

let currentIndex = 0;
let currentCategory = '';

// Fonction pour créer le carousel HTML
function createCarousel(category) {
  const data = carouselsData[category];
  const carouselHTML = `
    <div class="carousel-container">
      <button class="carousel-btn prev" aria-label="Image précédente">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="carousel-slides">
        ${data.map((item, index) => `
          <div class="carousel-slide ${index === 0 ? 'active' : ''}">
            <img src="${item.img}" alt="${item.caption}">
            <figcaption class="carousel-caption">${item.caption}</figcaption>
          </div>
        `).join('')}
      </div>
      <button class="carousel-btn next" aria-label="Image suivante">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
  return carouselHTML;
}

// Fonction pour changer de slide
function changeSlide(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  slides[currentIndex].classList.remove('active');
  
  currentIndex += direction;
  
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  
  slides[currentIndex].classList.add('active');
}

// Initialiser les événements sur les liens
document.addEventListener('DOMContentLoaded', () => {
  const ciTitles = document.querySelectorAll('.ci-title');
  const cilRight = document.querySelector('.cil-right');
  
  ciTitles.forEach(title => {
    title.addEventListener('click', (e) => {
      e.preventDefault();
      
      const category = title.textContent.trim();
      currentCategory = category;
      currentIndex = 0;
      
      // Créer et afficher le carousel
      cilRight.innerHTML = createCarousel(category);
      
      // Ajouter les événements aux boutons
      const prevBtn = cilRight.querySelector('.prev');
      const nextBtn = cilRight.querySelector('.next');
      
      prevBtn.addEventListener('click', () => changeSlide(-1));
      nextBtn.addEventListener('click', () => changeSlide(1));
      
      // Optionnel: navigation au clavier
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
      });
    });
  });
});