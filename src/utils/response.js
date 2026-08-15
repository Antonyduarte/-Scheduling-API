function response(status, message, affectedRows = 0, data = null) {
  return {
    status,
    message,
    affectedRows,
    afctdrows: affectedRows,
    data,
    timeStamp: Date.now(),
  };
}
module.exports = response;
