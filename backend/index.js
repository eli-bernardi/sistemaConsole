const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const HOST = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/authMiddleware.controller')
const clienteController = require('./controller/cliente.controller')
const consoleController = require('./controller/console.controller')
const agendamentoController = require('./controller/agendamento.controller')

//Middlware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//---------------- Rotas Públicas ------------------

app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação Rodando!' })
})

// Middleware de Autenticação para proteger as rotas abaixo
app.use(authMiddleware)

//---------------- Rotas Privadas ------------------

//Rotas privadas do Cliente
app.get('/cliente/listar', clienteController.listar)
app.get('/cliente/consultar/:id', clienteController.consultar)
app.put('/cliente/atualizar/:id', clienteController.atualizar)
app.delete('/cliente/apagar/:id', clienteController.apagar)

//Rotas privadas do Veiculo
app.post('/console', consoleController.cadastrar)
app.post('/console/listar', consoleController.listar)

//Rotas privadas do Agendamento
app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamento/listar', agendamentoController.listar)
app.get('/agendamento/atualizar/:id', agendamentoController.atualizar)


//---------------- Server ------------------

conn.sync()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`Servidor rodando em http://${HOST}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o Banco de Dados!', err)
    })