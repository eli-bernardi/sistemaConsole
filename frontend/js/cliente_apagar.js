const token = localStorage.setItem('token')

if (!token) {
    location.href = '../index.js'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const idCliente = Number(document.getElementById('idCliente').value)

    if (!idCliente) {
        resposta.innerHTML = `<p>Informe o código do cliente</p>`
        return
    }

    if (!confirm) {
        resposta.innerHTML = `<p>Você tem certeza que deseja excluir esse usuário?!</p>`
        return
    }
    fetch(`http://localhost:3000/cliente/apagar/:${idCliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
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
            console.error('Erro ao apagar cliente:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})