// LISTA DE PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Vasco 2026",
        categoria: "brasil",
        valor: 249.90,
        tamanhos: "P, M, G, GG",
        img: "vasco.png" 
    },
    {
        id: 2,
        nome: "Real 25/26",
        categoria: "europa",
        valor: 299.90,
        tamanhos: "M, G, GG",
        img: "real.png"
    },
    {
        id: 3,
        nome: "Barcelona 25/26",
        categoria: "europa",
        valor: 229.90,
        tamanhos: "G, GG",
        img: "barcelona.png"
    },
    {
        id: 4,
        nome: "Palmeiras 25/26", // Ajustado nome
        categoria: "brasil",
        valor: 229.90,
        tamanhos: "G, GG",
        img: "palmeiras.png"
    },
    {
        id: 5,
        nome: "Barcelona 08/09",
        categoria: "retro",
        valor: 229.90,
        tamanhos: "G, GG",
        img: "barcelonaretro.png"
    },
    {
        id: 6,
        nome: "Milan 2006",
        categoria: "retro",
        valor: 229.90,
        tamanhos: "G, GG",
        img: "milan.png"
    }
];

function renderizar(filtro = 'all') {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    catalog.innerHTML = ""; 

    const listaFiltrada = filtro === 'all' ? produtos : produtos.filter(p => p.categoria === filtro);

    listaFiltrada.forEach(p => {
        catalog.innerHTML += `
            <div class="tech-card">
                <div class="product-img">
                    <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/400x400/000000/FFFFFF?text=FOTO+DO+MANTO'">
                </div>
                <div class="product-details">
                    <h3 style="margin-top: 15px;">${p.nome}</h3>
                    <div style="margin: 10px 0; font-size: 0.8rem;">
                        Tamanhos: <span style="color: #d4af37; font-weight: bold;">${p.tamanhos}</span>
                    </div>
                    <div class="price-tag">R$ ${p.valor.toFixed(2).replace('.', ',')}</div>

                    <div class="shipping-box">
                        <input type="number" placeholder="CEP" id="cep-${p.id}">
                        <button class="btn-shipping" onclick="calcularFrete(${p.id})">CALCULAR</button>
                    </div>
                    <div id="res-${p.id}" style="font-size: 0.75rem; font-weight: bold; margin-bottom: 10px;"></div>

                    <button class="btn-stadium" onclick="comprar('${p.nome}')">ADQUIRIR MANTO</button>
                </div>
            </div>
        `;
    });
}

function calcularFrete(id) {
    const res = document.getElementById(`res-${id}`);
    res.innerText = "CALCULANDO...";
    setTimeout(() => {
        res.innerText = "FRETE GRÁTIS PARA SUA REGIÃO!";
        res.style.color = "#00ff00";
    }, 1000);
}

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.cat-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderizar(btn.getAttribute('data-filter'));
    });
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        renderizar();
    }, 2000);
});

function comprar(manto) {
    const numero = "81992140769";
    window.open(`https://wa.me/${numero}?text=Quero o manto: ${manto}`, '_blank');
}