function buscarCEP(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário ao dar submit
    
    const cep = document.getElementById("cep").value.replace("-", "");  // Remove o traço para verificar a quantidade de caracteres
    if (cep.length !== 8) {
        document.getElementById("resultado").innerHTML = `<p class="error">CEP inválido. O CEP deve ter 8 dígitos.</p>`;
        return;
    }
    const url = `https://viacep.com.br/ws/${cep}/json/`; // URL da API para buscar o CEP

    document.getElementById("resultado").innerHTML = "<p>Carregando...</p>";  // Exibe mensagem de carregamento

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("CEP não encontrado");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("resultado").innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>  
                <p><strong>Região:</strong> ${data.regiao}</p>  
            `;
        })
        .catch(error => {
            document.getElementById("resultado").innerHTML = `<p class="error">${error.message}</p>`;
        });
};  

document.getElementById("buscar").addEventListener("click", buscarCEP); // função do clickzinho

document.getElementById("cep").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarCEP(event);  // corrigindo o erro maldito do enter 
    }
});

document.getElementById("cep").addEventListener("input", function(event) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito (números)
    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5, 8); // Formata como CEP
    }
    event.target.value = value;
});
// Adiciona máscara de CEP ao campo de entrada

function salvarNoHistorico(cep, data) {
    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ cep, data });
    localStorage.setItem("historico", JSON.stringify(historico));
} // Função para salvar o CEP no localStorage (tenebroso, mas funciona)