        var maxCliques = 12;
        var maxVitorias = 5;

        var cliquesRestantes = maxCliques;    
        var vidasRestantes = 7;    
        var vitorias = 0;

        var jogo = document.getElementById('jogo');
        var coracoesContainer = document.getElementById('coracoes');
        let estrelasContainer = document.getElementById('estrela');

        function iniciarJogo() {
            let tamMatriz = 9;

            let botao = document.getElementById('botao');
            let botoesControle = document.getElementById('botoes-controle');

            botao.style.display = 'none';
            jogo.style.display = 'block';
            coracoesContainer.style.display = 'flex';
            botoesControle.style.display = 'flex';

            let totalQuadrados = tamMatriz * tamMatriz;
            let quadradoCorreto = Math.floor(Math.random() * totalQuadrados);

            jogo.innerHTML = '';
            for (let i = 0; i < tamMatriz; i++) {
                let linha = document.createElement('div');
                linha.classList.add('linha');
                jogo.appendChild(linha);

                for (let k = 0; k < tamMatriz; k++) {
                    let coluna = document.createElement('div');
                    coluna.classList.add('coluna');
                    coluna.dataset.index = i * tamMatriz + k;

                    coluna.addEventListener('click', function () {
                        console.log(cliquesRestantes);
                        if (cliquesRestantes > 0) {
                            verificarDistancia(i * tamMatriz + k, quadradoCorreto, tamMatriz);
                        }
                    });

                    linha.appendChild(coluna);
                }
            }

            coracoesContainer.innerHTML = '';
            for (let i = 0; i < vidasRestantes; i++) {
                let coracao = document.createElement('div');
                coracao.classList.add('coracao');
                coracao.innerHTML = '&#9829';
                coracoesContainer.appendChild(coracao);
            }
        }

        function venceu() {
            alert('Parabéns! Você encontrou o quadrado certo!');
            vitorias++;
            cliquesRestantes = 0;
            let estrela = document.createElement('div');
            estrela.classList.add('estrelas');
            estrelasContainer.appendChild(estrela);
        }

        function verificarDistancia(index, quadradoCorreto, tamMatriz) {
            let maxDistancia = tamMatriz * 2;
            let corretoX = quadradoCorreto % tamMatriz;
            let corretoY = Math.floor(quadradoCorreto / tamMatriz);
            let clicadoX = index % tamMatriz;
            let clicadoY = Math.floor(index / tamMatriz);

            let distancia = Math.abs(corretoX - clicadoX) + Math.abs(corretoY - clicadoY);

            let quadradoClicado = document.querySelector(`.coluna[data-index='${index}']`);

            if (distancia === 0) {
                quadradoClicado.style.backgroundColor = 'turquoise';
                venceu();
            } else {
                let intensidadeAzul = Math.round(255 * (1 - distancia / maxDistancia));
                quadradoClicado.style.backgroundColor = `rgb(${255 - intensidadeAzul}, 0, ${intensidadeAzul})`;

                cliquesRestantes--;  

                if (cliquesRestantes === 0 && distancia !== 0) {
                    perderVida();
                }
            }
        }

        function perderVida() {
            vidasRestantes--;
            cliquesRestantes = 0;

            if (vidasRestantes > 0) {
                alert('Você perdeu uma vida!');

                let coracoes = document.querySelectorAll('.coracao');
                coracoes[vidasRestantes].remove();  

                reiniciarJogo();  
            } else {
                alert('Você perdeu todas as vidas! Fim de jogo.');
                voltarMenu();  
            }
        }

        function voltarMenu() {
            location.reload();
        }

        function reiniciarJogo() {
            if (vitorias == maxVitorias) {
                alert('Volte ao menu para um novo jogo!');
                return;
            }
            iniciarJogo();
            cliquesRestantes = maxCliques;  
        }

        $(document).ready(function () { });