(function() {
	emailjs.init({
		publicKey: import.meta.env.VITE_API_KEY,
	})
})();

window.onload = function() {
	this.document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault()

		emailjs.sendForm('contact_service', 'auto-reply-lavanderia', this).then(() => {
			console.log("sucesso");
		}, (error) => {
			console.log("erro: " + error + " " + error.text);
		});
	});
}
