const { Router } = require("express");
const controller = require("../controllers/schedulingController");
const router = Router();

router.get("/agendamentos", controller.list);
router.get("/agendamento/:id", controller.getById);
router.post("/agendamento", controller.create);
router.delete("/agendamento/:id", controller.removeById);
router.delete("/agendamentos", controller.removeAll);
module.exports = router;
