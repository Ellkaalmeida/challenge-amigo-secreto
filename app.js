let amigos = [];
let resultadoSorteio = {};
let indiceResultado = 0;

function adicionarAmigo() {
    const amigoInput = document.getElementById("amigo");
    const nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo !== "") {
        amigos.push(nomeAmigo);
        atualizarListaAmigos();
        amigoInput.value = "";
    }
}

function atualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(nome => {
        const itemLista = document.createElement("li");
        itemLista.textContent = nome;
        listaAmigos.appendChild(itemLista);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio.");
        return;
    }

    resultadoSorteio = sorteioAmigoSecreto(amigos);
    indiceResultado = 0; 
    exibirResultado();
}

function sorteioAmigoSecreto(participantes) {
    const participantesDisponiveis = participantes.slice();
    embaralharArray(participantesDisponiveis);

    const amigoSecreto = {};
    for (let i = 0; i < participantes.length; i++) {
        const participante = participantes[i];
        let amigoIndex = i;

        if (participantes[i] === participantesDisponiveis[i]) {
            if (i === participantes.length - 1) {
                amigoIndex = 0;
            } else {
                amigoIndex = i + 1;
            }
        }
        amigoSecreto[participante] = participantesDisponiveis[amigoIndex];
    }
    return amigoSecreto;
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function exibirResultado() {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    if (Object.keys(resultadoSorteio).length > 0) {
        const participantes = Object.keys(resultadoSorteio);
        if (indiceResultado < participantes.length) {
            const participante = participantes[indiceResultado];
            const amigoSecreto = resultadoSorteio[participante];
            const itemResultado = document.createElement("li");
            itemResultado.textContent = `O amigo secreto sorteado foi: ${amigoSecreto}`;
            resultadoLista.appendChild(itemResultado);
            indiceResultado++;
        } else {
            resultadoLista.textContent = "Sorteio completo!";
        }
    }
}