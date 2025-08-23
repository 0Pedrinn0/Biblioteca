const apiUrl = 'http://localhost:3000/emprestimo';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const emprestimos = await res.json();
    const caixinha = document.getElementById("caixinha");
    const caixa = document.querySelector('.caixa');
    if (Array.isArray(emprestimos) && emprestimos.length > 0) {
      emprestimos.forEach(e => {
        const div = document.createElement('div');
        div.className = "emprestimos";
        div.style.marginBottom = '15px';
        div.innerHTML = `
          <strong>Livro:</strong> ${e.fk_livro_emprestimo}<br>
          <strong>Data Empréstimo:</strong> ${e.data_emprestimo}<br>
          <strong>Data Devolução:</strong> ${e.dataDevolucao_emprestimo}<br>
          <strong>Status:</strong>
          <select name="status" data-id="${e.id_emprestimo}">
            <option value="Ativo" ${e.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
            <option value="Devolvido" ${e.status === 'Devolvido' ? 'selected' : ''}>Devolvido</option>
            <option value="Atrasado" ${e.status === 'Atrasado' ? 'selected' : ''}>Atrasado</option>
          </select>
        `;
        caixinha.appendChild(div);

        const statusSelect = div.querySelector('select[name="status"]');
        statusSelect.addEventListener('change', async function() {
          const novoStatus = this.value;
          const id = this.getAttribute('data-id');
          try {
            const res = await fetch(`${apiUrl}/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: novoStatus }),
            });
            const result = await res.json();
            if (result.sucesso) {
              alert('Status atualizado com sucesso!');
            } else {
              alert('Erro ao atualizar status: ' + (result.erro || ''));
            }
          } catch (err) {
            alert('Erro ao atualizar status: ' + err.message);
          }
        });
      });
    } else {
      caixa.innerHTML += '<p>Nenhum empréstimo encontrado.</p>';
    }
  } catch (err) {
    alert('Erro ao buscar empréstimos: ' + err.message);
  }
});