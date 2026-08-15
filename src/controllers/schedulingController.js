const schedulingService = require("../services/schedulingService");
const response = require("../utils/response");

async function list(req, res, next) {
  try { const data = await schedulingService.list(); if (!data.length) return res.status(404).json(response("Erro", "Nenhum agendamento encontrado")); return res.json(response("Sucesso", "Sucesso ao obter agendamentos", data.length, data)); } catch (error) { return next(error); }
}
async function getById(req, res, next) {
  try { const data = await schedulingService.getById(req.params.id); return res.json(response("Sucesso", "Agendamento encontrado", 1, data)); } catch (error) { return next(error); }
}
async function create(req, res, next) {
  try { const data = await schedulingService.create(req.body); return res.status(201).json(response("Sucesso", "Horário agendado com sucesso", 1, data)); } catch (error) { return next(error); }
}
async function removeById(req, res, next) {
  try { const affectedRows = await schedulingService.removeById(req.params.id); return res.json(response("Sucesso", "Agendamento cancelado com sucesso", affectedRows)); } catch (error) { return next(error); }
}
async function removeAll(req, res, next) {
  try { const affectedRows = await schedulingService.removeAll(); return res.json(response("Sucesso", "Agendamentos cancelados com sucesso", affectedRows)); } catch (error) { return next(error); }
}
module.exports = { list, getById, create, removeById, removeAll };
