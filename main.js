/*
Código da mochila/formulário que armazena e remove itens do localStorage

*/

// constante que recebe o formulario através do id="novoItem" que é onde todo o codigo será executado porque ele que envia os relatórios com o submit
const formulario = document.querySelector("#novoItem");


// a listadeitem é a constante que indica o 'ul' no html onde será adicionado dentro várias "li" de acordo com o que for colocando no formulário
const listadeitem = document.querySelector("[data-lista]");

//itens é a constante responavel por verificar, receber cada envio do formulario para armazenar no localStorage
//json.parse vai transformar o que tem dentro para um array
const itens = JSON.parse(localStorage.getItem("itens"))||[];


//essa função irá enviar para outra função que é responsavel para criar a 'li' na pagina com o que estiver no formulário. essa função aqui
//é executada na hora que a página é aberta, para trazer o que ja está salvo no localStorage dela.
itens.forEach((elemento)=>{
    
    criaElementoHtml(elemento)
})


//função retorna todo o códgio quando da o "submit" no formulario (quando aperta em enviar)
formulario.addEventListener("submit", (evento)=>{

//esse preventDefault() é uma função responsavel por prevenir o  evento padrão do submit que é enviar para algum lugar o formulário
    evento.preventDefault();

//nome recebe o elements que esta dentro de target. o elemento é nome poque lá no formulario tem o primeiro local de digitar e esse local está com o name nome
    const nome=evento.target.elements['nome'];
    
//quantidade recebe o elements que esta dentro de target. o elemento é nome poque lá no formulario tem o segundo local de digitar e esse local está com o name quantidade
    const quantidade=evento.target.elements['quantidade'];

 
//constante existe recebendo a procura de algum elemento no itens que seja igual a nome.value
//esse codigo é pra saber se existe algum nome ja escrito no formulároio e se o nome é igual
    const existe = itens.find((elemento)=>{

        //retornar o nome que se igual a algum elemento nome do itens
       return elemento.nome===nome.value;
    });
   
//criando o objeto itemAtual pra facilitar usar a quantidade e o nome
    const itemAtual={
        //nome: valor;
        nome: nome.value,
        
        //nome: valor;
        quantidade: quantidade.value
    }

//if para se o existe realmente existe. se tem algo dentro de existe então ele executará, senão passa direto para o else
    if(existe){

//se existe, então o itemAtual.id recebe o mesmo id do existe
        itemAtual.id = existe.id

        
//então ele e enviado para uma função que envia o itemAtual já com o id adicionado pra dentro do atualiza elemento que faz item atual mudar a quantidade
        atualizaElemento(itemAtual);

//uma procura pelo itens.local que vai ser o id. esse item no existe será substituído pelo item atual
//procura dentro do itens a busca se o elemento id é igual o existe id
        itens[itens.findIndex(elemento=> elemento.id===existe.id)]=itemAtual
    }

//se o existe estiver sem nada então significa que não tinha nenhum nome parecido então terá que criar um novo id pra ele
    else{
    
// atualiza o id do objeto itemAtual. Se houver um último elemento no array itens, o id do itemAtual será o id do último elemento incrementado em 1. Caso contrário, o id do itemAtual será 0.
        itemAtual.id=itens[itens.length -1]? (itens[itens.length-1]).id +1 :0;
  
        
//item atual sendo enviado pra criar o li
        criaElementoHtml(itemAtual);

//item atual sendo enviado para o itens
        itens.push(itemAtual);
    }


// localStorage recebendo o itens passando o valor dele usando o json.stringify que consegue transformar o objeto para uma string
    localStorage.setItem("itens", JSON.stringify(itens));

//depois de tudo acontecer e o nome e quantidade ja forem enviados para o criarElemento ele vai e limpa o texto que tem escrito para que possam escrever sem precisar ir la e apagar de novo
    nome.value="";
    quantidade.value="";
})

//finalmente a função que vai criar o elemento dentro do html no navegador pelo js
function criaElementoHtml(itemAtual){

//primeiro cria uma constante que vai receber o "li"
const novoItem = document.createElement('li');

//essa constante que recebeu o li tambem vai receber uma classe "item" essa classe pois já está pré-configurado la no css então quando for adicionado ele ja vai ficar com o estilo do css
novoItem.classList.add("item");


//cria o que vai receber a quantidade que aquele item vai receber que é a tag strong
const numeroItem = document.createElement('strong');

//strong recebendo dentro do seu innerHTML==(<strong> innerHtml</strong>) a quantidade vai dentro 
//mesma coisa do item o strong já está lá no css configurado 
numeroItem.innerHTML = itemAtual.quantidade;



//o strong recebendo o id que vem com o item atual para dentro da tag strong para poder malipular o valor depois
numeroItem.dataset.id= itemAtual.id;



//aqui o numero item sendo colocado dentro do novo item que é a li
// fica <li><strong> quantidade</strong><li>
novoItem.appendChild(numeroItem);

//aqui sendo colocado dentro do item novo o nome 
//ficando assim:
// <li><strong> quantidade</strong> NOME<li>
novoItem.innerHTML += itemAtual.nome;

//colocando o cria botão (que vai ser um botão com o X pra remover o item) e passando o id do item atual
novoItem.appendChild(criaBotaoElemento(itemAtual.id))


//colocando o novo item dentro do 'ul'
//<ul>
//<li><strong> quantidade</strong><li>
//<ul>
listadeitem.appendChild(novoItem)
}


//aqui atualiza a quantidade o item que estiver com o mesmo nome
function atualizaElemento(item){
    //procura no document html um data-id que recebe o item id e o innethtml dele recebe o item quantidade 
    document.querySelector("[data-id='"+item.id+"']").innerHTML=item.quantidade;
}


//função que vai criar o botão X para remover algo 
function criaBotaoElemento(id){

//criando uma constante botão que vai receber um button
    const botao=document.createElement("button");
//dentro do button ele recebe a letra X
    botao.innerText="X";
 
    
//quando o botão x for clicado então executa a fução de remover o botão e o item
    botao.addEventListener("click", function(){
//o remove elemento recebe o id que é onde o strong ta e busca pelo elemento pai dele que é o li
        removeElementoDoLocalStorage(id,this.parentNode);
    })
//retonar o botão aparecendo dentro do li
    return botao;
}


//função de remover um item do localStorage
function removeElementoDoLocalStorage(id,s){
// procura na constante itens para remove um item do retorno de itens buscando no index retornando o elemento.id igual id
//o elemente que for clicado e o id for igual o id do elemento então ele que sera removido
    itens.splice(itens.findIndex(elemento=>elemento.id===id),1);
    //remove botão
    s.remove();
    
//atualizando o array do localStore para receber o elemento removido 
    localStorage.setItem("itens", JSON.stringify(itens))
    
}