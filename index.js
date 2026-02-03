// REPO: https://github.com/Antonyduarte/-Scheduling-API.git
const dotenv = require("dotenv").config()
const express = require("express")
const mysql = require("mysql2")
const defs = require("./src/defs")
const dbConfig = require("./src/configs")

const app = express()
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, (err) => {
    if (!err) {
        console.log("API is running")
    } else {
        console.log(err.message)
    }
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
    connection.query("SELECT * FROM agendamentos", (err, result) => {
        if (!err) {
            res.status(200).json(defs.response("Sucesso", "Agendamentos encontrados com êxito", result.affectedRows, result))
        } else {
            res.status(404).json(defs.response("Erro", "Agendamento não encontrado.", 0, null))
        }
    })
})
app.post("/agendamento", (req, res) => {
    const postData = req.body
    const Cliente =  postData.Cliente
    const Data = postData.Data
    const Horario = postData.Horario
    // query
    connection.query("INSERT INTO agendamentos (Cliente, Data, Horario) VALUES (?, ?, ?)", [Cliente, Data, Horario], (err, result) => {
        if (!err) {
            return res.status(201).json(defs.response("Sucesso", "Cliente agendado com êxito", result.affectedRows, result))
        } else {
            res.status(400).json(defs.response("Erro", "Falha ao fazer agendamento", 0, null))
        }
    })
})