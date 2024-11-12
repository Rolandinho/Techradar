// techradar.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('path_to_your_database.db');

// Funktion för att hämta alla radar-poster
function getRadarEntries() {
    db.all("SELECT * FROM radar_entries", [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
}

// Funktion för att lägga till en ny radar-post
function addRadarEntry(entry) {
    const sql = `INSERT INTO radar_entries (plattform, verktyg, beskrivning, funktionsomrade, adopt, trial, assess, hold, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [entry.plattform, entry.verktyg, entry.beskrivning, entry.funktionsomrade, entry.adopt, entry.trial, entry.assess, entry.hold, entry.createdAt, entry.updatedAt], function(err) {
        if (err) {
            throw err;
        }
        console.log(`En ny rad har lagts till med id: ${this.lastID}`);
    });
}

// Funktion för att radera en radar-post
function deleteRadarEntry(id) {
    const sql = `DELETE FROM radar_entries WHERE id = ?`;

    db.run(sql, id, function(err) {
        if (err) {
            throw err;
        }
        console.log(`Rad med id: ${id} har raderats.`);
    });
}

// Exempel på hur man använder funktionerna
getRadarEntries(); // Hämta och skriv ut alla radar-poster

// Lägg till en ny radar-post (ändra värdena efter behov)
addRadarEntry({
    plattform: 'Exempel Plattform',
    verktyg: 'Exempel Verktyg',
    beskrivning: 'Detta är en beskrivning av verktyget.',
    funktionsomrade: 'Exempel Funktionsområde',
    adopt: 'Yes',
    trial: 'No',
    assess: 'No',
    hold: 'No',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
});

// Radera en radar-post (ändra id efter behov)
deleteRadarEntry(1); // Radera rad med id 1

// Stäng databasen när du är klar
db.close();
