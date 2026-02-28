function inicializarPontos() {
    let pontos = localStorage.getItem('pontos-sangue');
    
    if (pontos === null) {
        // Novo usuário - ganha 500 pontos de bônus
        localStorage.setItem('pontos-sangue', 500);
        pontos = 500;
    }
    
    atualizarSaldoPontos();
    return pontos;
}

function atualizarSaldoPontos() {
    const saldo = localStorage.getItem('pontos-sangue') || 0;
    const elemento = document.getElementById('saldo-pontos');
    
    if (elemento) {
        elemento.textContent = parseInt(saldo).toLocaleString('pt-BR');
    }
}

function adicionarPontos(quantidade) {
    let saldo = parseInt(localStorage.getItem('pontos-sangue')) || 0;
    saldo += quantidade;
    localStorage.setItem('pontos-sangue', saldo);
    atualizarSaldoPontos();
}

function deduzirPontos(quantidade) {
    let saldo = parseInt(localStorage.getItem('pontos-sangue')) || 0;
    
    if (saldo < quantidade) {
        return false; // Sem pontos suficientes
    }
    
    saldo -= quantidade;
    localStorage.setItem('pontos-sangue', saldo);
    atualizarSaldoPontos();
    return true;
}

function obterSaldoPontos() {
    return parseInt(localStorage.getItem('pontos-sangue')) || 0;
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    inicializarPontos();
});
