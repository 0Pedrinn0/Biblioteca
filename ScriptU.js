const apiUrl = 'http://localhost:3000/usuario';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const usuario = await res.json();
    const caixinha = document.getElementById("caixinha");
    if (Array.isArray(usuario) && usuario.length > 0) {
      usuario.forEach(e => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>ID:</strong> ${e.id_usuario}<br>
            <strong>Nome:</strong> ${e.nome_usuario}<br>
            <strong>Email:</strong> ${e.email_usuario}<br>
        `;
        caixinha.appendChild(div);
      });
    } else {
      caixinha.innerHTML += '<p>Nenhum usuario encontrado.</p>';
    }
  } catch (err) {
    alert('Erro ao buscar usuario: ' + err.message);
  }
});