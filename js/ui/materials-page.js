// Materials Analysis page UI and calculations
function generateMaterialsPage() {
    const materialsPage = document.getElementById('materialsPage');
    
    materialsPage.innerHTML = `
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <!-- Main Content - Materials Analysis (3/4 width) -->
            <div class="xl:col-span-3 space-y-4">
                <!-- Base Materials Input Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                    <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                        📦 BASE MATERIALS INPUT
                    </h2>
                    
                    <!-- 5 Categories in one row -->
                    <div class="grid grid-cols-5 gap-3">
                        ${generateMaterialCategories()}
                    </div>
                </div>
                
                <!-- Analysis Results Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                    <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                        📈 CRAFTING ANALYSIS
                    </h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div>
                            <h3 class="text-sm font-bold text-amber-700 dark:text-nw-gold mb-2">🟫 Leather Results</h3>
                            <div id="leatherRefinedOutput" class="bg-gray-50 dark:bg-nw-dark-bg-tertiary p-2 rounded min-h-[100px]"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">🟦 Cloth Results</h3>
                            <div id="clothRefinedOutput" class="bg-gray-50 dark:bg-nw-dark-bg-tertiary p-2 rounded min-h-[100px]"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-green-700 dark:text-green-400 mb-2">🟩 Wood Results</h3>
                            <div id="woodRefinedOutput" class="bg-gray-50 dark:bg-nw-dark-bg-tertiary p-2 rounded min-h-[100px]"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-700 dark:text-gray-400 mb-2">⬛ Metal Results</h3>
                            <div id="metalRefinedOutput" class="bg-gray-50 dark:bg-nw-dark-bg-tertiary p-2 rounded min-h-[100px]"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-stone-700 dark:text-stone-400 mb-2">⬜ Stone Results</h3>
                            <div id="stoneRefinedOutput" class="bg-gray-50 dark:bg-nw-dark-bg-tertiary p-2 rounded min-h-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Column - Pricing Table (1/4 width) -->
            <div id="materialsPricingTableContainer" class="xl:col-span-1">
                <!-- Pricing table will be inserted here -->
            </div>
        </div>
    `;
}

function generateMaterialCategories() {
    const categories = [
        { name: 'LEATHER', icon: '🟫', items: ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'], color: 'amber' },
        { name: 'CLOTH', icon: '🟦', items: ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'], color: 'blue' },
        { name: 'WOOD', icon: '🟩', items: ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'], color: 'green' },
        { name: 'METAL', icon: '⬛', items: ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux'], color: 'gray' },
        { name: 'STONE', icon: '⬜', items: ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent'], color: 'stone' }
    ];
    
    return categories.map(category => `
        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-nw-border">
            <div class="category-header bg-${category.color}-50 dark:bg-${category.color}-900/10 px-2 py-2 rounded-t-lg border-b-2 border-${category.color}-600 dark:border-nw-gold">
                <span class="font-medium text-xs text-${category.color}-800 dark:text-nw-gold">${category.icon} ${category.name}</span>
            </div>
            <div class="category-content p-2 space-y-1">
                ${category.items.map(item => {
                    const inputId = item.replace(/\s/g, '');
                    return `
                        <div class="flex gap-2 items-center">
                            <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light">${item}</label>
                            <input type="number" id="base${inputId}" placeholder="0" min="0" 
                                   class="material-input w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light"
                                   data-material="${item}">
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function generateMaterialInputs(materials) {
    return materials.map(mat => {
        const idBase = mat.replace(/\s/g, '');
        return `
            <div class="flex gap-2 items-center">
                <label class="text-sm flex-1 text-gray-700 dark:text-nw-text-light min-w-0 truncate">${mat}</label>
                <input type="number" id="base${idBase}" placeholder="Qty" min="0" class="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                <input type="number" id="price${idBase}" placeholder="Price" min="0" step="0.01" class="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
            </div>
        `;
    }).join('');
}

function initializeBaseMaterialPrices() {
    // Generate and insert the pricing table
    const container = document.getElementById('materialsPricingTableContainer');
    if (container) {
        container.innerHTML = generatePricingTable();
        initializePricingTable();
    }
    
    // Add event listeners to material inputs for automatic calculation
    setTimeout(() => {
        const inputs = document.querySelectorAll('.material-input');
        inputs.forEach(input => {
            input.addEventListener('input', handleMaterialInput);
        });
    }, 100);
    
    // Set the input values from existing prices
    const materialMap = {
        'Rawhide': 'Rawhide',
        'ThickHide': 'Thick Hide',
        'IronHide': 'Iron Hide',
        'DarkHide': 'Dark Hide',
        'Scarhide': 'Scarhide',
        'AgedTannin': 'Aged Tannin',
        'Fibers': 'Fibers',
        'SilkThreads': 'Silk Threads',
        'Wirefiber': 'Wirefiber',
        'Spinfiber': 'Spinfiber',
        'Scalecloth': 'Scalecloth',
        'Wireweave': 'Wireweave',
        'GreenWood': 'Green Wood',
        'AgedWood': 'Aged Wood',
        'Wyrdwood': 'Wyrdwood',
        'Ironwood': 'Ironwood',
        'Runewood': 'Runewood',
        'Wildwood': 'Wildwood',
        'ObsidianSandpaper': 'Obsidian Sandpaper',
        'IronOre': 'Iron Ore',
        'StarmetalOre': 'Starmetal Ore',
        'OrichalcumOre': 'Orichalcum Ore',
        'MythrilOre': 'Mythril Ore',
        'Cinnabar': 'Cinnabar',
        'ObsidianFlux': 'Obsidian Flux',
        'Charcoal': 'Charcoal',
        'Stone': 'Stone',
        'Lodestone': 'Lodestone',
        'LoamyLodestone': 'Loamy Lodestone',
        'PowerfulGemstoneDust': 'Powerful Gemstone Dust',
        'PureSolvent': 'Pure Solvent'
    };
    
    for (const [id, mat] of Object.entries(materialMap)) {
        const priceInput = document.getElementById(`price${id}`);
        if (priceInput) {
            priceInput.value = prices[mat] || '';
        }
    }
}

function handleMaterialInput(event) {
    const material = event.target.dataset.material;
    const quantity = parseInt(event.target.value) || 0;
    
    // Clear all other inputs first when user makes a new primary input
    if (quantity > 0) {
        clearAllMaterialInputs(material);
    }
    
    if (quantity === 0) {
        // If user cleared the input, recalculate without clearing others
        calculateBaseMaterials();
        return;
    }
    
    // Calculate actual material requirements using the recipe system
    const requirements = calculateAllMaterialRequirements(material, quantity);
    
    // Update all input fields with calculated requirements (now always overwrite)
    Object.entries(requirements).forEach(([requiredMaterial, requiredQty]) => {
        if (requiredMaterial !== material) { // Don't update the material we're inputting
            const inputId = 'base' + requiredMaterial.replace(/\s/g, '');
            const input = document.getElementById(inputId);
            if (input) {
                input.value = requiredQty;
            }
        }
    });
    
    // Trigger recalculation
    calculateBaseMaterials();
}

function clearAllMaterialInputs(exceptMaterial) {
    // Define material categories
    const categories = {
        'leather': ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
        'cloth': ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
        'wood': ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'],
        'metal': ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux'],
        'stone': ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent']
    };
    
    // Find which category the except material belongs to
    let targetCategory = null;
    for (const [category, materials] of Object.entries(categories)) {
        if (materials.includes(exceptMaterial)) {
            targetCategory = category;
            break;
        }
    }
    
    // Only clear inputs within the same category
    if (targetCategory) {
        const categoryMaterials = categories[targetCategory];
        document.querySelectorAll('.material-input').forEach(input => {
            if (categoryMaterials.includes(input.dataset.material) && input.dataset.material !== exceptMaterial) {
                input.value = '';
            }
        });
    }
}

function calculateAllMaterialRequirements(targetMaterial, quantity) {
    const allRequirements = {};
    
    // Get all possible recipes that use this material
    const allCraftableItems = [
        'Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather',
        'Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth',
        'Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank',
        'Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot',
        'Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block'
    ];
    
    // Find all recipes that use our target material
    const usableRecipes = [];
    allCraftableItems.forEach(item => {
        const recipeMaterials = calculateMaterials(item, 1);
        if (recipeMaterials[targetMaterial]) {
            usableRecipes.push({
                item: item,
                materialNeeded: recipeMaterials[targetMaterial],
                canMake: Math.floor(quantity / recipeMaterials[targetMaterial])
            });
        }
    });
    
    // Calculate requirements for each recipe we can make
    usableRecipes.forEach(recipe => {
        if (recipe.canMake > 0) {
            const fullRequirements = calculateMaterials(recipe.item, recipe.canMake);
            
            // Add to total requirements (taking the maximum)
            Object.entries(fullRequirements).forEach(([mat, qty]) => {
                if (mat !== targetMaterial) { // Don't include the input material itself
                    allRequirements[mat] = Math.max(allRequirements[mat] || 0, qty);
                }
            });
        }
    });
    return allRequirements;
}

function calculateBaseMaterials() {
    // Leather calculations  
    const leatherResults = [];
    
    const rawhideQty = parseInt(document.getElementById('baseRawhide')?.value) || 0;
    const thickHideQty = parseInt(document.getElementById('baseThickHide')?.value) || 0;
    const ironHideQty = parseInt(document.getElementById('baseIronHide')?.value) || 0;
    const darkHideQty = parseInt(document.getElementById('baseDarkHide')?.value) || 0;
    const scarhideQty = parseInt(document.getElementById('baseScarhide')?.value) || 0;
    const agedTanninQty = parseInt(document.getElementById('baseAgedTannin')?.value) || 0;
    
    const rawhidePrice = parseFloat(document.getElementById('priceRawhide')?.value) || prices['Rawhide'] || 0;
    const thickHidePrice = parseFloat(document.getElementById('priceThickHide')?.value) || prices['Thick Hide'] || 0;
    const ironHidePrice = parseFloat(document.getElementById('priceIronHide')?.value) || prices['Iron Hide'] || 0;
    const darkHidePrice = parseFloat(document.getElementById('priceDarkHide')?.value) || prices['Dark Hide'] || 0;
    const scarhidePrice = parseFloat(document.getElementById('priceScarhide')?.value) || prices['Scarhide'] || 0;
    const agedTanninPrice = parseFloat(document.getElementById('priceAgedTannin')?.value) || prices['Aged Tannin'] || 0;
    
    // Calculate all leather craftables with complete recipes in crafting order
    const allLeatherCraftables = ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather'];
    
    allLeatherCraftables.forEach(item => {
        const mats = calculateMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        // Apply crafting bonus to determine actual output
        const bonus = craftingBonuses[item] || 0;
        const bonusMultiplier = 1 + (bonus / 100);
        
        for (const [mat, needed] of Object.entries(mats)) {
            const available = {
                'Rawhide': rawhideQty,
                'Thick Hide': thickHideQty,
                'Iron Hide': ironHideQty,
                'Dark Hide': darkHideQty,
                'Scarhide': scarhideQty,
                'Aged Tannin': agedTanninQty
            }[mat] || 0;
            
            const price = {
                'Rawhide': rawhidePrice,
                'Thick Hide': thickHidePrice,
                'Iron Hide': ironHidePrice,
                'Dark Hide': darkHidePrice,
                'Scarhide': scarhidePrice,
                'Aged Tannin': agedTanninPrice
            }[mat] || 0;
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
                totalCost += price * needed;
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            // Apply crafting bonus - we get more items for the same materials
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            leatherResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: totalCost,
                price: sellPrices[item] || 0,
                roi: totalCost > 0 ? (((sellPrices[item] || 0) - totalCost) / totalCost * 100) : 0
            });
        }
    });
    
    // Sort by ROI for proper color gradient
    displayRefinedResults('leatherRefinedOutput', leatherResults, true);
    
    // Similar calculations for cloth, wood, metal, and stone
    calculateClothMaterials();
    calculateWoodMaterials();
    calculateMetalMaterials();
    calculateStoneMaterials();
}

function calculateClothMaterials() {
    const clothResults = [];
    
    const fibersQty = parseInt(document.getElementById('baseFibers')?.value) || 0;
    const silkThreadsQty = parseInt(document.getElementById('baseSilkThreads')?.value) || 0;
    const wirefiberQty = parseInt(document.getElementById('baseWirefiber')?.value) || 0;
    const spinfiberQty = parseInt(document.getElementById('baseSpinfiber')?.value) || 0;
    const scaleclothQty = parseInt(document.getElementById('baseScalecloth')?.value) || 0;
    const wireweaveQty = parseInt(document.getElementById('baseWireweave')?.value) || 0;
    
    const fibersPrice = parseFloat(document.getElementById('priceFibers')?.value) || prices['Fibers'] || 0;
    const silkThreadsPrice = parseFloat(document.getElementById('priceSilkThreads')?.value) || prices['Silk Threads'] || 0;
    const wirefiberPrice = parseFloat(document.getElementById('priceWirefiber')?.value) || prices['Wirefiber'] || 0;
    const spinfiberPrice = parseFloat(document.getElementById('priceSpinfiber')?.value) || prices['Spinfiber'] || 0;
    const scaleclothPrice = parseFloat(document.getElementById('priceScalecloth')?.value) || prices['Scalecloth'] || 0;
    const wireweavePrice = parseFloat(document.getElementById('priceWireweave')?.value) || prices['Wireweave'] || 0;
    
    // Calculate all cloth craftables
    const allClothCraftables = ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth'];
    
    allClothCraftables.forEach(item => {
        const mats = calculateMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        for (const [mat, needed] of Object.entries(mats)) {
            const available = {
                'Fibers': fibersQty,
                'Silk Threads': silkThreadsQty,
                'Wirefiber': wirefiberQty,
                'Spinfiber': spinfiberQty,
                'Scalecloth': scaleclothQty,
                'Wireweave': wireweaveQty
            }[mat] || 0;
            
            const price = {
                'Fibers': fibersPrice,
                'Silk Threads': silkThreadsPrice,
                'Wirefiber': wirefiberPrice,
                'Spinfiber': spinfiberPrice,
                'Scalecloth': scaleclothPrice,
                'Wireweave': wireweavePrice
            }[mat] || 0;
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
                totalCost += price * needed;
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            if (dailyLimits[item]) canCraft = Math.min(canCraft, dailyLimits[item]);
            
            clothResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : ''),
                qty: canCraft,
                cost: totalCost,
                price: sellPrices[item] || 0,
                roi: totalCost > 0 ? (((sellPrices[item] || 0) - totalCost) / totalCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('clothRefinedOutput', clothResults, true);
}

function calculateWoodMaterials() {
    const woodResults = [];
    
    const greenWoodQty = parseInt(document.getElementById('baseGreenWood')?.value) || 0;
    const agedWoodQty = parseInt(document.getElementById('baseAgedWood')?.value) || 0;
    const wyrdwoodQty = parseInt(document.getElementById('baseWyrdwood')?.value) || 0;
    const ironwoodQty = parseInt(document.getElementById('baseIronwood')?.value) || 0;
    const runewoodQty = parseInt(document.getElementById('baseRunewood')?.value) || 0;
    const wildwoodQty = parseInt(document.getElementById('baseWildwood')?.value) || 0;
    const obsidianSandpaperQty = parseInt(document.getElementById('baseObsidianSandpaper')?.value) || 0;
    
    const greenWoodPrice = parseFloat(document.getElementById('priceGreenWood')?.value) || prices['Green Wood'] || 0;
    const agedWoodPrice = parseFloat(document.getElementById('priceAgedWood')?.value) || prices['Aged Wood'] || 0;
    const wyrdwoodPrice = parseFloat(document.getElementById('priceWyrdwood')?.value) || prices['Wyrdwood'] || 0;
    const ironwoodPrice = parseFloat(document.getElementById('priceIronwood')?.value) || prices['Ironwood'] || 0;
    const runewoodPrice = parseFloat(document.getElementById('priceRunewood')?.value) || prices['Runewood'] || 0;
    const wildwoodPrice = parseFloat(document.getElementById('priceWildwood')?.value) || prices['Wildwood'] || 0;
    const obsidianSandpaperPrice = parseFloat(document.getElementById('priceObsidianSandpaper')?.value) || prices['Obsidian Sandpaper'] || 0;
    
    const allWoodCraftables = ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank'];
    
    allWoodCraftables.forEach(item => {
        const mats = calculateMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        for (const [mat, needed] of Object.entries(mats)) {
            const available = {
                'Green Wood': greenWoodQty,
                'Aged Wood': agedWoodQty,
                'Wyrdwood': wyrdwoodQty,
                'Ironwood': ironwoodQty,
                'Runewood': runewoodQty,
                'Wildwood': wildwoodQty,
                'Obsidian Sandpaper': obsidianSandpaperQty
            }[mat] || 0;
            
            const price = {
                'Green Wood': greenWoodPrice,
                'Aged Wood': agedWoodPrice,
                'Wyrdwood': wyrdwoodPrice,
                'Ironwood': ironwoodPrice,
                'Runewood': runewoodPrice,
                'Wildwood': wildwoodPrice,
                'Obsidian Sandpaper': obsidianSandpaperPrice
            }[mat] || 0;
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
                totalCost += price * needed;
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            if (dailyLimits[item]) canCraft = Math.min(canCraft, dailyLimits[item]);
            
            woodResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : ''),
                qty: canCraft,
                cost: totalCost,
                price: sellPrices[item] || 0,
                roi: totalCost > 0 ? (((sellPrices[item] || 0) - totalCost) / totalCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('woodRefinedOutput', woodResults, true);
}

function calculateMetalMaterials() {
    const metalResults = [];
    
    const ironOreQty = parseInt(document.getElementById('baseIronOre')?.value) || 0;
    const starmetalOreQty = parseInt(document.getElementById('baseStarmetalOre')?.value) || 0;
    const orichalcumOreQty = parseInt(document.getElementById('baseOrichalcumOre')?.value) || 0;
    const mythrilOreQty = parseInt(document.getElementById('baseMythrilOre')?.value) || 0;
    const cinnabarQty = parseInt(document.getElementById('baseCinnabar')?.value) || 0;
    const obsidianFluxQty = parseInt(document.getElementById('baseObsidianFlux')?.value) || 0;
    const greenWoodForCharcoal = parseInt(document.getElementById('baseGreenWood')?.value) || 0;
    
    const ironOrePrice = parseFloat(document.getElementById('priceIronOre')?.value) || prices['Iron Ore'] || 0;
    const starmetalOrePrice = parseFloat(document.getElementById('priceStarmetalOre')?.value) || prices['Starmetal Ore'] || 0;
    const orichalcumOrePrice = parseFloat(document.getElementById('priceOrichalcumOre')?.value) || prices['Orichalcum Ore'] || 0;
    const mythrilOrePrice = parseFloat(document.getElementById('priceMythrilOre')?.value) || prices['Mythril Ore'] || 0;
    const cinnabarPrice = parseFloat(document.getElementById('priceCinnabar')?.value) || prices['Cinnabar'] || 0;
    const obsidianFluxPrice = parseFloat(document.getElementById('priceObsidianFlux')?.value) || prices['Obsidian Flux'] || 0;
    const greenWoodPrice = parseFloat(document.getElementById('priceGreenWood')?.value) || prices['Green Wood'] || 0;
    const charcoalPrice = greenWoodPrice * 2;
    
    const allMetalCraftables = ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'];
    
    allMetalCraftables.forEach(item => {
        const mats = calculateMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        for (const [mat, needed] of Object.entries(mats)) {
            const available = {
                'Iron Ore': ironOreQty,
                'Starmetal Ore': starmetalOreQty,
                'Orichalcum Ore': orichalcumOreQty,
                'Mythril Ore': mythrilOreQty,
                'Cinnabar': cinnabarQty,
                'Obsidian Flux': obsidianFluxQty,
                'Green Wood': greenWoodForCharcoal
            }[mat] || 0;
            
            const price = {
                'Iron Ore': ironOrePrice,
                'Starmetal Ore': starmetalOrePrice,
                'Orichalcum Ore': orichalcumOrePrice,
                'Mythril Ore': mythrilOrePrice,
                'Cinnabar': cinnabarPrice,
                'Obsidian Flux': obsidianFluxPrice,
                'Green Wood': greenWoodPrice
            }[mat] || 0;
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
                totalCost += price * needed;
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            if (dailyLimits[item]) canCraft = Math.min(canCraft, dailyLimits[item]);
            
            metalResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : ''),
                qty: canCraft,
                cost: totalCost,
                price: sellPrices[item] || 0,
                roi: totalCost > 0 ? (((sellPrices[item] || 0) - totalCost) / totalCost * 100) : 0
            });
        }
    });
    
    // Also add Charcoal as a craftable
    if (greenWoodForCharcoal >= 2) {
        const charcoalQty = Math.floor(greenWoodForCharcoal / 2);
        metalResults.push({
            name: 'Charcoal',
            qty: charcoalQty,
            cost: greenWoodPrice * 2,
            price: sellPrices['Charcoal'] || 0,
            roi: (greenWoodPrice * 2) > 0 ? (((sellPrices['Charcoal'] || 0) - (greenWoodPrice * 2)) / (greenWoodPrice * 2) * 100) : 0
        });
    }
    
    displayRefinedResults('metalRefinedOutput', metalResults, true);
}

function calculateStoneMaterials() {
    const stoneResults = [];
    
    const stoneQty = parseInt(document.getElementById('baseStone')?.value) || 0;
    const lodestoneQty = parseInt(document.getElementById('baseLodestone')?.value) || 0;
    const loamyLodestoneQty = parseInt(document.getElementById('baseLoamyLodestone')?.value) || 0;
    const powerfulGemstoneDustQty = parseInt(document.getElementById('basePowerfulGemstoneDust')?.value) || 0;
    const pureSolventQty = parseInt(document.getElementById('basePureSolvent')?.value) || 0;
    const obsidianSandpaperQty = parseInt(document.getElementById('baseObsidianSandpaper')?.value) || 0;
    
    const stonePrice = parseFloat(document.getElementById('priceStone')?.value) || prices['Stone'] || 0;
    const lodestonePrice = parseFloat(document.getElementById('priceLodestone')?.value) || prices['Lodestone'] || 0;
    const loamyLodestonePrice = parseFloat(document.getElementById('priceLoamyLodestone')?.value) || prices['Loamy Lodestone'] || 0;
    const powerfulGemstoneDustPrice = parseFloat(document.getElementById('pricePowerfulGemstoneDust')?.value) || prices['Powerful Gemstone Dust'] || 0;
    const pureSolventPrice = parseFloat(document.getElementById('pricePureSolvent')?.value) || prices['Pure Solvent'] || 0;
    const obsidianSandpaperPrice = parseFloat(document.getElementById('priceObsidianSandpaper')?.value) || prices['Obsidian Sandpaper'] || 0;
    
    const allStoneCraftables = ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block'];
    
    allStoneCraftables.forEach(item => {
        const mats = calculateMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        for (const [mat, needed] of Object.entries(mats)) {
            const available = {
                'Stone': stoneQty,
                'Lodestone': lodestoneQty,
                'Loamy Lodestone': loamyLodestoneQty,
                'Powerful Gemstone Dust': powerfulGemstoneDustQty,
                'Pure Solvent': pureSolventQty,
                'Obsidian Sandpaper': obsidianSandpaperQty
            }[mat] || 0;
            
            const price = {
                'Stone': stonePrice,
                'Lodestone': lodestonePrice,
                'Loamy Lodestone': loamyLodestonePrice,
                'Powerful Gemstone Dust': powerfulGemstoneDustPrice,
                'Pure Solvent': pureSolventPrice,
                'Obsidian Sandpaper': obsidianSandpaperPrice
            }[mat] || 0;
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
                totalCost += price * needed;
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            if (dailyLimits[item]) canCraft = Math.min(canCraft, dailyLimits[item]);
            
            stoneResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : ''),
                qty: canCraft,
                cost: totalCost,
                price: sellPrices[item] || 0,
                roi: totalCost > 0 ? (((sellPrices[item] || 0) - totalCost) / totalCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('stoneRefinedOutput', stoneResults, true);
}