function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({nome, preco, quantidade: 1});
    };

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    const msg = document.getElementById('carrinho-msg');
    if (msg) {
        msg.textContent = `${nome} adicionado ao carrinho`;
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 1800);
    }

    atualizarContador();
    carregarCarrinho();
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    
    if (!lista || !totalElement) return;
    
    lista.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        if (carrinhoVazio) carrinhoVazio.style.display = 'block';
        totalElement.textContent = `Total: 🩸 0`;
        return;
    }
    
    if (carrinhoVazio) carrinhoVazio.style.display = 'none';

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.quantidade}x - 🩸 ${(item.preco * item.quantidade)}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerDoCarrinho(index);

        lista.appendChild(botaoRemover);
        lista.appendChild(li);

        total += item.preco * item.quantidade;
    });

    totalElement.textContent = `Total: 🩸 ${total}`;
    atualizarContador();
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
    } else {
        carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function limparCarrinho() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        localStorage.removeItem('carrinho');
        carregarCarrinho();
    }
}

function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        let total = 0;
        carrinho.forEach(item => total += item.quantidade);
        contador.textContent = total;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarContador();
    if (document.getElementById('lista-carrinho')) carregarCarrinho();
});