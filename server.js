const express = require("express");
const cors = require("cors");
const usuarios_router = require("./backend/routers/usuarios_routes");
const franquias_router = require("./backend/routers/franquias_routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarios_router);
app.use("/franquias", franquias_router);

app.listen(DB_PORT, () => {
	console.log(`tá rodando em http://localhost:${DB_PORT}`);
});
