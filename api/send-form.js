export default {
    fetch() {
        (function() {
            emailjs.init({
                publicKey: process.env.API_KEY,
            })
        })();
        /*
        function emailValido(email) {
            const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return padrao.test(email);
        } função para verificar o email | não utilizado por conta da própria verificação do HTML*/

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
                
                /*
                if (nome == "" || email == "") {
                    alert("Os campos nome e email devem estar preenchidos");
                    return;
                }
                
                if (!emailValido(email)) {
                    alert("Email inválido!");
                    return;
                } apenas para mostrar como poderia ser feito de outra forma */

                
            });
        }
    }
}







