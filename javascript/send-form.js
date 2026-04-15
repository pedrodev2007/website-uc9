window.onload = function() {
    this.document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('contact-service', 'contact-form', this).then(() => {
            console.log("sucesso");
        }, (error) => {
            console.log("erro: " + error);
        });
    });
}