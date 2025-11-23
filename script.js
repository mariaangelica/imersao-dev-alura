let cardContainer = document.querySelector(".card-container");
let dadosLinguagens = []; 

// Carrega os dados assim que a página é carregada
window.addEventListener('load', async () => {
    try {
        let resposta = await fetch("data.json");
        let dados = await resposta.json();
        dadosLinguagens = dados; // Armazena os dados na variável global
        renderizarCards(dadosLinguagens); 
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
    }
});

function iniciarBusca() {
    const termoBusca = document.querySelector('input[type="text"]').value.toLowerCase();

    // Cria uma expressão regular para encontrar a palavra inteira, ignorando maiúsculas/minúsculas.
    // O \b garante que estamos procurando por uma palavra completa.
    const regex = new RegExp('\\b' + termoBusca + '\\b', 'i');

    const resultados = dadosLinguagens.filter(linguagem =>
        linguagem.nome.toLowerCase().includes(termoBusca) ||
        regex.test(linguagem.descricao)
    );

    renderizarCards(resultados);
}

function renderizarCards(linguagens) {
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores

    if (linguagens.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let linguagem of linguagens) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${linguagem.nome}</h2>
            <p><strong>Ano:</strong> ${linguagem.ano}</p>
            <p>${linguagem.descricao}</p>
            <a href="${linguagem.link}" target="_blank">Saiba mais</a>`;
        cardContainer.appendChild(article);
    }
}

// Adiciona um ouvinte de evento para a tecla "Enter" no campo de input
document.querySelector('input[type="text"]').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});