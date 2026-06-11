function obterFranquias() {
	return fetch("http://localhost:3000/franquias")
		.then(res => res.json());
}
