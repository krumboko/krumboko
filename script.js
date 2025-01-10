// URL Google Sheets yang di-publikasikan sebagai CSV
const googleSheetURL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv';

function fetchRegulations() {
    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            const regulations = parseCSV(data);
            displayRegulations(regulations);
        });
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Mengabaikan header
    return rows.map(row => {
        const cols = row.split(',');
        return {
            type: cols[0].trim(),
            theme: cols[1].trim(),
            title: cols[2].trim(),
            url: cols[3].trim()
        };
    });
}

function displayRegulations(regulations) {
    const container = document.getElementById('regulation-list');
    container.innerHTML = ''; // Menghapus konten sebelumnya
    regulations.forEach(reg => {
        const link = document.createElement('a');
        link.href = reg.url;
        link.target = '_blank';
        link.textContent = `${reg.title} (${reg.type})`;
        container.appendChild(link);
    });
}

function filterByType(type) {
    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            const regulations = parseCSV(data);
            const filtered = regulations.filter(reg => reg.type === type);
            displayRegulations(filtered);
        });
}

function filterByTheme(theme) {
    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            const regulations = parseCSV(data);
            const filtered = regulations.filter(reg => reg.theme === theme);
            displayRegulations(filtered);
        });
}

// Panggil fungsi fetchRegulations saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchRegulations);
