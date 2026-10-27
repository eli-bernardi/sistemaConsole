const token = localStorage.setItem('token')

if (!token) {
    location.href = '../index.js'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const idAgendamento = document.getElementById('idAgendamento').value

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        tipoServico: document.getElementById('tipoServico').value,
        idCliente: document.getElementById('idCliente').value,
        idConsole: document.getElementById('idConsole').value,

    }

    fetch(`http://localhost:3000/agendamento/atualizar/:${idAgendamento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores),

    }).then(res => {
        if (!res.ok) {
            localStorage.clear()
            alert('Faça login novamente, tempo expirado!')
            location.href = '../index.html'
            throw new Error('Sessão expirada')
        }
        return res.json()
    })
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao atualizar cliente:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})