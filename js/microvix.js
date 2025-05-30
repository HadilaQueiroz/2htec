    
// Função para abrir WhatsApp
function abrirWhatsApp() {
    window.open("https://wa.me/5511999999", "_blank");
}

// Função para destacar o menu ativo
function destacarMenu(menu) {
    // Remove a classe active de todos os menus
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.classList.remove('active');
    });

    // Adiciona active ao menu atual
    if (menu === 'microvix') {
        document.querySelectorAll('.nav-item a').forEach(item => {
            if (item.textContent.trim().toLowerCase() === 'microvix') {
                item.classList.add('active');
            }
        });
    } else if (menu === 'ecommerce') {
        document.querySelectorAll('.nav-item a').forEach(item => {
            if (item.textContent.trim().toLowerCase() === 'ecommerce') {
                item.classList.add('active');
            }
        });
    } else if (menu === 'reshop') {
        document.querySelectorAll('.nav-item a').forEach(item => {
            if (item.textContent.trim().toLowerCase() === 'reshop') {
                item.classList.add('active');
            }
        });
    }
}

        //CARROSSEL
        class ModernCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicatorsContainer = document.getElementById('indicators');
                
                this.cards = document.querySelectorAll('.carousel-card');
                this.totalCards = this.cards.length;
                this.currentIndex = 0;
                this.autoplayInterval = null;
                this.autoplayDelay = 5000;
                this.isTransitioning = false;
                
                this.init();
            }
            
            init() {
                this.setupResponsiveConfig();
                this.createIndicators();
                this.setupEventListeners();
                this.updateCarousel();
                this.startAutoplay();
            }
            
            setupResponsiveConfig() {
                const width = window.innerWidth;
                
                if (width <= 648) {
                    this.visibleCards = 1;
                } else if (width <= 968) {
                    this.visibleCards = 2;
                } else {
                    this.visibleCards = 3;
                }
                
                this.maxIndex = Math.max(0, this.totalCards - this.visibleCards);
                
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = this.maxIndex;
                }
            }
            
            createIndicators() {
                this.indicatorsContainer.innerHTML = '';
                const totalIndicators = this.maxIndex + 1;
                
                for (let i = 0; i < totalIndicators; i++) {
                    const indicator = document.createElement('button');
                    indicator.classList.add('indicator');
                    indicator.setAttribute('data-index', i);
                    
                    if (i === this.currentIndex) {
                        indicator.classList.add('active');
                    }
                    
                    this.indicatorsContainer.appendChild(indicator);
                }
            }
            
            setupEventListeners() {
                // Botões de navegação
                this.prevBtn.addEventListener('click', () => this.goToPrev());
                this.nextBtn.addEventListener('click', () => this.goToNext());
                
                // Indicadores
                this.indicatorsContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('indicator')) {
                        const index = parseInt(e.target.getAttribute('data-index'));
                        this.goToSlide(index);
                    }
                });
                
                // Navegação por teclado
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.goToPrev();
                    if (e.key === 'ArrowRight') this.goToNext();
                });
                
                // Touch events
                this.setupTouchEvents();
                
                // Pause on hover
                this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.track.addEventListener('mouseleave', () => this.startAutoplay());
                
                // Resize handler
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => this.handleResize(), 300);
                });
                
                // Visibility change
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        this.pauseAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                });
            }
            
            setupTouchEvents() {
                let startX = 0;
                let startY = 0;
                let isDragging = false;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    isDragging = true;
                    this.pauseAutoplay();
                }, { passive: true });
                
                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    
                    const currentX = e.touches[0].clientX;
                    const currentY = e.touches[0].clientY;
                    const deltaX = startX - currentX;
                    const deltaY = startY - currentY;
                    
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        e.preventDefault();
                    }
                }, { passive: false });
                
                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    
                    const endX = e.changedTouches[0].clientX;
                    const deltaX = startX - endX;
                    
                    isDragging = false;
                    
                    if (Math.abs(deltaX) > 50) {
                        if (deltaX > 0) {
                            this.goToNext();
                        } else {
                            this.goToPrev();
                        }
                    }
                    
                    this.startAutoplay();
                }, { passive: true });
            }
            
            updateCarousel() {
                const cardWidth = 100 / this.visibleCards;
                const translateX = -this.currentIndex * cardWidth;
                
                this.track.style.transform = `translateX(${translateX}%)`;
                
                this.updateIndicators();
                this.updateNavigationButtons();
            }
            
            updateIndicators() {
                const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }
            
            updateNavigationButtons() {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === this.maxIndex;
            }
            
            goToSlide(index) {
                if (this.isTransitioning || index < 0 || index > this.maxIndex) return;
                
                this.isTransitioning = true;
                this.currentIndex = index;
                this.updateCarousel();
                this.restartAutoplay();
                
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 600);
            }
            
            goToNext() {
                if (this.currentIndex < this.maxIndex) {
                    this.goToSlide(this.currentIndex + 1);
                } else {
                    this.goToSlide(0); // Loop infinito
                }
            }
            
            goToPrev() {
                if (this.currentIndex > 0) {
                    this.goToSlide(this.currentIndex - 1);
                } else {
                    this.goToSlide(this.maxIndex); // Loop infinito
                }
            }
            
            startAutoplay() {
                this.pauseAutoplay();
                this.autoplayInterval = setInterval(() => {
                    this.goToNext();
                }, this.autoplayDelay);
            }
            
            pauseAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            }
            
            restartAutoplay() {
                this.pauseAutoplay();
                setTimeout(() => this.startAutoplay(), 1000);
            }
            
            handleResize() {
                this.setupResponsiveConfig();
                this.createIndicators();
                this.updateCarousel();
            }
            
            destroy() {
                this.pauseAutoplay();
            }
        }
        
        // Inicializar quando o DOM estiver pronto
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new ModernCarousel();
            window.modernCarousel = carousel;
        });

     //LANDPAGE
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = form.nome.value.trim();
        const cnpj = form.CNPJ.value.trim();
        const telefone = form.telefone.value.trim();

        // Verifica se o telefone está preenchido
        if (!telefone) {
            alert("Por favor, preencha o campo de telefone.");
            return;
        }

        // Dados do formulário
        const templateParams = {
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
        };

        // Envio usando EmailJS
        emailjs.send("default_service", "template_id", templateParams)
            .then(function(response) {
                alert("Mensagem enviada com sucesso!");
                form.reset(); // Limpa os campos
            }, function(error) {
                console.error("Erro ao enviar:", error);
                alert("Ocorreu um erro ao enviar a mensagem.");
            });
    });
});


//FOOTER
document.addEventListener("DOMContentLoaded", function () {
    const instagramLink = document.getElementById("link-instagram");
    instagramLink.addEventListener("click", function (event) {
      event.preventDefault(); // impede comportamento padrão
      const email = "2htec@gmail.com";

      // Exemplo: usando o email como base para o link (poderia ter lógica diferente)
      const perfilInstagram = "https://www.instagram.com/2htec/";
      window.open(perfilInstagram, "_blank");
    });
  });

  //CONTATO WHATSAPP
   document.getElementById("btn-whatsapp").addEventListener("click", function () {
    window.open("https://wa.me/5521975088929", "_blank");
  });

  //botao do topo whats 
 
  function abrirWhatsApp() {
    window.open("https://wa.me/5521975088929", "_blank");
  }

  //BLOG
function removeHighlights() {
      const content = document.getElementById("content");
      content.innerHTML = content.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
    }

    function search() {
      const input = document.getElementById("searchInput").value.trim();
      const content = document.getElementById("content");
      const message = document.getElementById("resultMessage");

      removeHighlights();
      message.textContent = "";

      if (!input) return;

      const regex = new RegExp(`(${input})`, 'gi');
      let matchCount = 0;

      content.innerHTML = content.innerHTML.replace(regex, match => {
        matchCount++;
        return `<span class="highlight">${match}</span>`;
      });

      if (matchCount === 0) {
        message.textContent = `Nenhum resultado encontrado para "${input}".`;
      } else {
        message.textContent = `Encontrado ${matchCount} resultado(s) para "${input}".`;
      }
    }

    // CRIAR LOGO NA BUSCA
function changeFavicon(newIconPath) {
    const link = document.querySelector("link[rel*='icon']");
    link.href = newIconPath;
}
  


