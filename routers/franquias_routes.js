const express = require("express");
const franquias_router = express.Router();

const controller = require("../controllers/franquias_controller");

franquias_router.get("/", controller.listar);
franquias_router.post("/", controller.salvar);
franquias_router.delete("/:id", controller.excluir);
franquias_router.put("/:id", controller.atualizar);

module.exports = franquias_router;
