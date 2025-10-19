// notes.js
const express = require('express');
const db = require('./db');
const router = express.Router();

// create note
router.post('/', async (req, res) => {
  const { title = '', content = '' } = req.body;
  const result = await db.query(
    'INSERT INTO notes(title, content, updated_at) VALUES($1,$2,now()) RETURNING *',
    [title, content]
  );
  res.status(201).json(result.rows[0]);
});

// get all notes
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM notes ORDER BY updated_at DESC');
  res.json(result.rows);
});

// get single note
router.get('/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM notes WHERE id=$1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

// update
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const result = await db.query(
    'UPDATE notes SET title=$1, content=$2, updated_at=now() WHERE id=$3 RETURNING *',
    [title, content, req.params.id]
  );
  res.json(result.rows[0]);
});

// delete
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM notes WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
