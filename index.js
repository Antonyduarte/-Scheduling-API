// REPO: https://github.com/Antonyduarte/-Scheduling-API.git
require("dotenv").config()
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const defs = require("./src/defs")
const dbConfig = require("./src/configs")

const app = express()
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("API is running")
})
let API_AVAILABLE = true
if (!API_AVAILABLE) {
    console.log("Sorry, API is in maintnece!")
}
let API_VERSION = "1.0.0"

//pool connection
const connection = mysql.createPool(dbConfig)

// GET all Scheduling
app.get("/agendamentos", (req, res) => {
    connection.query("SELECT id, Cliente, DATE_FORMAT(Data, '%Y-%m-%d') AS Data, TIME_FORMAT (Horario, '%H:%i') AS Horario FROM agendamentos", (err, rows) => {
        if (!err) {
            if (rows.length <= 0) {
                res.status(404).json(defs.response("Erro", "Nenhum agendamento encontrado", 0, null))
            } else {
                res.status(200).json(defs.response("Sucesso", "Sucesso ao obter agendamentos", rows.affectedRows, rows))
            }
        } else {
            res.status(500).json(defs.response("Erro", err.message, 0, null))
        }
    })
})
// GET Scheduling by ID
app.get("/agendamento/:id", (req, res) => {
    const id = req.params.id
    connection.query("SELECT id, Cliente, DATE_FORMAT(Data, '%Y-%m-%d') AS Data, TIME_FORMAT (Horario, '%H:%i') AS Horario FROM agendamentos WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.length <= 0) {
                res.status(404).json(defs.response("Erro", "Agendamento não encontrado", 0, null))
            } else {
                res.status(200).json(defs.response("Sucesso", "Agendamento encontrado", rows.affectedRows, rows))
            }
        } else {
            res.status(500).json(defs.response("Erro", err.message, 0, null))
        }
    })

})
// POSTY method    
app.post("/agendamento", (req, res, next) => {
    const postData = req.body
    const Cliente = postData.Cliente
    const Data = postData.Data
    const Horario = postData.Horario
    // Formato a ser preenchido no JSON
    // {
    //   "Cliente": "José",
    //   "Data": "YYYY-MM-DD",
    //   "Horario": HH:MM:SS" (or HH:MM > seconds is optional)
    // }

    connection.query("SELECT EXISTS (SELECT 1 FROM agendamentos WHERE data = ? AND horario = ?) AS existe", [Data, Horario], (err, rows) => {

        if (!Cliente || Cliente.trim() === "") {
            return res.status(400).json(defs.response("Erro", "O campo CLIENTE está vázio", 0, null))
        }
        const regexData = /^\d{4}-\d{2}-\d{2}$/

        if (!Data || Data.trim() === "" || !regexData.test(Data)) {
            return res
                .status(400)
                .json(defs.response("Erro", "Data inválida. Formato esperado: YYYY-MM-DD", 0, null))
        }

        const regexTime = /^\d{2}:\d{2}/
        
        if (!Horario || Horario.trim() === "" || !regexTime.test(Horario)) {
            return res.status(400).json(defs.response("Erro", "Horário inválido, Formato esperado: HH:MM:SS", 0, null))
        }
        if (err) {
            return res.status(500).json(defs.response("Erro", "Erro ao verificar horários disponíveis", 0))
        }
        if (rows[0].existe === 1) {
            return res.status(409).json(defs.response("Erro", "Horário já ocupado", 0))
        }
        if (defs.Scheduling())
            connection.query("INSERT INTO agendamentos (Cliente, Data, Horario) VALUES (?, ?, ?)", [Cliente, Data, Horario], (err, result) => {

                if (err) {
                    return res.status(400).json(defs.response("Erro", err.cause, 0, null))
                } else {
                    return res.status(200).json(defs.response("Sucesso", "Horário agendado com sucesso", result.affectedRows, defs.Scheduling(
                        result.insertId, Cliente, Data, Horario
                    )))
                }
            })
    })
})
// cancel/delete scheduling by id 
app.delete("/agendamento/:id", (req, res) => {
    const id = req.params.id
    connection.query("DELETE FROM agendamentos WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows <= 0) {
                res.status(404).json(defs.response("Erro", "Agendamento não encontrado", 0, null))
            } else {
                res.status(200).json(defs.response("Sucesso", "Agendamento cancelado com sucesso", rows.affectedRows, null))
            }
        } else {
            res.status(500).json(defs.response("Erro", err.message, 0, null))
        }
    })
})
// Delete all 
app.delete("/agendamentos", (req, res) => {
    connection.query("DELETE FROM agendamentos", (err, rows) => {
        if (!err) {
            if (rows.affectedRows <= 0) {
                res.status(404).json(defs.response("Erro", "Nenhum agendamento encontrado", 0, null))
            } else {
                res.status(200).json(defs.response("Sucesso", "Agendamentos cancelados com sucesso", rows.length, null))
            }
        } else {
            res.status(500).json(defs.response("Erro", err.message, 0, null))
        }
    })
})
// invalid route
app.use((req, res) => {
    res.status(404).json(defs.response("Error", "Rota não encontrada", 0, null))
})
