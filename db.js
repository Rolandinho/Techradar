const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('techradar.db');

const getRadarEntries = async () => {
    const query = 'SELECT id, plattform, verktyg, beskrivning, funktionsomrade, adopt, trial, assess, hold FROM radar_entries';
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

// Exempel på att lägga till en ny radarpost
const addRadarEntry = async (data) => {
    const { plattform, verktyg, beskrivning, funktionsomrade, adopt, trial, assess, hold } = data;
    const query = 'INSERT INTO radar_entries (plattform, verktyg, beskrivning, funktionsomrade, adopt, trial, assess, hold) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    return new Promise((resolve, reject) => {
        db.run(query, [plattform, verktyg, beskrivning, funktionsomrade, adopt, trial, assess, hold], function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.changes);
        });
    });
};

// Funktion för att uppdatera en radarpost
const updateRadarEntry = (id, data) => {
    return new Promise((resolve, reject) => {
        const { verktyg, plattform, funktionsomrade, beskrivning, adopt, trial, assess, hold } = data;
        db.run('UPDATE radar_entries SET verktyg = ?, plattform = ?, funktionsomrade = ?, beskrivning = ?, adopt = ?, trial = ?, assess = ?, hold = ? WHERE id = ?', 
        [verktyg, plattform, funktionsomrade, beskrivning, adopt, trial, assess, hold, id], 
        function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.changes);
        });
    });
};

// Funktion för att radera en radarpost
const deleteRadarEntry = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM radar_entries WHERE id = ?', [id], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.changes);
        });
    });
};

// Exportera funktionerna
module.exports = {
    getRadarEntries,
    addRadarEntry,
    updateRadarEntry,
    deleteRadarEntry,
};
