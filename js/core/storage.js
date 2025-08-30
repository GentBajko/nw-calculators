// Local storage functions for saving and loading prices
function savePrices() {
    localStorage.setItem('nw_prices', JSON.stringify(prices));
    localStorage.setItem('nw_sell_prices', JSON.stringify(sellPrices));
}

function loadPrices() {
    const savedPrices = localStorage.getItem('nw_prices');
    if (savedPrices) {
        try {
            prices = JSON.parse(savedPrices);
        } catch (e) {
            console.error('Error loading prices:', e);
            prices = {};
        }
    }
    
    const savedSellPrices = localStorage.getItem('nw_sell_prices');
    if (savedSellPrices) {
        try {
            sellPrices = JSON.parse(savedSellPrices);
        } catch (e) {
            console.error('Error loading sell prices:', e);
            sellPrices = {};
        }
    }
}

function exportPrices() {
    const exportData = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        prices: prices,
        sellPrices: sellPrices
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nw_prices_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importPrices(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.prices) {
                prices = data.prices;
            }
            if (data.sellPrices) {
                sellPrices = data.sellPrices;
            }
            savePrices();
            updateCalculations();
            initializePrices();
            initializeBaseMaterialPrices();
        } catch (error) {
            console.error('Error importing prices:', error);
            alert('Error importing prices file. Please check the file format.');
        }
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

function loadSamplePrices() {
    // Sample prices for testing
    prices = {
        // Leather Materials
        'Rawhide': 0.01,
        'Thick Hide': 0.10,
        'Iron Hide': 0.25,
        'Dark Hide': 1.50,
        'Scarhide': 25.00,
        'Aged Tannin': 0.35,
        
        // Cloth Materials
        'Fibers': 0.01,
        'Silk Threads': 0.10,
        'Wirefiber': 0.25,
        'Spinfiber': 1.50,
        'Scalecloth': 25.00,
        'Wireweave': 0.35,
        
        // Wood Materials
        'Green Wood': 0.01,
        'Aged Wood': 0.10,
        'Wyrdwood': 0.25,
        'Ironwood': 0.50,
        'Runewood': 1.50,
        'Wildwood': 25.00,
        'Obsidian Sandpaper': 0.35,
        
        // Metal Materials
        'Iron Ore': 0.10,
        'Starmetal Ore': 0.50,
        'Orichalcum Ore': 1.00,
        'Mythril Ore': 2.00,
        'Cinnabar': 25.00,
        'Obsidian Flux': 0.35,
        'Charcoal': 0.10,
        
        // Stone Materials
        'Stone': 0.01,
        'Lodestone': 0.25,
        'Loamy Lodestone': 10.00,
        'Powerful Gemstone Dust': 5.00,
        'Pure Solvent': 0.50
    };
    
    sellPrices = {
        // Example sell prices
        'Prismatic Leather': 500.00,
        'Prismatic Cloth': 500.00,
        'Prismatic Plank': 500.00,
        'Prismatic Ingot': 500.00,
        'Prismatic Block': 500.00,
        'Runic Leather': 50.00,
        'Phoenixweave': 50.00,
        'Glittering Ebony': 50.00,
        'Asmodeum': 50.00,
        'Runestone': 50.00
    };
    
    savePrices();
    updateCalculations();
    initializePrices();
    initializeBaseMaterialPrices();
}

function clearAllPrices() {
    prices = {};
    sellPrices = {};
    savePrices();
    updateCalculations();
    initializePrices();
    initializeBaseMaterialPrices();
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}