// AJUSTANDO O TAMANHO DO PALCO DO JOGO ; 

var altura = 0 ; // Variável onde será atribuida o tamanho da altura do navegador do usuário ;  
var largura = 0 ; // Variável onde será atribuida o tamanho da largura do navegador do usuário ;  
var vidas = 1 ; // Váriavel criada para representar as vidas do usuário ;
var tempo = 15 ; // Váriavel criada para representar a quantidade de tempo do jogo ; 

var criaMosquitoTempo = 1500 ; // Variável criada para ser o tempo de surgimento de mosquito no jogo, e será alterada de acordo com o nível escolhido pelo usuário ; 

var nivel = window.location.search ; // Recuperando a URL da página e atribuindo uma variável para saber qual dificuldade de jogo será aplicada ; 
nivel.replace(('?', '')) ; // Fazendo com que o caractere de interrogação seja substítuido por um caractere vazio ; 

if(nivel === 'normal') { // Associando a quantidade de tempo a dificuldade estabelecida pelo usuário ; 
    criaMosquitoTempo = 1500; 
} else if(nivel === 'dificil') {
    criaMosquitoTempo = 1000;
} else if(nivel === 'chucknorris') {
    criaMosquitoTempo = 750 ;
}

function ajustaTamanhoPalcoJogo() { // Função que ajusta o tamanho do jogo de acordo com a tela do usuário ; 
    altura = window.innerHeight ; // Atribuindo a variável a altura do navegador do usuário ; 
    largura = window.innerWidth ; // Atribuindo a variável a largura do navegador do usuário ;  
}

ajustaTamanhoPalcoJogo() ;

// FUNÇÃO CRIADA PARA EXECUTAR O CRONÔMETRO DENTRO DO JOGO ; 

var cronometro = setInterval(function(){ /// Função criada para representar o tempo do jogo ; 
    tempo--; // Diminuindo o valor do tempo, onde o usuário terá 15 segundos de jogo ; 
    if(tempo < 0) { // Validando a quantidade de tempo, para que não permita números negativos e que seja respeitado o tempo de 15 segundos do usuário ; 
        clearInterval(cronometro); // Limpando o tempo para que a função não continue sendo realizada ;  
        clearInterval(criaMosquito) ; // Limpando o tempo para que a função de criar moquito não seja mais realizada ; 
        window.location.href = "vitoria.html" ; // Redirecionando o usuário para outra página em caso de vitória ; 
    }
    else {
        document.getElementById('cronometro').innerHTML = tempo ; // Recuperando o ID do elemento cronometro, e inserindo o valor do tempo que ainda resta de jogo ; 
    }
},1000) ;

// FUNÇÃO PARA CRIAR POSIÇÕES RANDÔMICAS E CRIAR ELEMENTO HTML DE FORMA PROGRAMÁTICA ; 
function posicaoRandomica() {

    // REMOVER O MOSQUITO ANTERIOR (CASO EXISTA) POR MEIO DO ID ;
    if(document.getElementById('mosquito')) { // Selecionando o ID responsável pelo mosquito ; 
        document.getElementById('mosquito').remove(); // Removendo o mosquito ; 
        if(vidas > 3) { // Fazendo a validação de quantas vidas o usuário ; 
            window.location.href = "fim_de_jogo.html" ; // Fazendo com que o usuário seja redirecionado para a tela de fim de jogo ; 
        }
        else {
            document.getElementById('v' + vidas).src = 'Imagens/coracao_vazio.png'; // Trocando a imagem do coração cheiro, para um coração vazio, indicando que o usuário perdeu uma vida ; 
            vidas++; // Fazendo o incremento de vidas do usuário para remoção, posteriormente ;     
        }
    }

    // CRIANDO POSIÇÕES RANDÔMICAS ; 
    let posicaoX = Math.floor(Math.random() * largura) - 90 ; // Criando uma posição X aleatória cujo limitante será o tamanho da janela ;
    let posicaoY = Math.floor(Math.random() * altura) - 90 ; // Criando uma posição Y aleatória cujo limitante será o tamanho da janela ;

    posicaoX = posicaoX < 0 ? 0 : posicaoX ; // Operador ternário garantindo que a posição randômica X não seja menor que 0 ; 
    posicaoY = posicaoY < 0 ? 0 : posicaoY ; // Operador ternário garantindo que a posição randômica Y não seja menor que 0 ; 

    // CRIANDO O ELEMENTO HTML DE FORMA PROGRAMÁTICA ;         
    let mosquito = document.createElement('img') ; // Criando a imagem do mosquito dentro do HTML ; 
    mosquito.src = "Imagens/mosquito.png" ; // Passando o endereço da imagem do mosquito que será criada ; 
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio() ; // Inserindo a classe no elemento para estilização no CSS de forma randômica utilizando a função 'tamanhoAleatorio()'; 
    mosquito.style.left = posicaoX + 'px' ; // Definindo a posição X do elemento na tela do usuário ; 
    mosquito.style.top = posicaoY + 'px' ; // Definindo a posição Y do elemento na tela do usuário ; 
    mosquito.style.position = 'absolute' ; // Definindo a posição do elemento como absoluta ; 
    mosquito.id = "mosquito" ; // Definindo um ID para o elemento para que quando seja criado outro mosquito num determinado tempo, esse seja removido automaticamente por meio do ID ;  
    mosquito.onclick = function() { // Função criada para o clique do usuário no mosquito ; 
        this.remove(); // Fazendo referência ao emlemento HTML que executou a função, e o removendo ;  
    }

    document.body.appendChild(mosquito) ; // Inserindo a imagem do mosquito dentro do body ; 
}

// FAZENDO COM QUE SEJA CRIADO E REMOVIDO MOSQUITOS EM UM DETERMINADO TEMPO ; 

var criaMosquito = setInterval(function() {
    posicaoRandomica() ; 
}, criaMosquitoTempo) ; 


// CRIAÇÃO DE TAMANHOS VÁRIAVEIS PARA O MOSQUITO ;

function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3); // Recebendo o valor 0,1 ou 2 para a váriavel classe, onde definiermos se aplicaremos a classe Mosquito1, Mosquito2, ou Mosquito3 ; 
    switch (classe) { // Estrutura switch criando para recuperar o valor através do valor randômico ; 
        case 0 : 
            return 'mosquito1' ; 
        case 1 :
            return 'mosquito2' ;
        case 2 : 
            return 'mosquito3' ; 
    }
}

// CRIAÇÃO DOS LADOS A E B ; 

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2) ; // Recebendo o valor 0 ou 1 para váriavel classe, onde definiremos se o lado será A ou B ; 
    switch (classe) { // Estrutrura switch criada para recuperar o valor através do valor randômico ; 
        case 0 :
            return 'ladoA' ; 
        case 1 :
            return 'ladoB' ; 
    }
}