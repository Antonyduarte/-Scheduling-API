const mysql = require("mysql2")
const express = require("express")
const app = express()

function response(status, message, afctdrows, data = null) {
    return {
        status,
        message,
        afctdrows,
        data,
        timeStamp: new Date().getTime()
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
function Scheduling(id, cliente, data, hora) {
    return {
        id: Number(id),
        cliente: String(cliente),
        data: data,
        hora: hora
    }
}
// saída esperada
// {
//  cliente: "Antony",
//  data: "2026-05-02",
//  hora: "13:30: PM"
//  timestamp: horário/data da resposta gerada
// }
module.exports = {
    Scheduling, response
}