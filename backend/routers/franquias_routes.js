const express = require("express");
const franquias_router = express.Router();

const controller = require("../controllers/franquias_controller");

franquias_router.get("/:id", controller.listar);
franquias_router.post("/:id", controller.salvar);
franquias_router.delete("/:id", controller.excluir);

module.exports = franquias_router;
