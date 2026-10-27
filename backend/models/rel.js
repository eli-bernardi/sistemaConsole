const Agendamento = require('./Agendamento')
const Cliente = require('./Cliente')
const Console = require('./Console')

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})


Cliente.hasMany(Console, {
    foreignKey: 'idCliente',
    as: 'consoleCliente',
    onDelete: 'CASCADE'
})

Console.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteConsole',
    allowNull: false
})


Console.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'agendamentoConsole',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'idConsole',
    as: 'consoleAgendamento',
    allowNull: false
})

module.exports = { Agendamento, Cliente, Console }