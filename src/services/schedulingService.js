const schedulingRepository = require("../repositories/schedulingRepository");
const AppError = require("../utils/AppError");

function validateId(id) {
  const parsedId = Number(id);
  if (!Number.isSafeInteger(parsedId) || parsedId <= 0) throw new AppError("ID do agendamento inválido", 400);
  return parsedId;
}
function isValidIsoDate(date) {
  const parsedDate = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === date;
}
function validateSchedulingInput({ Cliente, Data, Horario } = {}) {
  const cliente = typeof Cliente === "string" ? Cliente.trim() : "";
  const data = typeof Data === "string" ? Data.trim() : "";
  const horario = typeof Horario === "string" ? Horario.trim() : "";
  if (!cliente) throw new AppError("O campo CLIENTE está vazio", 400);
  if (cliente.length > 255) throw new AppError("O campo CLIENTE deve ter no máximo 255 caracteres", 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || !isValidIsoDate(data)) throw new AppError("Data inválida. Formato esperado: YYYY-MM-DD", 400);
  if (!/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(horario)) throw new AppError("Horário inválido. Formato esperado: HH:MM ou HH:MM:SS", 400);
  return { cliente, data, horario };
}
async function list() { return schedulingRepository.findAll(); }
async function getById(id) {
  const scheduling = await schedulingRepository.findById(validateId(id));
  if (!scheduling) throw new AppError("Agendamento não encontrado", 404);
  return scheduling;
}
async function create(input) {
  const scheduling = validateSchedulingInput(input);
  if (await schedulingRepository.existsAt(scheduling.data, scheduling.horario)) throw new AppError("Horário já ocupado", 409);
  const id = await schedulingRepository.create(scheduling);
  return { id, ...scheduling };
}
async function removeById(id) {
  const affectedRows = await schedulingRepository.removeById(validateId(id));
  if (!affectedRows) throw new AppError("Agendamento não encontrado", 404);
  return affectedRows;
}
async function removeAll() {
  const affectedRows = await schedulingRepository.removeAll();
  if (!affectedRows) throw new AppError("Nenhum agendamento encontrado", 404);
  return affectedRows;
}
module.exports = { list, getById, create, removeById, removeAll };
