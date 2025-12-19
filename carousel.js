// Attendre que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', () => {

  // --- LOGIQUE POUR LE CAROUSEL DES CATÉGORIES (Nos Services, etc.) ---
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

  const ciTitles = document.querySelectorAll('.ci-title');
  const cilRight = document.querySelector('.cil-right');
  
  ciTitles.forEach(title => {
    title.addEventListener('click', (e) => {
      e.preventDefault();
      
      const category = title.textContent.trim();
      let currentIndex = 0;
      
      const createCarousel = (category) => {
        const data = carouselsData[category];
        return `
          <div class="carousel-container">
            <button class="carousel-btn prev" aria-label="Image précédente"><i class="fas fa-chevron-left"></i></button>
            <div class="carousel-slides">
              ${data.map((item, index) => `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                  <img src="${item.img}" alt="${item.caption}">
                  <figcaption class="carousel-caption">${item.caption}</figcaption>
                </div>
              `).join('')}
            </div>
            <button class="carousel-btn next" aria-label="Image suivante"><i class="fas fa-chevron-right"></i></button>
          </div>
        `;
      };

      cilRight.innerHTML = createCarousel(category);
      
      const slides = cilRight.querySelectorAll('.carousel-slide');
      const prevBtn = cilRight.querySelector('.prev');
      const nextBtn = cilRight.querySelector('.next');

      const changeSlide = (direction) => {
        if (slides.length === 0) return;
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
      };
      
      prevBtn.addEventListener('click', () => changeSlide(-1));
      nextBtn.addEventListener('click', () => changeSlide(1));
    });
  });

  // --- LOGIQUE POUR LE NOUVEAU CAROUSEL DES COMMENTAIRES ---
  const testimonialWrapper = document.querySelector('.testimonial-carousel-wrapper');
  if (testimonialWrapper) {
    const testimonialSlides = document.querySelectorAll('.testimonial-carousel-slide');
    const prevTestimonialButton = document.querySelector('.testimonial-arrow.prev');
    const nextTestimonialButton = document.querySelector('.testimonial-arrow.next');

    let currentTestimonialIndex = 0;
    const totalTestimonialSlides = testimonialSlides.length;

    const updateTestimonialCarousel = () => {
      testimonialWrapper.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    };

    nextTestimonialButton.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonialSlides;
      updateTestimonialCarousel();
    });

    prevTestimonialButton.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonialSlides) % totalTestimonialSlides;
      updateTestimonialCarousel();
    });

    updateTestimonialCarousel();
  }


  // --- LOGIQUE POUR LES ANIMATIONS AU SCROLL (Intersection Observer) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const elementsToAnimate = entry.target.querySelectorAll('.ccidl-numero, [class^="cci-logo-"], .ccidl-texte, .fa-angles-right');
        elementsToAnimate.forEach(el => el.classList.add('is-visible'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  const ctaContainer = document.querySelector('.contCtaMain');
  if (ctaContainer) {
    observer.observe(ctaContainer);
  }

  const observerLabels = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const images = entry.target.querySelectorAll('img');
        images.forEach(img => img.classList.add('is-visible'));
        observerLabels.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const labelsContainer = document.querySelector('.cont-labels');
  if (labelsContainer) {
    observerLabels.observe(labelsContainer);
  }
});



