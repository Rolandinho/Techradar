document.addEventListener('DOMContentLoaded', function () {
    const svg = d3.select('#radarSVG');
    const data = [
        { label: 'ADOPT', color: '#00FF00', radius: 50 },
        { label: 'ASSESS', color: '#FFFF00', radius: 100 },
        { label: 'TRIAL', color: '#FFA500', radius: 150 },
        { label: 'HOLD', color: '#FF0000', radius: 200 }
    ];

    // Rita färgade cirklar med text
    data.forEach((d) => {
        svg.append('circle')
            .attr('cx', 250)
            .attr('cy', 250)
            .attr('r', d.radius)
            .attr('fill', d.color)
            .attr('opacity', 0.2); // Fyll ringarna med låg opacitet

        svg.append('text')
            .attr('x', 250)
            .attr('y', 250)
            .attr('class', 'radar-text')
            .text(d.label);
    });

    // Hämta radarobjekten från servern
    fetch('/radar-entries')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(radarEntries => {
            const platforms = {};

            radarEntries.forEach(entry => {
                const statuses = [
                    { label: 'ADOPT', active: entry.adopt === 'Yes' },
                    { label: 'ASSESS', active: entry.assess === 'Yes' },
                    { label: 'TRIAL', active: entry.trial === 'Yes' },
                    { label: 'HOLD', active: entry.hold === 'Yes' }
                ];

                // Skapa plattformsstruktur
                if (!platforms[entry.plattform]) {
                    platforms[entry.plattform] = [];
                }
                platforms[entry.plattform].push(entry);

                // Rita cirklar för varje aktiv status
                statuses.forEach(status => {
                    if (status.active) {
                        const categoryData = data.find(d => d.label === status.label);
                        const radius = categoryData.radius - 30; // Reducera för avstånd
                        const angle = Math.random() * 2 * Math.PI; // Slumpmässig vinkel
                        const distance = radius;

                        const posX = 250 + distance * Math.cos(angle);
                        const posY = 250 + distance * Math.sin(angle);

                        svg.append('circle')
                            .attr('cx', posX)
                            .attr('cy', posY)
                            .attr('r', 5)
                            .attr('class', 'radar-tool')
                            .attr('data-title', entry.verktyg)
                            .attr('data-description', entry.beskrivning)
                            .attr('data-funktionsomrade', entry.funktionsomrade)
                            .on('mouseover', function() {
                                d3.select(this).attr('fill', '#FF0000');
                            })
                            .on('mouseout', function() {
                                d3.select(this).attr('fill', '#000');
                            })
                            .on('click', function() {
                                const description = `${entry.verktyg}\nBeskrivning: ${entry.beskrivning}\nFunktionsområde: ${entry.funktionsomrade}`;
                                alert(description);
                            });
                    }
                });
            });

            // Visa plattformar och verktyg
            const platformsDiv = d3.select('#platforms');
            Object.keys(platforms).forEach(platform => {
                const platformDiv = platformsDiv.append('div')
                    .attr('class', 'platform')
                    .style('margin', '10px 0');

                platformDiv.append('h3').text(platform);

                const toolsDiv = platformDiv.append('div')
                    .attr('class', 'tools');

                platforms[platform].forEach(tool => {
                    toolsDiv.append('span')
                        .attr('class', 'platform-tool')
                        .attr('data-title', tool.verktyg)
                        .text(tool.verktyg)
                        .on('mouseover', function() {
                            d3.selectAll(`.radar-tool[data-title="${tool.verktyg}"]`).attr('fill', '#FF0000');
                        })
                        .on('mouseout', function() {
                            d3.selectAll(`.radar-tool[data-title="${tool.verktyg}"]`).attr('fill', '#000');
                        })
                        .on('click', function() {
                            const description = `${tool.verktyg}\nBeskrivning: ${tool.beskrivning}\nFunktionsområde: ${tool.funktionsomrade}`;
                            alert(description);
                        });
                });
            });
        })
        .catch(error => console.error('Error fetching radar entries:', error));
});
