function obterFranquias(id) {
	return fetch(`http://localhost:3000/franquias/${id}`)
		.then(res => res.json());
}
