(function() {
	emailjs.init({
		publicKey: import.meta.env.VITE_API_KEY,
	})
})();

window.onload = function() {
	this.document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		
		const nome = document.getElementById("nome").value;
		const email = document.getElementById("email").value;
		
		if (nome.trim() === "" || email.trim() === "") {
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
