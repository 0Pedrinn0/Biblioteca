const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /tasks → Lista todas as tarefas
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /tasks/:id → Busca tarefa por ID
app.get('/tasks/:id', (req, res) => {
  db.query(
    'SELECT * FROM tasks WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      res.json(results[0]);
    }
  );
});

// POST /tasks → Cria nova tarefa
app.post('/usuario', (req, res) => {
  const { nome, email } = req.body;
  db.query(
    'INSERT INTO usuario_tb (nome_usuario, email_usuario) VALUES (?, ?)',
    [nome, email],
    (err, result) => {
      if (err) return res.status(500).json({ sucesso: false, erro: err.message });
      res.status(201).json({ sucesso: true, id_usuario: result.insertId });
    }
  );
});

// PUT /tasks/:id → Atualiza tarefa
app.put('/tasks/:id', (req, res) => {
  const { title, description, completed } = req.body;
  db.query(
    'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      res.json({ id: req.params.id, title, description, completed });
    }
  );
});

// DELETE /tasks/:id → Remove tarefa
app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});