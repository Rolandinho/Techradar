const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Skapa en databasanslutning
const db = new sqlite3.Database('./techradar.db');

// Middleware för att hantera JSON-data
app.use(express.json());

// Endpoint för att hämta radar entries
app.get('/radar-entries', (req, res) => {
    const query = "SELECT * FROM radar_entries";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Lägg till den nya endpointen för att hämta plattformar
app.get('/platforms', (req, res) => {
    const query = "SELECT DISTINCT plattform FROM radar_entries";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const platforms = rows.map(row => row.plattform);
            res.json(platforms);
        }
    });
});

// Endpoint för att uppdatera radar entries
app.post('/update-radar-entry/:id', (req, res) => {
    const { verktyg, plattform, funktionsomrade, beskrivning, status } = req.body;
    const id = req.params.id;

    const query = `UPDATE radar_entries SET verktyg = ?, plattform = ?, funktionsomrade = ?, beskrivning = ?, status = ? WHERE id = ?`;
    db.run(query, [verktyg, plattform, funktionsomrade, beskrivning, status, id], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send({ message: 'Uppdatering lyckades' });
        }
    });
});

// Starta servern
app.listen(port, () => {
    console.log(`Servern kör på http://localhost:${port}`);
});
