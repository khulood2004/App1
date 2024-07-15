// server.js
const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para obtener todos los contactos
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Ruta para agregar un nuevo contacto
app.post('/contacts', (req, res) => {
  const { name, number, email, group_name } = req.body;
  db.run(`INSERT INTO contacts (name, number, email, group_name) VALUES (?, ?, ?, ?)`, [name, number, email, group_name], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { id: this.lastID, ...req.body }
    });
  });
});

// Ruta para eliminar un contacto
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM contacts WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'deleted', changes: this.changes });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



