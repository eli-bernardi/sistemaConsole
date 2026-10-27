const Cliente = require('../models/Cliente')
const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'Gabriela_S2'

const login = async (req, res) => {
    const valores = req.body
    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Informe seu email e senha' })
    }
    try {
        const cliente = await Cliente.findOne({ where: { codCliente: id } })
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }
        const bytes = CryptoJS.AES.decrypt(ciclista.senha, CHAVE_SECRETA)
        const senhaBD = bytes.toString(CryptoJS.enc.Utf8)
        if (valores.senha !== senhaBD) {
            return res.status(404).json({ message: 'Senha incorreta!' })
        }
        const UmHoraEmMs = 1.5 * 60 * 60 * 1000
        const tempoExpirar = Date.now() + UmHoraEmMs
        const payload = {
            idCliente: cliente.codCliente,
            nome: cliente.nome,
            expirarEm: tempoExpirar
        }
        const token = CryptoJs.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: cliente.nome
        })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao tentar fazer login' })
    }
}
module.exports = { login }