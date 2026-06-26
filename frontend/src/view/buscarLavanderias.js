function buscarLavanderias() {
    // 1. Lista completa com  70 locais
    const lavanderias = [
        // SÃO PAULO CAPITAL
        { nome: "Unidade Sé", desc: "Sua lavanderia no coração de SP.", bairro: "Centro", cep: "01001-000", tel: "11 9999-0001" },
        { nome: "Unidade Vila Mariana", desc: "Cuidado especial com suas roupas.", bairro: "Vila Mariana", cep: "04006-000", tel: "11 9999-0002" },
        { nome: "Unidade Itaim Bibi", desc: "Lavagem premium e rápida.", bairro: "Itaim Bibi", cep: "04531-000", tel: "11 9999-0003" },
        { nome: "Unidade Santo Amaro", desc: "Praticidade para o seu dia.", bairro: "Santo Amaro", cep: "04711-000", tel: "11 9999-0004" },
        { nome: "Unidade Pinheiros", desc: "Roupas limpas em minutos.", bairro: "Pinheiros", cep: "05413-000", tel: "11 9999-0005" },
        { nome: "Unidade Lapa", desc: "Qualidade garantida.", bairro: "Lapa", cep: "05003-000", tel: "11 9999-0006" },
        { nome: "Unidade Tatuapé", desc: "A melhor da Zona Leste.", bairro: "Tatuapé", cep: "03314-000", tel: "11 9999-0007" },
        { nome: "Unidade Mooca", desc: "Tradição em lavar bem.", bairro: "Mooca", cep: "03121-020", tel: "11 9999-0008" },
        { nome: "Unidade Santana", desc: "Sua lavanderia na Zona Norte.", bairro: "Santana", cep: "02011-000", tel: "11 9999-0009" },
        { nome: "Unidade Tucuruvi", desc: "Rápida e eficiente.", bairro: "Tucuruvi", cep: "02302-000", tel: "11 9999-0010" },

        // SÃO PAULO - DEMAIS CIDADES
        { nome: "Unidade Campinas", desc: "A melhor lavanderia de Campinas.", bairro: "Centro", cep: "13013-000", tel: "19 9888-0001" },
        { nome: "Unidade Santos", desc: "Roupas limpas no litoral.", bairro: "Gonzaga", cep: "11060-000", tel: "13 9888-0002" },
        { nome: "Unidade São Bernardo", desc: "Próxima ao centro.", bairro: "Centro", cep: "09710-000", tel: "11 9888-0003" },
        { nome: "Unidade Ribeirão Preto", desc: "Cuidado premium no interior.", bairro: "Centro", cep: "14010-000", tel: "16 9888-0004" },
        { nome: "Unidade Sorocaba", desc: "Referência na região.", bairro: "Centro", cep: "18010-000", tel: "15 9888-0005" },
        { nome: "Unidade São José", desc: "Eficiência e rapidez.", bairro: "Centro", cep: "12210-000", tel: "12 9888-0006" },
        { nome: "Unidade Santo André", desc: "Atendimento de qualidade.", bairro: "Jardim", cep: "09090-000", tel: "11 9888-0007" },
        { nome: "Unidade Osasco", desc: "Praticidade para você.", bairro: "Centro", cep: "06010-000", tel: "11 9888-0008" },
        { nome: "Unidade Guarulhos", desc: "Limpas e cheirosas.", bairro: "Centro", cep: "07010-000", tel: "11 9888-0009" },
        { nome: "Unidade Jundiaí", desc: "Melhor preço da cidade.", bairro: "Centro", cep: "13201-000", tel: "11 9888-0010" },

        // RIO DE JANEIRO
        { nome: "Unidade Copacabana", desc: "Pertinho da praia.", bairro: "Copacabana", cep: "22020-001", tel: "21 9777-0001" },
        { nome: "Unidade Barra", desc: "Premium e moderna.", bairro: "Barra da Tijuca", cep: "22631-000", tel: "21 9777-0002" },
        { nome: "Unidade Tijuca", desc: "Tradição carioca.", bairro: "Tijuca", cep: "20511-000", tel: "21 9777-0003" },
        { nome: "Unidade Botafogo", desc: "Agilidade no seu dia.", bairro: "Botafogo", cep: "22250-040", tel: "21 9777-0004" },
        { nome: "Unidade Rio Centro", desc: "No coração do RJ.", bairro: "Centro", cep: "20040-002", tel: "21 9777-0005" },
        { nome: "Unidade Niterói", desc: "Melhor opção em Niterói.", bairro: "Icaraí", cep: "24220-001", tel: "21 9777-0006" },
        { nome: "Unidade Petrópolis", desc: "Sua lavanderia na serra.", bairro: "Centro", cep: "25620-000", tel: "24 9777-0007" },
        { nome: "Unidade Búzios", desc: "Cuidado mesmo nas férias.", bairro: "Centro", cep: "28950-000", tel: "22 9777-0008" },
        { nome: "Unidade Caxias", desc: "Rapidez e preço baixo.", bairro: "Centro", cep: "25010-000", tel: "21 9777-0009" },
        { nome: "Unidade Angra", desc: "Qualidade garantida.", bairro: "Centro", cep: "23900-000", tel: "24 9777-0010" },

        // CAPITAIS BRASIL
        { nome: "Unidade Rio Branco", desc: "Lavanderia AC.", bairro: "Centro", cep: "69900-000", tel: "68 9999-0000" },
        { nome: "Unidade Maceió", desc: "Lavanderia AL.", bairro: "Centro", cep: "57020-000", tel: "82 9999-0000" },
        { nome: "Unidade Manaus", desc: "Lavanderia AM.", bairro: "Centro", cep: "69005-000", tel: "92 9999-0000" },
        { nome: "Unidade Macapá", desc: "Lavanderia AP.", bairro: "Centro", cep: "68900-000", tel: "96 9999-0000" },
        { nome: "Unidade Salvador", desc: "Lavanderia BA.", bairro: "Centro", cep: "40020-000", tel: "71 9999-0000" },
        { nome: "Unidade Fortaleza", desc: "Lavanderia CE.", bairro: "Centro", cep: "60060-000", tel: "85 9999-0000" },
        { nome: "Unidade Brasília", desc: "Lavanderia DF.", bairro: "Asa Sul", cep: "70040-000", tel: "61 9999-0000" },
        { nome: "Unidade Vitória", desc: "Lavanderia ES.", bairro: "Centro", cep: "29010-000", tel: "27 9999-0000" },
        { nome: "Unidade Goiânia", desc: "Lavanderia GO.", bairro: "Centro", cep: "74015-000", tel: "62 9999-0000" },
        { nome: "Unidade São Luís", desc: "Lavanderia MA.", bairro: "Centro", cep: "65010-000", tel: "98 9999-0000" },
        { nome: "Unidade Belo Horizonte", desc: "Lavanderia MG.", bairro: "Centro", cep: "30140-000", tel: "31 9999-0000" },
        { nome: "Unidade Campo Grande", desc: "Lavanderia MS.", bairro: "Centro", cep: "79002-000", tel: "67 9999-0000" },
        { nome: "Unidade Cuiabá", desc: "Lavanderia MT.", bairro: "Centro", cep: "78005-000", tel: "65 9999-0000" },
        { nome: "Unidade Belém", desc: "Lavanderia PA.", bairro: "Centro", cep: "66013-000", tel: "91 9999-0000" },
        { nome: "Unidade João Pessoa", desc: "Lavanderia PB.", bairro: "Centro", cep: "58010-000", tel: "83 9999-0000" },
        { nome: "Unidade Recife", desc: "Lavanderia PE.", bairro: "Centro", cep: "50030-000", tel: "81 9999-0000" },
        { nome: "Unidade Teresina", desc: "Lavanderia PI.", bairro: "Centro", cep: "64000-000", tel: "86 9999-0000" },
        { nome: "Unidade Curitiba", desc: "Lavanderia PR.", bairro: "Centro", cep: "80010-000", tel: "41 9999-0000" },
        { nome: "Unidade Natal", desc: "Lavanderia RN.", bairro: "Centro", cep: "59010-000", tel: "84 9999-0000" },
        { nome: "Unidade Porto Velho", desc: "Lavanderia RO.", bairro: "Centro", cep: "76801-000", tel: "69 9999-0000" },
        { nome: "Unidade Boa Vista", desc: "Lavanderia RR.", bairro: "Centro", cep: "69301-000", tel: "95 9999-0000" },
        { nome: "Unidade Porto Alegre", desc: "Lavanderia RS.", bairro: "Centro", cep: "90010-000", tel: "51 9999-0000" },
        { nome: "Unidade Florianópolis", desc: "Lavanderia SC.", bairro: "Centro", cep: "88010-000", tel: "48 9999-0000" },
        { nome: "Unidade Aracaju", desc: "Lavanderia SE.", bairro: "Centro", cep: "49010-000", tel: "79 9999-0000" },
        { nome: "Unidade Palmas", desc: "Lavanderia TO.", bairro: "Centro", cep: "77001-000", tel: "63 9999-0000" },

        // CIDADES ADICIONAIS
        { nome: "Unidade Uberlândia", desc: "Interior de MG.", bairro: "Centro", cep: "38400-000", tel: "34 9999-1111" },
        { nome: "Unidade Contagem", desc: "Região metropolitana.", bairro: "Centro", cep: "32010-000", tel: "31 9999-2222" },
        { nome: "Unidade Londrina", desc: "Destaque no PR.", bairro: "Centro", cep: "86010-000", tel: "43 9999-3333" },
        { nome: "Unidade Maringá", desc: "Qualidade garantida.", bairro: "Centro", cep: "87013-000", tel: "44 9999-4444" },
        { nome: "Unidade Caxias do Sul", desc: "Serra Gaúcha.", bairro: "Centro", cep: "95010-000", tel: "54 9999-5555" },
        { nome: "Unidade Pelotas", desc: "Melhor opção do Sul.", bairro: "Centro", cep: "96010-000", tel: "53 9999-6666" },
        { nome: "Unidade Joinville", desc: "Sua lavanderia em SC.", bairro: "Centro", cep: "89201-000", tel: "47 9999-7777" },
        { nome: "Unidade B. Camboriú", desc: "Lavagem expressa.", bairro: "Centro", cep: "88330-000", tel: "47 9999-8888" },
        { nome: "Unidade Feira de Santana", desc: "Referência baiana.", bairro: "Centro", cep: "44001-000", tel: "75 9999-9999" },
        { nome: "Unidade Olinda", desc: "Lavanderia em Olinda.", bairro: "Centro", cep: "53010-000", tel: "81 9888-1111" },
        { nome: "Unidade Juazeiro do Norte", desc: "Interior do CE.", bairro: "Centro", cep: "63010-000", tel: "88 9888-2222" },
        { nome: "Unidade Aparecida de Goiânia", desc: "Praticidade GO.", bairro: "Centro", cep: "74900-000", tel: "62 9888-3333" },
        { nome: "Unidade Vila Velha", desc: "Cuidado total no ES.", bairro: "Centro", cep: "29100-000", tel: "27 9888-4444" },
        { nome: "Unidade Dourados", desc: "Lavanderia MS.", bairro: "Centro", cep: "79800-000", tel: "67 9888-5555" }
    ];

    const input = document.getElementById('campo-cep');
    const lista = document.getElementById('lista-lavanderias');

    if (!input || !lista) {
        console.error("Erro: Elementos não encontrados.");
        return;
    }

    const termoBusca = input.value.toLowerCase().replace(/[^0-9a-z]/g, ''); 
    lista.innerHTML = ""; 

    const resultados = lavanderias.filter(lav => {
        const cepLimpo = lav.cep.replace(/[^0-9a-z]/g, '');
        return cepLimpo.startsWith(termoBusca) || lav.bairro.toLowerCase().includes(termoBusca) || lav.nome.toLowerCase().includes(termoBusca);
    });

    
    
    if (resultados.length > 0) {
        resultados.forEach(lav => {
            lista.innerHTML += `
                <div class="box-lavanderia">
                    <div class="box-interna">
                        <div class="comentario-transparente">
                            <h3>${lav.nome}</h3>
                            <p>${lav.desc}</p>
                            <small>CEP: ${lav.cep} | Bairro: ${lav.bairro}</small>
                        </div>
                        <div class="botoes-grupo">
                            <button class="btn btn-outline-success">${lav.tel}</button>
                            <button class="btn btn-primary">Ver Rotas</button>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        lista.innerHTML = "<p class='text-white'>Nenhuma lavanderia encontrada para este termo.</p>";
    }
}