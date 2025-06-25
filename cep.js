function buscarCEP(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário ao dar submit
    
    const cep = document.getElementById("cep").value.replace("-", "");  // Remove o traço para verificar a quantidade de caracteres
    if (cep.length !== 8) {
        document.getElementById("resultado").innerHTML = `<p class="error">CEP inválido. O CEP deve ter 8 dígitos.</p>`;
        return;
    }
    
    const url = `https://viacep.com.br/ws/${cep}/json/`; // URL da API para buscar o CEP
    
    document.getElementById("resultado").innerHTML = "<p>Carregando...</p>";  // Exibe mensagem de carregamento
    
    
    
    fetch(url) // Faz a requisição para a API ViaCEP
        .then(response => { // Verifica se a resposta foi bem-sucedida
            if (!response.ok) { // Se a resposta não for ok, lança um erro
                throw new Error("CEP não encontrado"); // Lança um erro se o CEP não for encontrado
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => { // Processa os dados recebidos
            document.getElementById("resultado").innerHTML = ` 
                <p><strong>CEP:</strong> ${data.cep || "Não informado ou Não Existente"}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro || "Não informado ou Não Existente"}</p>
                <p><strong>Bairro:</strong> ${data.bairro || "Não informado ou Não Existente"}</p>
                <p><strong>Cidade:</strong> ${data.localidade || "Não informado ou Não Existente"}</p>
                <p><strong>Estado:</strong> ${data.uf || "Não informado eou Não Existente"}</p>  
                <p><strong>Região:</strong> ${data.regiao || "Não informado ou Não Existente"}</p>  
            `;
        })
        .catch(error => { // Captura erros na requisição ou no processamento dos dados
            document.getElementById("resultado").innerHTML = `<p class="error">${error.message}</p>`;
        }); // Exibe mensagem de erro se algo der errado
};  

document.getElementById("buscar").addEventListener("click", buscarCEP); // função do clickzinho 

document.getElementById("cep").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarCEP(event);  // corrigindo o erro maldito do enter 
    }
});

document.getElementById("cep").addEventListener("input", function(event) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito (números)
    if (value.length > 5) { // Se o valor tiver mais de 5 dígitos, adiciona o traço
        value = value.slice(0, 5) + '-' + value.slice(5, 8); // Formata como CEP
    }
    event.target.value = value; // Atualiza o valor do campo de entrada com a máscara
});
// Adiciona máscara (formatação) de CEP ao campo de entrada

function salvarNoHistorico(cep, data) {
    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ cep, data });
    localStorage.setItem("historico", JSON.stringify(historico));
} // Função para salvar o CEP no localStorage (tenebroso, mas funciona)