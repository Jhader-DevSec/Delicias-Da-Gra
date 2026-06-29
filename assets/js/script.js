document.addEventListener("DOMContentLoaded", () => {
    const docesSlide = document.querySelector(".carrosel-containet-doces .carrosel-slide");
    const salgadosSlide = document.querySelector(".carrosel-containet-salgados .carrosel-slide");

    const velocidade = 1; 
    const tempo = 25; 

    
    function moverDoces() {
        if (!docesSlide) return;
        
        docesSlide.scrollLeft += velocidade;
        
        if (docesSlide.scrollLeft >= docesSlide.scrollWidth - docesSlide.clientWidth - 1) {
            docesSlide.scrollLeft = 0;
        }
    }

    function moverSalgados() {
        if (!salgadosSlide) return;
        
        if (salgadosSlide.scrollLeft <= 0) {
            salgadosSlide.scrollLeft = salgadosSlide.scrollWidth - salgadosSlide.clientWidth;
        }
        
        salgadosSlide.scrollLeft -= velocidade;
    }

    
    let intervaloDoces = setInterval(moverDoces, tempo);
    let intervaloSalgados = setInterval(moverSalgados, tempo);

    if (salgadosSlide) {
        salgadosSlide.scrollLeft = salgadosSlide.scrollWidth;
    }

    
    if (docesSlide) {
        docesSlide.addEventListener("mouseenter", () => clearInterval(intervaloDoces));
        docesSlide.addEventListener("mouseleave", () => intervaloDoces = setInterval(moverDoces, tempo));
    }

    if (salgadosSlide) {
        salgadosSlide.addEventListener("mouseenter", () => clearInterval(intervaloSalgados));
        salgadosSlide.addEventListener("mouseleave", () => intervaloSalgados = setInterval(moverSalgados, tempo));
    }

    function configurarBotoes(containerClass) {
        const container = document.querySelector(containerClass);
        if (!container) return;

        const slide = container.querySelector(".carrosel-slide");
        const btnPrev = container.querySelector(".prev");
        const btnNext = container.querySelector(".next");

        const puloScroll = 300; 

        if (btnPrev && btnNext) {
            btnPrev.addEventListener("click", () => {
                slide.scrollBy({ left: -puloScroll, behavior: "smooth" });
            });

            btnNext.addEventListener("click", () => {
                slide.scrollBy({ left: puloScroll, behavior: "smooth" });
            });
            
            btnPrev.addEventListener("mouseenter", () => containerClass.includes('doces') ? clearInterval(intervaloDoces) : clearInterval(intervaloSalgados));
            btnNext.addEventListener("mouseenter", () => containerClass.includes('doces') ? clearInterval(intervaloDoces) : clearInterval(intervaloSalgados));
        }
    }

    configurarBotoes(".carrosel-containet-doces");
    configurarBotoes(".carrosel-containet-salgados");
});