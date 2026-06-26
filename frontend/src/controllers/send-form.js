import { verificarInputValue } from "../../../backend/utils/verificarInputValue";
import { enviarEmail } from "../../../backend/model/service/sendEmailService";

window.onload = function() {
	this.document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		
		const nome = document.getElementById("nome").value;
		const email = document.getElementById("email").value;
		
		if (verificarInputValue(nome) != 0 || verificarInputValue(email) != 0) {
			alert("Nome ou email inválidos.");
			return;
		} else {
			const EMAIL_RESULTADO = enviarEmail();
			
			if (EMAIL_RESULTADO == "sucesso") {
				alert("Email enviado com sucesso!");
			} else {
				alert("Algo de errado aconteceu! Erro: " + EMAIL_RESULTADO + " " + EMAIL_RESULTADO.text);
			}
		};
		
	});
}
