function gerar_infomacoes(qtd_itens, qtd_grupos){
    let itens = [];
    for (let item = 1; item <= qtd_itens; item++) {
        itens.push(Math.floor(Math.random() * qtd_grupos) + 1);
    }

    let data = {
        grupos: [],
        tamanho: []
    }
    for (let g = 1; g <= qtd_grupos; g++) { data.grupos.push(g) }
    
    for (let t = 0; t < data.grupos.length; t++) {
        data.tamanho.push(itens.filter(item => item === data.grupos[t]).length);
    }

    return data;
}

function exibir_grafico(grafico, tipo, data) {
    let chart = new Chart(grafico, {
        type: tipo,
        data: {
            labels: data.grupos,
            datasets: [{
                label: 'Tamanho dos grupos',
                data: data.tamanho,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
        
    });
    
}

document.getElementById('botao-gerar')
.addEventListener('click', () => {
    const area_grafico = document.getElementById('area-grafico');
    area_grafico.innerHTML = '';
    area_grafico.innerHTML = '<canvas id="grafico"></canvas>';
    
    try {
        const quantidade_itens = document.getElementById('quantidade-itens').value;
        const quantidade_grupos = document.getElementById('quantidade-grupos').value; 
        const tipo_grafico = document.getElementById('tipo-grafico').value;
        if (!quantidade_itens || !quantidade_grupos) {
            throw Error();
        }

        const data = gerar_infomacoes(quantidade_itens, quantidade_grupos);
        const grafico = document.getElementById('grafico');

        exibir_grafico(grafico, tipo_grafico, data);
        
    } catch (err) {
        window.alert('Algo deu errado. Verifique os valores digitados.')
    }

});