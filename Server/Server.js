const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/usuario', (req, res) => {
  db.query('SELECT * FROM usuario_tb', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/usuario/:id', (req, res) => {
  db.query(
    'SELECT * FROM usuario_tb WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: 'Usuario não encontrado' });
      res.json(results[0]);
    }
  );
});

app.get('/emprestimo', (req, res) => {
  db.query('SELECT * FROM emprestimo_tb', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/emprestimo/:id', (req, res) => {
  db.query(
    'SELECT * FROM emprestimo_tb WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: 'Emprestimo não encontrado' });
      res.json(results[0]);
    }
  );
});

app.put('/emprestimo/:id', (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE emprestimo_tb SET status = ? WHERE id_emprestimo = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ sucesso: false, erro: err.message });
      res.json({ sucesso: true });
    }
  );
});

app.post('/usuario', (req, res) => {
  const { nome, email } = req.body;
  console.log('Recebido:', nome, email); // Adicione esta linha
  db.query(
    'INSERT INTO usuario_tb (nome_usuario, email_usuario) VALUES (?, ?)',
    [nome, email],
    (err, result) => {
      if (err) return res.status(500).json({ sucesso: false, erro: err.message });
      res.status(201).json({ sucesso: true, id_usuario: result.insertId });
    }
  );
});

app.post('/emprestimo', (req, res) => {
  const { usuario,livro,data,dataD } = req.body;
  console.log('Recebido:', usuario,livro,data,dataD);
  db.query(
    'INSERT INTO emprestimo_tb (fk_usuario_emprestimo, fk_livro_emprestimo,data_emprestimo,dataDevolucao_emprestimo) VALUES (?, ?, ?, ?)',
    [usuario,livro,data,dataD],
    (err, result) => {
      if (err) return res.status(500).json({ sucesso: false, erro: err.message });
      res.status(201).json({ sucesso: true, id_emprestimo: result.insertId });
    }
  );
});

app.post('/livro', (req, res) => {
  const { titulo, autor, categoria, anoP } = req.body;
  console.log('Recebido:', titulo, autor, categoria, anoP);
  db.query(
    'INSERT INTO livro_tb (titulo_livro, autor_livro, categoria_livro, ano_livro) VALUES (?, ?, ?, ?)',
    [titulo, autor, categoria, anoP],
    (err, result) => {
      if (err) return res.status(500).json({ sucesso: false, erro: err.message });
      res.status(201).json({ sucesso: true, id_livro: result.insertId });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});