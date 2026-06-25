const HEADER = document.querySelector('header');

if (HEADER.classList.contains('header-menu')) {
    HEADER.innerHTML = `
    
    <nav class="nav-menu">
			<button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><img id="menu-img" src="/src/img/menu-button.png" alt=""></button>
			
			<ul class="list-nav">
				<li class="nav-option"><a href="/">HOME</a></li>
				<li class="nav-option"><a href="/quem-somos/">QUEM SOMOS</a></li>
				<li class="nav-option"><a href="/vantagens/">VANTAGENS</a></li>
				<li class="nav-option"><a href="/nossas-lavanderias/" >NOSSAS LAVANDERIAS</a></li>
			    <li class="nav-option"><a href="/entre-contato/" >ENTRE EM CONTATO</a></li>
				<li class="nav-option"><a href="/franquie/" >FRANQUIE</a></li>
			</ul>
		</nav>
    
    `
}