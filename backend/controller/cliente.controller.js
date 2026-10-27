const Cliente = require('../models/Cliente')

const cryptoJS = require('crypto-js')
const secretKey = 'Gabriela_S2'

const cadastrar = async (req, res) => {
    const valores = req.body
    console.log(valores)

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.telefone) {
        return res.status(401).json({ message: 'Todos os dados devem ser inseridos!' })
    }
    if (!valores.cpf !== 11) {
        return res.status(401).json({ message: 'CPF inválido!' })
    }

    try {
        const cpfCriptografado = cryptoJS.AES.encrypt(valores.cpf, secretKey)
        const senhaCriptografada = cryptoJS.AES.encrypt(valores.senha, secretKey)

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCriptografada,
            cpf: cpfCriptografado,
            telefone: valores.telefone
        })
        return res.status(201).json({ message: 'Operação executada com êxito!' })
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}

const listar = async (req, res) => {
    try {
        const cliente = await Cliente.findAll()
        let resultado = []

        cliente.forEach((el) => {
            let cpfDescriptografado = ''
            try {
                const bytes = cryptoJS.AES.decrypt(el.cpf, secretKey)
                cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                cpfDescriptografado = 'Erro ao descriptografado'
                console.error(cpfDescriptografado, err)
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                telefone: el.telefone,
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}


const consultar = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado!' })
        }
        const bytes = cryptoJS.AES.decrypt(el.cpf, secretKey)
        cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)


        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            senha: senhaCriptografada,
            cpf: cpfCriptografado,
            telefone: cliente.telefone
        })
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}


const atualizar = async (req, res) => {
    const id = req.params.id
    console.log(id)

    const valores = req.body
    console.log(valores)

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if (!valores.cpf) {
            if (!valores.cpf.lenght !== 11) {
                return res.status(401).json({ message: 'Cliente não encontrado!' })
            }
            dadosAtualizados.cpf = cryptoJS.AES.encrypt(valores.cpf, secretKey).toString()
        }

        if (!valores.senha) {
            dadosAtualizados.senha = cryptoJS.AES.encrypt(valores.senha, secretKey).toString()
        }


        await Cliente.update(dadosAtualizados, { where: { codCliente: id } })
        return res.status(200).json({ message: 'Operação executada com êxito!' })
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    console.log(id)

    const valores = req.body
    console.log(valores)

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado!' })
        }

        await Cliente.destroy(dadosAtualizados, { where: { codCliente: id } })
        return res.status(200).json({ message: 'Operação executada com êxito!' })
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}
module.exports = { cadastrar, listar, consultar, atualizar, apagar }