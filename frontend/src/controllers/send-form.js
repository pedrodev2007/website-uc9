import { verificarInputValue } from "../../../backend/utils/verificarInputValue";
import { carregarAPIKey } from "../../../backend/model/service/send-email";

carregarAPIKey();

window.onload = function() {
	this.document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		
		const nome = document.getElementById("nome").value;
		const email = document.getElementById("email").value;
		
		if (verificarInputValue(nome) != 0 || verificarInputValue(email) != 0) {
			alert("Nome ou email inválidos.");
			return;
		} else {
			emailjs.sendForm('contact_service', 'auto-reply-lavanderia', this).then(() => {
				console.log("sucesso");
			}, (error) => {
				console.log("erro: " + error + " " + error.text);
			});
		};
		
	});
}
