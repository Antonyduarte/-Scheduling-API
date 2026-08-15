const requiredVariables = ["DB_HOST", "DB_USER", "DB_NAME"];

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  return value;
}

function getPort(value, fallback) {
  const parsedValue = Number(value ?? fallback);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0 || parsedValue > 65535) {
    throw new Error("A porta configurada deve ser um número entre 1 e 65535.");
  }
  return parsedValue;
}

requiredVariables.forEach(getRequiredEnv);

module.exports = {
  port: getPort(process.env.PORT, 3000),
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS ?? "",
    database: process.env.DB_NAME,
    port: getPort(process.env.DB_PORT, 3306),
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
};
