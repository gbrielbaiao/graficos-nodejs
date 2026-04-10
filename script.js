function eh_primo(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(Math.abs(n)); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function classificar_numero(num, grupos_selecionados) {
    const categorias = [];

    if (grupos_selecionados.includes('primos') && eh_primo(Math.abs(num))) categorias.push('primos');
    if (grupos_selecionados.includes('pares') && num % 2 === 0) categorias.push('pares');
    if (grupos_selecionados.includes('impares') && num % 2 !== 0) categorias.push('impares');
    if (grupos_selecionados.includes('negativos') && num < 0) categorias.push('negativos');
    if (grupos_selecionados.includes('positivos') && num > 0) categorias.push('positivos');

    if (categorias.length === 0 && grupos_selecionados.includes('outros')) {
        categorias.push('outros');
    }

    return categorias;
}

function gerar_informacoes(qtd_itens, grupos_selecionados) {
    const itens = [];
    for (let i = 0; i < qtd_itens; i++) {
        itens.push(Math.floor(Math.random() * 151) - 50);
    }

    const nomes_grupos = {
        primos:    'Primos',
        pares:     'Pares',
        impares:   'Ímpares',
        negativos: 'Negativos',
        positivos: 'Positivos',
        outros:    'Outros'
    };

    const contagem = {};
    grupos_selecionados.forEach(g => { contagem[g] = 0; });

    itens.forEach(num => {
        const cats = classificar_numero(num, grupos_selecionados);
        cats.forEach(c => { contagem[c]++; });
    });

    const data = {
        grupos:  grupos_selecionados.map(g => nomes_grupos[g]),
        tamanho: grupos_selecionados.map(g => contagem[g]),
        qtd_itens
    };

    return data;
}

function exibir_grafico(grafico, tipo, data) {
    const cores = [
        '#2563EB', '#16A34A', '#DC2626', '#D97706',
        '#7C3AED', '#0891B2'
    ];

    const chart = new Chart(grafico, {
        type: tipo,
        data: {
            labels: data.grupos,
            datasets: [{
                label: 'Quantidade por grupo',
                data: data.tamanho,
                backgroundColor: cores.slice(0, data.grupos.length).map(c => c + 'CC'),
                borderColor: cores.slice(0, data.grupos.length),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

document.getElementById('botao-gerar')
.addEventListener('click', () => {
    const area_grafico = document.getElementById('area-grafico');

    try {
        const quantidade_itens = parseInt(document.getElementById('quantidade-itens').value);

        const grupos_selecionados = ['primos', 'pares', 'impares', 'negativos', 'positivos', 'outros']
            .filter(g => document.getElementById('grupo-' + g).checked);

        if (!quantidade_itens || quantidade_itens <= 0) {
            throw new Error('Quantidade de itens inválida.');
        }
        if (grupos_selecionados.length === 0) {
            throw new Error('Selecione ao menos um grupo.');
        }

        area_grafico.innerHTML = '<canvas id="grafico"></canvas>';

        const data = gerar_informacoes(quantidade_itens, grupos_selecionados);
        const tipo_grafico = document.getElementById('tipo-grafico').value;
        const grafico = document.getElementById('grafico');

        exibir_grafico(grafico, tipo_grafico, data);

    } catch (err) {
        area_grafico.innerHTML = '<p>Seu gráfico aparecerá aqui após ser criado.</p>';
        window.alert('Algo deu errado: ' + err.message);
    }
});
