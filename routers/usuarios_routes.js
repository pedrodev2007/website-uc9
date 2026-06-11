const express = require("express");
const usuarios_router = express.Router();

const controller = require("../controllers/usuario_controller");

usuarios_router.get("/", controller.listar);
usuarios_router.post("/", controller.salvar);
usuarios_router.post("/:login", controller.login);
usuarios_router.delete("/:id", controller.excluir);
usuarios_router.put("/:id", controller.atualizar);

module.exports = usuarios_router;