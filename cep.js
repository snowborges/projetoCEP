function buscarCEP(event) {
    event.preventDefault(); 
    
    const cep = document.getElementById("cep").value.replace("-", "");  
    if (cep.length !== 8) {
        document.getElementById("resultado").innerHTML = `<p class="error">CEP inválido. O CEP deve ter 8 dígitos.</p>`;
        return;
    }
    
    const url = `https://viacep.com.br/ws/${cep}/json/`; 
    
    document.getElementById("resultado").innerHTML = "<p>Carregando...</p>";  
    
    
    
    fetch(url) 
        .then(response => { 
            if (!response.ok) { 
                throw new Error("CEP não encontrado"); 
            }
            return response.json(); 
        })
        .then(data => { 
            document.getElementById("resultado").innerHTML = ` 
                <p><strong>CEP:</strong> ${data.cep || "Não informado ou Não Existente"}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro || "Não informado ou Não Existente"}</p>
                <p><strong>Bairro:</strong> ${data.bairro || "Não informado ou Não Existente"}</p>
                <p><strong>Cidade:</strong> ${data.localidade || "Não informado ou Não Existente"}</p>
                <p><strong>Estado:</strong> ${data.uf || "Não informado eou Não Existente"}</p>  
                <p><strong>Região:</strong> ${data.regiao || "Não informado ou Não Existente"}</p>  
            `;
        })
        .catch(error => { 
            document.getElementById("resultado").innerHTML = `<p class="error">${error.message}</p>`;
        }); 
};  

document.getElementById("buscar").addEventListener("click", buscarCEP); 

document.getElementById("cep").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarCEP(event);   
    }
});

document.getElementById("cep").addEventListener("input", function(event) {
    let value = event.target.value.replace(/\D/g, ''); 
    if (value.length > 5) { 
        value = value.slice(0, 5) + '-' + value.slice(5, 8); 
    }
    event.target.value = value; 
});

function salvarNoHistorico(cep, data) {
    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ cep, data });
    localStorage.setItem("historico", JSON.stringify(historico));
} 