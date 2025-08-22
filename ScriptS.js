const apiUrl = 'http://localhost:3000/emprestimo';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const emprestimos = await res.json();

    const caixa = document.querySelector('.caixa');
    if (Array.isArray(emprestimos) && emprestimos.length > 0) {
      emprestimos.forEach(e => {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        div.innerHTML = `
          <strong>Livro:</strong> ${e.fk_livro_emprestimo}<br>
          <strong>Data Empréstimo:</strong> ${e.data_emprestimo}<br>
          <strong>Data Devolução:</strong> ${e.dataDevolucao_emprestimo}<br>
          <strong>Status:</strong>
          <select name="status" id="status">
            <option value="ativo">Ativo</option>
            <option value="devolvido">Devolvido</option>
            <option value="atrasado">Atrasado</option>
          </select>
        `;
        const statusSelect = 
        caixa.appendChild(div);
      });
    } else {
      caixa.innerHTML += '<p>Nenhum empréstimo encontrado.</p>';
    }
  } catch (err) {
    alert('Erro ao buscar empréstimos: ' + err.message);
  }
});