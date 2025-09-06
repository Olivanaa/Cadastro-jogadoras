let jogadoras = [
    {
        "nome": "Andressa Alves",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://example.com/andressa.jpg",
        "gols": 15,
        "assistencias": 10,
        "jogos": 28,
        "favorita": false
    },
    {
        "nome": "Dayana Rodríguez",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://example.com/dayana.jpg",
        "gols": 5,
        "assistencias": 12,
        "jogos": 30,
        "favorita": false
    },
    {
        "nome": "Mariza",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/mariza.jpg",
        "gols": 2,
        "assistencias": 1,
        "jogos": 32,
        "favorita": false
    },
    {
        "nome": "Thaís Regina",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/thais.jpg",
        "gols": 1,
        "assistencias": 2,
        "jogos": 25,
        "favorita": false
    },
    {
        "nome": "Letícia Teles",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/leticia.jpg",
        "gols": 0,
        "assistencias": 0,
        "jogos": 18,
        "favorita": false
    }
]

window.onload = function () {
    carregarLocalStorage()
    mostarJogadoras()
}

function mostarJogadoras() {
    const listaJogadoras = document.querySelector("#playerList")
    listaJogadoras.innerHTML = ""

    jogadoras.forEach((jogadora, index) => {
        const cardJogadora = document.createElement("div")
        cardJogadora.classList.add("player-card")

        cardJogadora.innerHTML = `
            <img src='${jogadora.foto}' alt="${jogadora.nome}" class="player-photo"/>
            <div class="player-info">
                <h3 class="player-name">${jogadora.nome}</h3>
                <p class="player-details"><strong>Posição:</strong> ${jogadora.posicao}</p>
                <p class="player-details"><strong>Clube:</strong> ${jogadora.clube}</p>
                <div class="player-stats">
                    <div class="stat">
                        <div class="stat-value">${jogadora.gols}</div>
                        <div class="stat-label">Gols</div>
                    </div>                
                    <div class="stat">
                        <div class="stat-value">${jogadora.assistencias}</div>
                        <div class="stat-label">Assistências</div>
                    </div>                
                    <div class="stat">
                        <div class="stat-value">${jogadora.jogos}</div>
                        <div class="stat-label">Jogos</div>
                    </div>                
                </div>            
            </div>
            <div class="player-actions">
                <button class="btn-action edit" data-action="Editar" data-index=${index} type="button">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button class="btn-action delete" data-action="Apagar" data-index=${index} type="button">
                    <i class="fa-solid fa-eraser"></i> Apagar
                </button>
                <button class="btn-action favorite" data-action="Favoritar" data-index=${index} type="button">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>

            `
        listaJogadoras.append(cardJogadora)
    })
}


function salvarLocalStorage(){
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras))
}

function carregarLocalStorage(){
    jogadorasGuardadas = localStorage.getItem("jogadoras")
    if(jogadorasGuardadas){
        jogadoras = JSON.parse(jogadorasGuardadas)
    }
}