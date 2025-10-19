// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const notesRouter = require('./notes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send({ status: 'OK' }));
const HOST = process.env.HOST || '0.0.0.0';

// wait for DB connection before starting server
const db = require('./db');
async function waitForDb(retries = 8, delay = 2000) {
	for (let i = 0; i < retries; i++) {
		try {
			await db.query('SELECT 1');
			console.log('Database is ready');
			return;
		} catch (err) {
			console.log(`Database not ready, retrying (${i + 1}/${retries})...`);
			await new Promise((r) => setTimeout(r, delay));
		}
	}
	throw new Error('Database not ready after retries');
}

waitForDb()
	.then(() => {
		app.listen(PORT, HOST, () => console.log(`Server listening on http://${HOST}:${PORT}`));
	})
	.catch((err) => {
		console.error('Failed to connect to database:', err);
		process.exit(1);
	});
