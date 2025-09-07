let jogadoras = [
    {
        "nome": "Andressa Alves",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://cdn.agenciamural.org.br/2023/07/11213707/AndressaAlves-SamRoblesCBF.jpg",
        "gols": 15,
        "assistencias": 10,
        "jogos": 28,
        "favorita": false
    },
    {
        "nome": "Dayana Rodríguez",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRl7hpc0nRQZkekl3vScSLDB6Ep3UzLdXDNA&s",
        "gols": 5,
        "assistencias": 12,
        "jogos": 30,
        "favorita": false
    },
    {
        "nome": "Mariza",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://www.ogol.com.br/img/jogadores/27/881127_ori__20220314150616_mariza.png",
        "gols": 2,
        "assistencias": 1,
        "jogos": 32,
        "favorita": false
    },
    {
        "nome": "Thaís Regina",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTb45soFQKI8Xi1u0fVoqjpfWxxClfDcXyTg&s",
        "gols": 1,
        "assistencias": 2,
        "jogos": 25,
        "favorita": false
    },
    {
        "nome": "Letícia Teles",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://cdn.meutimao.com.br/_upload/jogador/leticia-teles-da-silva-no-corinthians_4_corinthians.jpg",
        "gols": 0,
        "assistencias": 0,
        "jogos": 18,
        "favorita": false
    }
]

let indiceEdicao = null

window.onload = function () {
    carregarLocalStorage()
    mostarJogadoras()

    document.querySelector("#playerForm").addEventListener("submit", cadastrar)
    document.querySelector('#playerList').addEventListener("click", handleClick)

    localStorage.clear()
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
                <button class="btn-action favorite">
                    <i  type="button" data-action="Favoritar" data-index=${index} class="fa-heart ${jogadora.favorita ? 'fa-solid' : 'fa-regular'}"></i>
                </button>
            </div>

            `
        listaJogadoras.append(cardJogadora)
    })
}

function handleClick(e) {
    const acao = e.target.dataset.action
    const indice = e.target.dataset.index


    if (!acao) return

    if (acao === "Editar") {
        editar(indice)
    } else if (acao === "Apagar") {
        apagar(indice)
    } else if (acao === "Favoritar") {
        favoritar(indice)
    }
}

function cadastrar(e) {
    e.preventDefault()

    const nome = document.querySelector('#playerName').value
    const posicao = document.querySelector('#playerPosition').value
    const clube = document.querySelector('#playerClub').value
    const foto = document.querySelector('#playerPhoto').value
    const gols = document.querySelector('#playerGoals').value
    const assistencias = document.querySelector('#playerAssists').value
    const jogos = document.querySelector('#playerMatches').value

    const jogadora = {
        nome: nome,
        posicao: posicao,
        clube: clube,
        foto: foto,
        gols: gols,
        assistencias: assistencias,
        jogos: jogos,
        favorita: false
    }

    if (indiceEdicao !== null) {
        jogadoras[indiceEdicao] = jogadora
        indiceEdicao = null
        cancelarEdicao()
        alert("Jogadora editada com sucesso!")
    } else {
        jogadoras.unshift(jogadora)
        alert("Jogadora adicionada com sucesso!")
    }

    salvarLocalStorage()

    document.querySelector('#playerForm').reset()

    mostarJogadoras()
}

function editar(indice) {
    const jogadora = jogadoras[indice]
    indiceEdicao = indice

    document.querySelector('#playerName').value = jogadora.nome
    document.querySelector('#playerPosition').value = jogadora.posicao
    document.querySelector('#playerClub').value = jogadora.clube
    document.querySelector('#playerPhoto').value = jogadora.foto
    document.querySelector('#playerGoals').value = jogadora.gols
    document.querySelector('#playerAssists').value = jogadora.assistencias
    document.querySelector('#playerMatches').value = jogadora.jogos

    document.querySelector('.botao button').textContent = "Salvar"

    document.querySelector('#playerName').focus()

    const botao = document.querySelector('#botao-cancelar')
    if (!document.querySelector('#cancelarEdicao')) {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.id = 'cancelarEdicao'
        btn.textContent = 'Cancelar'
        btn.addEventListener('click', cancelarEdicao)
        botao.appendChild(btn)
    }

}

function cancelarEdicao() {
    indiceEdicao = null
    document.querySelector('#playerForm').reset()
    document.querySelector('.botao button').textContent = "Cadastrar"
    document.querySelector('#botao-cancelar').innerHTML = ""
}

function apagar(indice) {
    const confirmar = confirm("Deseja realmente excluir jogadora?")

    if (confirmar) {
        jogadoras.splice(indice, 1)
        salvarLocalStorage()
        alert("Jogadora removida com sucesso!")
        mostarJogadoras()
    }
}

function salvarLocalStorage() {
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras))
}

function carregarLocalStorage() {
    jogadorasGuardadas = localStorage.getItem("jogadoras")
    if (jogadorasGuardadas) {
        jogadoras = JSON.parse(jogadorasGuardadas)
    }
}