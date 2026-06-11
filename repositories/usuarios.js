function obterUsuarios() {
	return fetch("http://localhost:3000/usuarios")
		.then(res => res.json());
}
