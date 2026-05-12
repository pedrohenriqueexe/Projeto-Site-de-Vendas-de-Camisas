const produtos = [
    { id: 1, nome: "Vasco 2026", categoria: "brasil", valor: 249.90, tamanhos: "P, M, G, GG", img: "vasco.png" },
    { id: 2, nome: "Real 25/26", categoria: "europa", valor: 299.90, tamanhos: "P, M, G, GG", img: "real.png" },
    { id: 3, nome: "Barcelona 25/26", categoria: "europa", valor: 229.90, tamanhos: "P, M, G, GG", img: "barcelona.png" },
    { id: 4, nome: "Palmeiras 25/26", categoria: "brasil", valor: 229.90, tamanhos: "P, M, G, GG", img: "palmeiras.png" },
    { id: 5, nome: "Barcelona 08/09", categoria: "retro", valor: 229.90, tamanhos: "P, M, G, GG", img: "barcelonaretro.png" },
    { id: 6, nome: "Milan 2006", categoria: "retro", valor: 229.90, tamanhos: "P, M, G, GG", img: "milan.png" }
];

let carrinho = [];

// RENDERIZAR PRODUTOS
function renderizar(filtro = 'all') {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;
    catalog.innerHTML = ""; 

    const listaFiltrada = filtro === 'all' ? produtos : produtos.filter(p => p.categoria === filtro);

    listaFiltrada.forEach(p => {
        const opcoesTamanho = p.tamanhos.split(',').map(t => 
            `<option value="${t.trim()}">${t.trim()}</option>`
        ).join('');

        catalog.innerHTML += `
            <div class="tech-card">
                <div class="product-img">
                    <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/400x400/000000/FFFFFF?text=FOTO+DO+MANTO'">
                </div>
                <div class="product-details">
                    <h3 style="margin-top: 15px;">${p.nome}</h3>
                    <label style="font-size: 0.7rem; color: #888; display: block; margin-top: 10px;">TAMANHO:</label>
                    <select class="size-selector" id="size-${p.id}">${opcoesTamanho}</select>
                    <div class="price-tag">R$ ${p.valor.toFixed(2).replace('.', ',')}</div>
                    
                    <div class="shipping-box">
                        <input type="number" 
                               placeholder="CEP (8 dígitos)" 
                               id="cep-${p.id}" 
                               maxlength="8" 
                               oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        
                        <button class="btn-shipping" onclick="calcularFrete(${p.id})">CALCULAR</button>
                    </div>
                    
                    <div id="res-${p.id}" style="font-size: 0.75rem; font-weight: bold; margin-bottom: 10px;"></div>
                    <button class="btn-stadium" onclick="comprar(${p.id})">ADQUIRIR MANTO</button>
                </div>
            </div>`;
    });
}

// ADICIONAR AO CARRINHO
function comprar(id) {
    const produto = produtos.find(p => p.id === id);
    const tamanhoEscolhido = document.getElementById(`size-${id}`).value;
    carrinho.push({ ...produto, tamanho: tamanhoEscolhido });
    atualizarCarrinho();
    
    const btn = event.target;
    btn.innerText = "ADICIONADO!";
    btn.style.background = "#00ff00";
    setTimeout(() => { btn.innerText = "ADQUIRIR MANTO"; btn.style.background = ""; }, 1000);
}

// ATUALIZAR MODAL DO CARRINHO
function atualizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if(cartCount) cartCount.innerText = carrinho.length;
    if(cartItems) {
        cartItems.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.valor;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div><strong>${item.nome}</strong><br><small>Tam: ${item.tamanho}</small></div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>R$ ${item.valor.toFixed(2).replace('.', ',')}</span>
                        <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>`;
        });
        cartTotal.innerText = `TOTAL: R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// NAVEGAÇÃO DO MODAL
function abrirCarrinho() { document.getElementById('cart-modal').style.display = 'block'; }
function fecharCarrinho() { 
    document.getElementById('cart-modal').style.display = 'none';
    voltarProCarrinho();
}

function irParaPagamento() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    document.getElementById('cart-main-view').style.display = 'none';
    document.getElementById('payment-screen').style.display = 'block';
}

function voltarProCarrinho() {
    const mainView = document.getElementById('cart-main-view');
    const payScreen = document.getElementById('payment-screen');
    if(mainView) mainView.style.display = 'block';
    if(payScreen) payScreen.style.display = 'none';
}

// UTILITÁRIOS - COPIAR PIX
function copiarPix() {
    const chave = document.getElementById('pix-key').innerText;
    const elementoTemporario = document.createElement('textarea');
    elementoTemporario.value = chave;
    document.body.appendChild(elementoTemporario);
    elementoTemporario.select();
    
    try {
        document.execCommand('copy');
        const btn = event.target;
        const textoOriginal = btn.innerText;
        btn.innerText = "COPIADO!";
        btn.style.background = "#fff";
        btn.style.color = "#000";
        
        setTimeout(() => {
            btn.innerText = textoOriginal;
            btn.style.background = "var(--gold)";
            btn.style.color = "";
        }, 2000);
    } catch (err) {
        alert("Erro ao copiar.");
    }
    document.body.removeChild(elementoTemporario);
}

function confirmarNoZap() {
    const numero = "5581992140769";
    let mensagem = "✅ *NOVO PEDIDO PAGO - IGOR IMPØRTS* ✅\n\n";
    mensagem += "⚠️ *ATENÇÃO: ESTOU ENVIANDO O COMPROVANTE DO PIX ABAIXO!* ⚠️\n\n";
    mensagem += "Produtos escolhidos:\n";
    
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} (Tam: ${item.tamanho}) - R$ ${item.valor.toFixed(2).replace('.', ',')}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.valor, 0);
    mensagem += `\n💰 *Total pago: R$ ${total.toFixed(2).replace('.', ',')}*`;

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// CALCULAR FRETE
function calcularFrete(id) {
    const res = document.getElementById(`res-${id}`);
    const inputCep = document.getElementById(`cep-${id}`);
    const cep = inputCep.value.trim();

    if (cep.length !== 8) {
        res.innerText = "ERRO: DIGITE UM CEP COM 8 NÚMEROS!";
        res.style.color = "#ff4444";
        inputCep.style.borderColor = "#ff4444";
        return;
    }

    inputCep.style.borderColor = "var(--gold)";
    res.style.color = "#fff";
    res.innerText = "CONSULTANDO CEP...";

    setTimeout(() => {
        if (cep.startsWith("5")) {
            res.innerText = "FRETE GRÁTIS PARA SUA REGIÃO!";
            res.style.color = "#00ff00";
        } else {
            res.innerText = "FRETE FIXO: R$ 25,00 PARA TODO BRASIL";
            res.style.color = "#d4af37";
        }
    }, 1200);
}

// FUNÇÕES DE TOPO E ROLAGEM
function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const btnTop = document.getElementById("back-to-top");
    if (btnTop) {
        btnTop.style.display = (window.scrollY > 400) ? "flex" : "none";
    }
});

// EVENTOS DE CATEGORIA
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.cat-btn.active');
        if(activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');
        renderizar(btn.getAttribute('data-filter'));
    });
});

// CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const content = document.getElementById('main-content');
        if(loader) loader.style.display = 'none';
        if(content) content.style.display = 'block';
        renderizar();
    }, 2000);
});

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) fecharCarrinho();
}