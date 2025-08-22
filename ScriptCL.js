const apiUrl = 'http://localhost:3000/livro';

const form = document.getElementById('livro-form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const titulo = document.getElementById('tituloL').value;
    const autor = document.getElementById('autor').value;
    const categoria = document.getElementById('categoria').value;
    const anoP = document.getElementById('anoP').value;

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, categoria, anoP }),
        });

    const livro = await res.json();

    if (livro.sucesso) {
        alert('livro cadastrado com sucesso! ID: ' + livro.id_livro);
        form.reset();
    } else {
        alert('Erro ao cadastrar livro: ' + (livro.erro || ''));
    }
    } catch (err) {
    alert('Erro ao salvar livro: ' + err.message);
    }
    });
