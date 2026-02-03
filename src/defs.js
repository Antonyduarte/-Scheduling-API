
function Scheduling(cliente, data, hora) {
    return {
        cliente: cliente,
        data: data,
        hora: hora,
        timestamp: new Date().getTime()
    }
}
// saída esperada
// {
//  cliente: "Antony",
//  data: "20/02/2026",
//  hora: "13:30 PM"
//  timestamp: horário/data da resposta gerada
// }
function response(status, message, afctdrows, data = null) {
    return {
        status,
        message,
        afctdrows,
        data,
        timesTamp: new Date().getTime()
    }
}
// Saída esperada
//      {
//         status: "Erro" ,
//         message: "Horário já ocupado" ,
//         afctdrows: affectedRows,
//         data: null,
//         timesTamp: new Date().getTime()
//     }

module.exports = {
    Scheduling, response
}