const apiUrl = 'http://localhost:3000/usuario';

const form = document.getElementById('usuario-form');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nomeC').value;
  const email = document.getElementById('emailI').value;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email }),
    });

    const usuario = await res.json();
    if (usuario.sucesso) {
      alert('Usuário cadastrado com sucesso! ID: ' + usuario.id_usuario);
      form.reset();
    } else {
      alert('Erro ao cadastrar usuário: ' + (usuario.erro || ''));
    }
  } catch (err) {
    alert('Erro ao salvar usuário: ' + err.message);
  }
});
