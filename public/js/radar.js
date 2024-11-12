document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/radar-entries')
        .then(response => response.json())
        .then(data => {
            console.log('Radar Entries:', data);  // Kontrollera data från API

            // Konvertera API-data till formatet som radar_visualization förväntar sig
            const formattedData = data.map(entry => {
                return {
                    quadrant: mapToQuadrant(entry.funktionsomrade),  // Anpassa efter funktionsområde
                    ring: mapToRing(entry),  // Baserat på adopt, trial, assess, hold
                    label: entry.verktyg,  // Verktyg som etikett
                    active: true,  // Anpassa om du har aktiva/inaktiva entries
                    moved: 0,  // Kan anpassas beroende på behov
                    link: entry.beskrivning  // Använd beskrivning som länk
                };
            });

            // Skicka den formaterade datan till radar-visualiseringen
            radar_visualization({
                title: "Skandia Tech Radar",
                date: new Date().toLocaleDateString(),
                quadrants: [
                    { name: "Analys/logg" },
                    { name: "Applikationspublicering" },
                    { name: "Batchplanering" },
                    { name: "Databaser" },
                    { name: "Digital Arbetsplats" },
                    { name: "Dokumenthantering" },
                    { name: "IAM" },
                    { name: "Integration" },
                    { name: "Inventering & Datahantering" },
                    { name: "Lagringsplattformar" },
                    { name: "Nyckel & certifikat" },
                    { name: "Nätverk" },
                    { name: "Processstöd" },
                    { name: "Samarbete" },
                    { name: "SDI" },
                    { name: "Server" },
                    { name: "Skyddförmågor" },
                    { name: "Säkerhet & Sårbarhet" },
                    { name: "Test & Deploy" },
                    { name: "Webbplattformar" },
                    { name: "Övervakning" }
                ],
                rings: [
                    { name: "ADOPT", color: "#5ba300" },
                    { name: "TRIAL", color: "#009eb0" },
                    { name: "ASSESS", color: "#c7ba00" },
                    { name: "HOLD", color: "#e09b96" }
                ],
                entries: formattedData  // Skicka den formaterade datan
            });
        })
        .catch(error => {
            console.error('Error fetching radar entries:', error);
        });
});

// Helperfunktioner för att mappa data till rätt ring och kvadrant
function mapToQuadrant(funktionsomrade) {
    // Exempel: Mappa funktionsområde till rätt kvadrant
    switch (funktionsomrade) {
        case "Infrastructure": return 0;  // Exempel kvadrant 0
        case "Development": return 1;  // Exempel kvadrant 1
        default: return 2;  // Anpassa efter behov
    }
}

function mapToRing(entry) {
    if (entry.adopt) return 0;
    if (entry.trial) return 1;
    if (entry.assess) return 2;
    if (entry.hold) return 3;
    return 3;  // Standard: HOLD
}
