import citacoes from './quotes.js';

const button = document.querySelector('#new-quote-button');
const text = document.querySelector('#quote-text');

function fetchRandomQuote() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const posicao_aleatoria = Math.floor(Math.random() * citacoes.length);
                const citacao = citacoes[posicao_aleatoria];
                resolve(citacao);
            } catch (error) {
                reject("Erro: Não foi Possível Retornar uma Citação.");
            }
        }, 2000);
    });
}

button.addEventListener('click', async function() {
    button.disabled = true;

    Toastify({
        text: "Buscando uma Nova Citação...",
        duration: 2000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: { 
            background: "#F7E09D",
            color: "#000000"
        }
    }).showToast();

    try {
        const citacao = await fetchRandomQuote();
        text.textContent = citacao;

        gsap.fromTo('#quote-text', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1,duration: 1, ease: "back.out" }
        );
    } catch (error) {
        console.error("Erro na Busca da Citação.")
        text.textContent = "Tente Novamente!"
    } finally {
        button.disabled = false;
    }

});
