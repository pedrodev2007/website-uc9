const FOOTER = document.querySelector('footer');

if (FOOTER.classList.contains('main-footer')) {
    FOOTER.innerHTML = `
    
    <div id="footer-top-container">
			<div class="footer-top-div">
				<a href="pages/quem-somos/index.html">QUEM SOMOS</a>
				<a href="">NOSSAS LAVANDERIAS</a>
			</div>
			<div class="footer-top-div">
				<a href="pages/entre-contato/index.html">ENTRE EM CONTATO</a>
				<a href="pages/franquie/index.html">FRANQUIE</a>
			</div>
		</div>
		<div id="footer-bottom-container">
			<div class="footer-bottom-div">
				<p>Atendimento 24 horas, de domingo a domingo.</p>
				<a href="pages/creditos/index.html" id="credits">Créditos</a>
			</div>
		</div>	
    
    `
}