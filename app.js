const express = require('express');
const path = require('path');
const db = require('./db'); // Knytning till databasen (db.js)
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Serve index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint för att uppdatera en radarpost
app.post('/update-radar-entry/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const result = await db.updateRadarEntry(id, data);
        res.json({ success: true, changes: result });
    } catch (err) {
        console.error('Error updating radar entry:', err);
        res.status(500).json({ error: 'Failed to update radar entry' });
    }
});

// Endpoint för att lägga till en ny radarpost
app.post('/add-radar-entry', async (req, res) => {
    const data = req.body;

    try {
        await db.addRadarEntry(data); // Lägger till en ny radarpost
        res.json({ success: true });
    } catch (err) {
        console.error('Error adding radar entry:', err);
        res.status(500).json({ error: 'Failed to add radar entry' });
    }
});

// Hämta radar_entries från databasen
app.get('/radar-entries', async (req, res) => {
    try {
        const radarEntries = await db.getRadarEntries(); // Kalla funktionen från db.js som hämtar radarobjekten
        res.json(radarEntries); // Skicka datan till klienten som JSON
    } catch (err) {
        console.error('Error fetching radar entries:', err);
        res.status(500).json({ error: 'Failed to fetch radar entries' });
    }
});

// Endpoint för att radera en radarpost
app.delete('/delete-radar-entry/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.deleteRadarEntry(id);
        res.json({ success: true, changes: result });
    } catch (err) {
        console.error('Error deleting radar entry:', err);
        res.status(500).json({ error: 'Failed to delete radar entry' });
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
