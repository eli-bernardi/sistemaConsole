const Console = require('../models/Console')

const cryptoJS = require('crypto-js')
const secretKey = 'Gabriela_S2'

const cadastrar = async (req, res) => {
    const valores = req.body
    console.log(valores)

    if (!valores.modelo || !valores.marca || !valores.numeroSerie || !valores.tipoServico || !valores.idCliente) {
        return res.status(401).json({ message: 'Todos os dados devem ser inseridos!' })
    }

    try {
        const numeroSerieCriptografado = cryptoJS.AES.encrypt(valores.numeroSerie, secretKey)

        await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numeroSerie: numeroSerieCriptografado,
            tipoServico: valores.tipoServico,
            idCliente: valores.idCliente
        })
        return res.status(201).json({ message: 'Operação executada com êxito!' })
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}

const listar = async (req, res) => {
    try {
        const console = await Console.findAll()
        let resultado = []

        console.forEach((el) => {
            let numeroSerieDescriptografado = ''
            try {
                const bytes = cryptoJS.AES.decrypt(el.numeroSerie, secretKey)
                numeroSerieDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                numeroSerieDescriptografadoF = 'Erro ao descriptografar'
                console.error(numeroSerieDescriptografado, err)
            }
            resultado.push({
                codConsole: el.codConsole,
                modelo: el.modelo,
                marca: el.marca,
                numeroSerie: numeroSerieDescriptografado,
                tipoServico: el.tipoServico,
                idCliente: el.idCliente,
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}

module.exports = { cadastrar, listar }