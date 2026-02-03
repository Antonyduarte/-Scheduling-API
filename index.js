// REPO: https://github.com/Antonyduarte/-Scheduling-API.git
const dotenv = require("dotenv").config()
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
    connection.query("SELECT * FROM agendamentos", (err, rows) => {
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
app.post("/agendamento", (req, res) => {
    const postData = req.body
    const Cliente =  postData.Cliente
    const Data = postData.Data
    const Horario = postData.Horario
// Formato a ser preenchido no JSON
// {
//   "Cliente": "José",
//   "Data": "YYYY-MM-DD",
//   "Horario": HH:MM:SS"
// }
    connection.query("INSERT INTO agendamentos (Cliente, Data, Horario) VALUES (?, ?, ?)", [Cliente, Data, Horario], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(400).json(defs.response("Erro", err.cause, 0, null))
        } else {
            return res.status(200).json(defs.Scheduling(Cliente, Data, Horario))
        }
    })
})