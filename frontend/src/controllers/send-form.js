import { verificarInputValue } from "../utils/verificarInputValue";

window.onload = function() {
	this.document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		
		const name = document.getElementById("nome").value;
		const email = document.getElementById("email").value;
		const telefone = document.getElementById("telefone").value;
		const cidade = document.getElementById("cidade").value;
		const investimento = document.getElementById("investimento").value;
		const estados_brasil = document.getElementById("estados_brasil").value;
		
		if (verificarInputValue(name) != 0 || verificarInputValue(email) != 0) {
			alert("Nome ou email inválidos.");
			return;
		} 
		
		try {
			const resposta = await fetch('https://website-uc9.onrender.com/api/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, telefone, cidade, investimento, estados_brasil })
			});

			const resultado = await resposta.json();

			if (resultado.success === true) {
				alert("Email enviado com sucesso!");
				document.getElementById('contact-form').reset();
			} else {
				alert("Algo de errado aconteceu! Erro: " + resultado.error);
			}
		} catch (error) {
			alert("Erro com a conexão do servidor! Erro: " + error.message);
		}
	});
}
