//scripts.js

const  cartao = document.querySelectorAll('.cartaodememoria');

let virou_cartao = false;
let travar_tabuleiro = false;
let primeiro_cartao, segundo_cartao;

function virar_cartao(){   
    if (travar_tabuleiro) return;  
    if (this === primeiro_cartao) return;

    this.classList.add('virar');

    if(!virou_cartao) {
        //primeiro clique
        virou_cartao = true;
        primeiro_cartao = this;

        return;
    }
    //segundo clique
    segundo_cartao = this;
    combinacao();
}

function combinacao(){
    let par = primeiro_cartao.dataset.framework === segundo_cartao.dataset.framework;

        par ? desativar_cartao() : desvirar_cartao();
}
 

function desativar_cartao(){
    primeiro_cartao.removeEventListener('click', virar_cartao);
    segundo_cartao.removeEventListener('click', virar_cartao);

    reset_tabuleiro();
}

function desvirar_cartao(){   
    travar_tabuleiro = true;    

    setTimeout(() => {
    primeiro_cartao.classList.remove('virar');
    segundo_cartao.classList.remove('virar');   

    reset_tabuleiro();
    }, 1500);
}

function reset_tabuleiro(){
    [virou_cartao, travar_tabuleiro] = [false,false];
    [primeiro_cartao, segundo_cartao] = [null, null];
}

(function embaralhar(){
    cartao.forEach(card => {
        let embaralhar = Math.floor(Math.random() * 12);
        card.style.order = embaralhar;
    });
})();


cartao.forEach(card => card.addEventListener('click', virar_cartao));