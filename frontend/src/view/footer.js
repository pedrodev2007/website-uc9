const FOOTER = document.querySelector('footer');

if (FOOTER.classList.contains('main-footer')) {
    FOOTER.innerHTML = `
    
    <div id="footer-top-container">
			<div class="footer-top-div">
				<a href="/quem-somos/">QUEM SOMOS</a>
				<a href="/nossas-lavanderias/">NOSSAS LAVANDERIAS</a>
			</div>
			<div class="footer-top-div">
				<a href="/entre-contato/">ENTRE EM CONTATO</a>
				<a href="/franquie/">FRANQUIE</a>
			</div>
		</div>
		<div id="footer-bottom-container">
			<div class="footer-bottom-div">
				<p>Atendimento 24 horas, de domingo a domingo.</p>
				<a href="/creditos/" id="credits">Créditos</a>
			</div>
		</div>	
    
    `
}
