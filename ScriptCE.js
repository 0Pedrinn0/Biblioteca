const apiUrl = 'http://localhost:3000/emprestimo';

const form = document.getElementById('emprestimo-form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const usuario = document.getElementById('nomeC').value;
    const livro = document.getElementById('livro').value;
    const data = document.getElementById('dataE').value;
    const dataD = document.getElementById('dataD').value;

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, livro, data, dataD }),
        });

    const emprestimo = await res.json();

    if (emprestimo.sucesso) {
        alert('Emprestimo cadastrado com sucesso! ID: ' + emprestimo.id_emprestimo);
        form.reset();
    } else {
        alert('Erro ao cadastrar emprestimo: ' + (emprestimo.erro || ''));
    }
    } catch (err) {
    alert('Erro ao salvar emprestimo: ' + err.message);
    }
    });
