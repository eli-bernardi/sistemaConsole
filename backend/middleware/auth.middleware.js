const cryptoJS = require('crypto-js')
const secretKey = 'Gabriela_S2'

function authMiddleware(req, res, next) {
    const token = req.header['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const bytes = cryptoJS.AES.decrypt(token, secretKey)
        const dadosDescriptografados = bytes.toString(cryptoJS.enc.Utf8)

        if (!dadosDescriptografados) {
            return res.status(401).json({ message: 'Token inválido!' })
        }

        const payload = JSON.parse(dadosDescriptografados)

        if (Date.now() > payload.expiraEm) {
            return res.status(401).json({ message: 'Sessao expirada!' })
        }

        req.usuario = payload

        next()
    } catch (err) {
        return res.status(401).json({ message: 'Falha na autenticação do token!' })
    }
}

module.exports = authMiddleware