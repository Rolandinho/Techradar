// Funktion för att ladda alla radarposter och visa dem i listan
function loadRadarEntries() {
    fetch('getRadarEntries.php') // Anta att du har en PHP-fil som hanterar att hämta radarposter
        .then(response => response.json())
        .then(entries => {
            const radarList = document.getElementById('radarList');
            radarList.innerHTML = ''; // Töm listan innan den fylls på nytt

            // Loopa igenom varje radarpost och lägg till dem i listan
            entries.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `${entry.title} - ${entry.category} - ${entry.status}`;
                radarList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading radar entries:', error));
}
