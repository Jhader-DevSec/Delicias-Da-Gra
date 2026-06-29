document.addEventListener("DOMContentLoaded", () => {
    // 1. Selecionando os carrosséis
    const docesSlide = document.querySelector(".carrosel-containet-doces .carrosel-slide");
    const salgadosSlide = document.querySelector(".carrosel-containet-salgados .carrosel-slide");

    // Configurações do auto-scroll
    const velocidade = 1; // Quantidade de pixels que vai mover por vez (1 = bem lento e suave)
    const tempo = 25; // Intervalo em milissegundos

    // 2. Função para mover os DOCES para a DIREITA
    function moverDoces() {
        if (!docesSlide) return;
        
        docesSlide.scrollLeft += velocidade;
        
        // Loop: Se chegar no final da rolagem, volta rapidamente pro começo
        if (docesSlide.scrollLeft >= docesSlide.scrollWidth - docesSlide.clientWidth - 1) {
            docesSlide.scrollLeft = 0;
        }
    }

    // 3. Função para mover os SALGADOS para a ESQUERDA
    function moverSalgados() {
        if (!salgadosSlide) return;

        // Se estiver no começo (0), joga lá pro final para simular o loop
        if (salgadosSlide.scrollLeft <= 0) {
            salgadosSlide.scrollLeft = salgadosSlide.scrollWidth - salgadosSlide.clientWidth;
        }
        
        salgadosSlide.scrollLeft -= velocidade;
    }

    // 4. Inicia os intervalos para ficarem rodando sozinhos
    let intervaloDoces = setInterval(moverDoces, tempo);
    let intervaloSalgados = setInterval(moverSalgados, tempo);

    // INICIALIZAÇÃO: Para o carrossel de salgados ir para a esquerda, 
    // ele precisa começar lá no final primeiro.
    if (salgadosSlide) {
        salgadosSlide.scrollLeft = salgadosSlide.scrollWidth;
    }

    // 5. PAUSA no Hover (Interação mais amigável para o usuário)
    if (docesSlide) {
        docesSlide.addEventListener("mouseenter", () => clearInterval(intervaloDoces));
        docesSlide.addEventListener("mouseleave", () => intervaloDoces = setInterval(moverDoces, tempo));
    }

    if (salgadosSlide) {
        salgadosSlide.addEventListener("mouseenter", () => clearInterval(intervaloSalgados));
        salgadosSlide.addEventListener("mouseleave", () => intervaloSalgados = setInterval(moverSalgados, tempo));
    }

    // ==========================================
    // 6. FUNCIONALIDADE DOS BOTÕES MANUAIS (Prev/Next)
    // ==========================================
    function configurarBotoes(containerClass) {
        const container = document.querySelector(containerClass);
        if (!container) return;

        const slide = container.querySelector(".carrosel-slide");
        const btnPrev = container.querySelector(".prev");
        const btnNext = container.querySelector(".next");

        // Quantidade de pixels que pula ao clicar no botão
        const puloScroll = 300; 

        if (btnPrev && btnNext) {
            btnPrev.addEventListener("click", () => {
                slide.scrollBy({ left: -puloScroll, behavior: "smooth" });
            });

            btnNext.addEventListener("click", () => {
                slide.scrollBy({ left: puloScroll, behavior: "smooth" });
            });
            
            // Pausa o carrossel ao colocar o mouse no botão também
            btnPrev.addEventListener("mouseenter", () => containerClass.includes('doces') ? clearInterval(intervaloDoces) : clearInterval(intervaloSalgados));
            btnNext.addEventListener("mouseenter", () => containerClass.includes('doces') ? clearInterval(intervaloDoces) : clearInterval(intervaloSalgados));
        }
    }

    configurarBotoes(".carrosel-containet-doces");
    configurarBotoes(".carrosel-containet-salgados");
});