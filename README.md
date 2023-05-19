# mochila_formulario
Formulário de mochila que armazena e remove itens usando localStorage em JavaScript. Adicione itens com nome e quantidade, exibidos em uma lista na página. Os dados persistem no navegador. Ótimo para aprender manipulação do DOM, eventos de formulário e armazenamento local



O código disponibilizado é um exemplo de um formulário de mochila que armazena e remove itens usando o localStorage do navegador. Aqui está um resumo do que o código faz:

O código começa selecionando o formulário no HTML usando o ID novoItem e a lista de itens usando um atributo de dados data-lista.
Em seguida, o código recupera os itens armazenados no localStorage e os converte de volta para um array usando JSON.parse.
Os itens armazenados no localStorage são percorridos para criar elementos HTML correspondentes e exibi-los na página usando a função criaElementoHtml.
O código adiciona um evento de escuta ao formulário para capturar o envio do formulário (quando o botão "enviar" é pressionado).
Quando o formulário é enviado, a função de callback é executada.
A função de callback impede o comportamento padrão do formulário usando preventDefault.
Em seguida, recupera o nome e a quantidade do item do formulário usando evento.target.elements.
Verifica se um item com o mesmo nome já existe na lista de itens usando a função find.
Se o item já existe, ele é atualizado na lista de itens e na exibição usando a função atualizaElemento.
Se o item não existe, ele é adicionado à lista de itens e à exibição usando a função criaElementoHtml.
A lista de itens é atualizada no localStorage usando localStorage.setItem.
O texto dos campos do formulário é limpo para permitir a inserção de novos itens.
Há uma função criaBotaoElemento que cria um botão "X" para remover um item quando clicado.
Quando o botão "X" é clicado, a função removeElementoDoLocalStorage é chamada para remover o item da lista de itens e do localStorage.
A função removeElementoDoLocalStorage remove o elemento correspondente do array de itens, remove o botão clicado da exibição e atualiza o localStorage.
Esse código permite que os usuários adicionem itens à mochila, armazenando-os no localStorage, e também permite a remoção desses itens. Os itens são exibidos na página em uma lista com seus nomes e quantidades.
