const OFFCANVAS_CONTAINER = document.querySelector('#offcanvas_container');

OFFCANVAS_CONTAINER.innerHTML = `

<div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
            
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <ul class="list-offcanvas">
            <li class="offcanvas-option"><a href="index.html">HOME</a></li>
            <li class="offcanvas-option"><a href="pages/quem-somos/">QUEM SOMOS</a></li>
            <li class="offcanvas-option"><a href="">VANTAGENS</a></li>
            <li class="offcanvas-option"><a href="">NOSSAS LAVANDERIAS</a></li>
            <li class="offcanvas-option"><a href="pages/entre-contato/">ENTRE EM CONTATO</a></li>
            <li class="offcanvas-option"><a href="pages/franquie/">FRANQUIE</a></li>
            <li class="offcanvas-option"><a href="creditos/">CRÉDITOS</a></li>
        </ul>
    </div>
</div>


`