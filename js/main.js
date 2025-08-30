// Main initialization file
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'false') {
        document.body.classList.remove('dark');
    }
    
    // Generate page content
    generateCraftingPage();
    generateMaterialsPage();
    
    // Load saved prices
    loadPrices();
    
    // Initialize UI
    initializePrices();
    
    // Add event listeners for crafting inputs
    allCraftables.forEach(item => {
        const inputId = item.charAt(0).toLowerCase() + item.slice(1).replace(/\s/g, '');
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateCalculations);
        }
    });
    
    // Add event listeners for "Materials I Already Have" inputs
    document.querySelectorAll('#haveRunicLeather, #havePhoenixweave, #haveGlitteringEbony, #haveAsmodeum, #haveRunestone').forEach(input => {
        input.addEventListener('input', updateCalculations);
    });
    
    // Add event listeners for base materials inputs  
    const baseMaterialInputs = [
        'baseRawhide', 'priceRawhide', 'baseThickHide', 'priceThickHide', 
        'baseIronHide', 'priceIronHide', 'baseDarkHide', 'priceDarkHide',
        'baseScarhide', 'priceScarhide', 'baseAgedTannin', 'priceAgedTannin',
        'baseFibers', 'priceFibers', 'baseSilkThreads', 'priceSilkThreads',
        'baseWirefiber', 'priceWirefiber', 'baseSpinfiber', 'priceSpinfiber',
        'baseScalecloth', 'priceScalecloth', 'baseWireweave', 'priceWireweave',
        'baseGreenWood', 'priceGreenWood', 'baseAgedWood', 'priceAgedWood',
        'baseWyrdwood', 'priceWyrdwood', 'baseIronwood', 'priceIronwood',
        'baseRunewood', 'priceRunewood', 'baseWildwood', 'priceWildwood',
        'baseObsidianSandpaper', 'priceObsidianSandpaper',
        'baseIronOre', 'priceIronOre', 'baseStarmetalOre', 'priceStarmetalOre',
        'baseOrichalcumOre', 'priceOrichalcumOre', 'baseMythrilOre', 'priceMythrilOre',
        'baseCinnabar', 'priceCinnabar', 'baseObsidianFlux', 'priceObsidianFlux', 
        'baseCharcoal', 'priceCharcoal', 'baseStone', 'priceStone', 
        'baseLodestone', 'priceLodestone', 'baseLoamyLodestone', 'priceLoamyLodestone',
        'basePowerfulGemstoneDust', 'pricePowerfulGemstoneDust', 'basePureSolvent', 'pricePureSolvent'
    ];
    
    // Attach event listeners to base material inputs when materials page is shown
    setTimeout(() => {
        baseMaterialInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => {
                    // Update prices if it's a price input
                    if (inputId.startsWith('price')) {
                        // Map the input ID to the correct material name
                        const materialMap = {
                            'priceRawhide': 'Rawhide',
                            'priceThickHide': 'Thick Hide',
                            'priceIronHide': 'Iron Hide',
                            'priceDarkHide': 'Dark Hide',
                            'priceScarhide': 'Scarhide',
                            'priceAgedTannin': 'Aged Tannin',
                            'priceFibers': 'Fibers',
                            'priceSilkThreads': 'Silk Threads',
                            'priceWirefiber': 'Wirefiber',
                            'priceSpinfiber': 'Spinfiber',
                            'priceScalecloth': 'Scalecloth',
                            'priceWireweave': 'Wireweave',
                            'priceGreenWood': 'Green Wood',
                            'priceAgedWood': 'Aged Wood',
                            'priceWyrdwood': 'Wyrdwood',
                            'priceIronwood': 'Ironwood',
                            'priceRunewood': 'Runewood',
                            'priceWildwood': 'Wildwood',
                            'priceObsidianSandpaper': 'Obsidian Sandpaper',
                            'priceIronOre': 'Iron Ore',
                            'priceStarmetalOre': 'Starmetal Ore',
                            'priceOrichalcumOre': 'Orichalcum Ore',
                            'priceMythrilOre': 'Mythril Ore',
                            'priceCinnabar': 'Cinnabar',
                            'priceObsidianFlux': 'Obsidian Flux',
                            'priceCharcoal': 'Charcoal',
                            'priceStone': 'Stone',
                            'priceLodestone': 'Lodestone',
                            'priceLoamyLodestone': 'Loamy Lodestone',
                            'pricePowerfulGemstoneDust': 'Powerful Gemstone Dust',
                            'pricePureSolvent': 'Pure Solvent'
                        };
                        
                        const material = materialMap[inputId];
                        if (material) {
                            prices[material] = parseFloat(input.value) || 0;
                            savePrices();
                            
                            // Update the corresponding price inputs on the crafting page
                            const craftingPriceInput = document.querySelector(`[data-material="${material}"]`);
                            if (craftingPriceInput) {
                                craftingPriceInput.value = input.value;
                            }
                        }
                    }
                    
                    // Update calculations if on materials page
                    const materialsPage = document.getElementById('materialsPage');
                    if (materialsPage && !materialsPage.classList.contains('hidden')) {
                        calculateBaseMaterials();
                    }
                });
            }
        });
    }, 100);
    
    // Initial calculation
    updateCalculations();
    
    // Categories are now always open, no initialization needed
});