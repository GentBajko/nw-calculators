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
        { name: 'METAL', icon: '⬛', items: ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux', 'Charcoal'], color: 'gray' },
        { name: 'STONE', icon: '⬜', items: ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent', 'Obsidian Sandpaper'], color: 'stone' }
    ];
    
    return categories.map(category => `
        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-nw-border">
            <div class="category-header bg-${category.color}-50 dark:bg-${category.color}-900/10 px-2 py-2 rounded-t-lg border-b-2 border-${category.color}-600 dark:border-nw-gold">
                <span class="font-medium text-xs text-${category.color}-800 dark:text-nw-gold">${category.icon} ${category.name}</span>
            </div>
            <div class="category-content p-2 space-y-1">
                ${category.items.map(item => {
                    // Create unique IDs for items that appear in multiple categories
                    const baseId = item.replace(/\s/g, '');
                    const inputId = (item === 'Obsidian Sandpaper' && category.name === 'STONE') ? 'StoneObsidianSandpaper' : baseId;
                    return `
                        <div class="flex gap-2 items-center">
                            <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light">${item}</label>
                            <input type="number" id="base${inputId}" placeholder="0" min="0" 
                                   class="material-input w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light"
                                   data-material="${item}"
                                   data-category="${category.name.toLowerCase()}">
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
    const inputCategory = event.target.dataset.category;
    const quantity = parseInt(event.target.value) || 0;
    
    // Determine which category this material belongs to based on the input's category
    const categories = {
        'leather': ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
        'cloth': ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
        'wood': ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'],
        'metal': ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux', 'Charcoal'],
        'stone': ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent', 'Obsidian Sandpaper']
    };
    
    // Use the input's category attribute to determine which category we're in
    let materialCategory = inputCategory;
    
    if (quantity > 0 && materialCategory) {
        // Clear other inputs in the same category first
        const categoryMaterials = categories[materialCategory];
        categoryMaterials.forEach(mat => {
            if (mat !== material) {
                // Use special ID for Stone's Obsidian Sandpaper
                const inputId = (mat === 'Obsidian Sandpaper' && materialCategory === 'stone') 
                    ? 'baseStoneObsidianSandpaper' 
                    : 'base' + mat.replace(/\s/g, '');
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = '';
                }
            }
        });
        
        // Calculate what can be made with this material
        const requirements = calculateCategoryRequirements(material, quantity, materialCategory);
        
        // Update other inputs in the same category
        Object.entries(requirements).forEach(([requiredMaterial, requiredQty]) => {
            if (categoryMaterials.includes(requiredMaterial) && requiredMaterial !== material) {
                // Use special ID for Stone's Obsidian Sandpaper
                const inputId = (requiredMaterial === 'Obsidian Sandpaper' && materialCategory === 'stone')
                    ? 'baseStoneObsidianSandpaper'
                    : 'base' + requiredMaterial.replace(/\s/g, '');
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = requiredQty;
                }
            }
        });
    }
    
    // Trigger recalculation
    calculateBaseMaterials();
}

function calculateCategoryRequirements(targetMaterial, quantity, category) {
    const allRequirements = {};
    
    // Define craftables per category
    const categoryCraftables = {
        'leather': ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather'],
        'cloth': ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth'],
        'wood': ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank'],
        'metal': ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'],
        'stone': ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block']
    };
    
    const craftableItems = categoryCraftables[category] || [];
    
    // Find all recipes that use our target material
    const usableRecipes = [];
    craftableItems.forEach(item => {
        const recipeMaterials = calculateRawMaterials(item, 1);
        if (recipeMaterials[targetMaterial]) {
            usableRecipes.push({
                item: item,
                materialNeeded: recipeMaterials[targetMaterial],
                canMake: Math.floor(quantity / recipeMaterials[targetMaterial])
            });
        }
    });
    
    // For all materials, calculate based on what they can make
    usableRecipes.forEach(recipe => {
        if (recipe.canMake > 0) {
            const fullRequirements = calculateRawMaterials(recipe.item, recipe.canMake);
            
            // Add to total requirements (taking the maximum)
            Object.entries(fullRequirements).forEach(([mat, qty]) => {
                if (mat !== targetMaterial) { // Don't include the input material itself
                    allRequirements[mat] = Math.max(allRequirements[mat] || 0, qty);
                }
            });
        }
    });
    
    // Special additional handling for Iron Ore - also check what Steel Ingot needs
    if (targetMaterial === 'Iron Ore' && category === 'metal') {
        // Iron Ore makes Iron Ingot at 4:1 ratio
        const ironIngots = Math.floor(quantity / 4);
        if (ironIngots > 0) {
            // Check if we can make Steel with those Iron Ingots
            const steelRecipe = recipes['Steel Ingot'];
            if (steelRecipe && steelRecipe['Iron Ingot']) {
                const steelIngots = Math.floor(ironIngots / steelRecipe['Iron Ingot']);
                if (steelIngots > 0) {
                    // Add Steel's requirements if not already added
                    if (steelRecipe['Obsidian Flux']) {
                        allRequirements['Obsidian Flux'] = Math.max(allRequirements['Obsidian Flux'] || 0, steelIngots * steelRecipe['Obsidian Flux']);
                    }
                    if (steelRecipe['Charcoal']) {
                        allRequirements['Charcoal'] = Math.max(allRequirements['Charcoal'] || 0, steelIngots * steelRecipe['Charcoal']);
                    }
                }
            }
        }
    }
    
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
        const mats = calculateRawMaterials(item, 1);
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
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            // Calculate total material cost for all crafts
            for (const [mat, needed] of Object.entries(mats)) {
                const price = {
                    'Rawhide': rawhidePrice,
                    'Thick Hide': thickHidePrice,
                    'Iron Hide': ironHidePrice,
                    'Dark Hide': darkHidePrice,
                    'Scarhide': scarhidePrice,
                    'Aged Tannin': agedTanninPrice
                }[mat] || 0;
                totalCost += price * needed * canCraft;
            }
            
            // Apply crafting bonus - we get more items for the same materials
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            // Craft cost applies to items crafted (before bonus)
            const craftCost = (craftCosts[item] || 0) * canCraft;
            const totalCostWithCraft = totalCost + craftCost;
            
            // Calculate per-unit cost
            const unitCost = finalOutput > 0 ? totalCostWithCraft / finalOutput : 0;
            
            // Market price and selling fee (6%)
            const marketPrice = sellPrices[item] || 0;
            const sellingFee = marketPrice * 0.06;
            const netPrice = marketPrice - sellingFee;
            
            // Profit per unit
            const profitPerUnit = netPrice - unitCost;
            
            leatherResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
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
        const mats = calculateRawMaterials(item, 1);
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
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            // Calculate total material cost for all crafts
            for (const [mat, needed] of Object.entries(mats)) {
                const price = {
                    'Fibers': fibersPrice,
                    'Silk Threads': silkThreadsPrice,
                    'Wirefiber': wirefiberPrice,
                    'Spinfiber': spinfiberPrice,
                    'Scalecloth': scaleclothPrice,
                    'Wireweave': wireweavePrice
                }[mat] || 0;
                totalCost += price * needed * canCraft;
            }
            
            // Apply crafting bonus for actual output
            const bonus = craftingBonuses[item] || 0;
            const bonusMultiplier = 1 + (bonus / 100);
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            // Craft cost applies to items crafted (before bonus)
            const craftCost = (craftCosts[item] || 0) * canCraft;
            const totalCostWithCraft = totalCost + craftCost;
            
            // Calculate per-unit cost
            const unitCost = finalOutput > 0 ? totalCostWithCraft / finalOutput : 0;
            
            // Market price and selling fee (6%)
            const marketPrice = sellPrices[item] || 0;
            const sellingFee = marketPrice * 0.06;
            const netPrice = marketPrice - sellingFee;
            
            // Profit per unit
            const profitPerUnit = netPrice - unitCost;
            
            clothResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
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
        const mats = calculateRawMaterials(item, 1);
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
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            // Calculate total material cost for all crafts
            for (const [mat, needed] of Object.entries(mats)) {
                const price = {
                    'Green Wood': greenWoodPrice,
                    'Aged Wood': agedWoodPrice,
                    'Wyrdwood': wyrdwoodPrice,
                    'Ironwood': ironwoodPrice,
                    'Runewood': runewoodPrice,
                    'Wildwood': wildwoodPrice,
                    'Obsidian Sandpaper': obsidianSandpaperPrice
                }[mat] || 0;
                totalCost += price * needed * canCraft;
            }
            
            // Apply crafting bonus for actual output
            const bonus = craftingBonuses[item] || 0;
            const bonusMultiplier = 1 + (bonus / 100);
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            // Craft cost applies to items crafted (before bonus)
            const craftCost = (craftCosts[item] || 0) * canCraft;
            const totalCostWithCraft = totalCost + craftCost;
            
            // Calculate per-unit cost
            const unitCost = finalOutput > 0 ? totalCostWithCraft / finalOutput : 0;
            
            // Market price and selling fee (6%)
            const marketPrice = sellPrices[item] || 0;
            const sellingFee = marketPrice * 0.06;
            const netPrice = marketPrice - sellingFee;
            
            // Profit per unit
            const profitPerUnit = netPrice - unitCost;
            
            woodResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('woodRefinedOutput', woodResults, true);
}

function calculateMetalMaterials() {
    const metalResults = [];
    
    // Get base material quantities
    const baseResources = {
        'Iron Ore': parseInt(document.getElementById('baseIronOre')?.value) || 0,
        'Starmetal Ore': parseInt(document.getElementById('baseStarmetalOre')?.value) || 0,
        'Orichalcum Ore': parseInt(document.getElementById('baseOrichalcumOre')?.value) || 0,
        'Mythril Ore': parseInt(document.getElementById('baseMythrilOre')?.value) || 0,
        'Cinnabar': parseInt(document.getElementById('baseCinnabar')?.value) || 0,
        'Obsidian Flux': parseInt(document.getElementById('baseObsidianFlux')?.value) || 0,
        'Charcoal': parseInt(document.getElementById('baseCharcoal')?.value) || 0
    };
    
    // Get prices
    const basePrices = {
        'Iron Ore': parseFloat(document.getElementById('priceIronOre')?.value) || prices['Iron Ore'] || 0,
        'Starmetal Ore': parseFloat(document.getElementById('priceStarmetalOre')?.value) || prices['Starmetal Ore'] || 0,
        'Orichalcum Ore': parseFloat(document.getElementById('priceOrichalcumOre')?.value) || prices['Orichalcum Ore'] || 0,
        'Mythril Ore': parseFloat(document.getElementById('priceMythrilOre')?.value) || prices['Mythril Ore'] || 0,
        'Cinnabar': parseFloat(document.getElementById('priceCinnabar')?.value) || prices['Cinnabar'] || 0,
        'Obsidian Flux': parseFloat(document.getElementById('priceObsidianFlux')?.value) || prices['Obsidian Flux'] || 0,
        'Charcoal': parseFloat(document.getElementById('priceCharcoal')?.value) || prices['Charcoal'] || 0
    };
    
    const allMetalCraftables = ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'];
    
    allMetalCraftables.forEach(item => {
        // Get the full material requirements (flattened to base materials)
        const fullMats = calculateRawMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        let missingMaterial = false;
        
        // Check if we have enough of each base material
        for (const [mat, needed] of Object.entries(fullMats)) {
            // Only check base materials that we track
            if (baseResources.hasOwnProperty(mat)) {
                const available = baseResources[mat];
                const price = basePrices[mat];
                
                if (needed > 0) {
                    if (available >= needed) {
                        canCraft = Math.min(canCraft, Math.floor(available / needed));
                        totalCost += price * needed;
                    } else {
                        // Not enough of this material
                        canCraft = 0;
                        missingMaterial = true;
                        break;
                    }
                }
            }
        }
        
        // Only add to results if we can craft at least 1
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER && !missingMaterial) {
            // Apply crafting bonus for actual output
            const bonus = craftingBonuses[item] || 0;
            const bonusMultiplier = 1 + (bonus / 100);
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            // Craft cost applies to items crafted (before bonus)
            const craftCost = (craftCosts[item] || 0) * canCraft;
            const totalCostWithCraft = totalCost + craftCost;
            
            // Calculate per-unit cost
            const unitCost = finalOutput > 0 ? totalCostWithCraft / finalOutput : 0;
            
            // Market price and selling fee (6%)
            const marketPrice = sellPrices[item] || 0;
            const sellingFee = marketPrice * 0.06;
            const netPrice = marketPrice - sellingFee;
            
            // Profit per unit
            const profitPerUnit = netPrice - unitCost;
            
            metalResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('metalRefinedOutput', metalResults, true);
}

function calculateStoneMaterials() {
    const stoneResults = [];
    
    const stoneQty = parseInt(document.getElementById('baseStone')?.value) || 0;
    const lodestoneQty = parseInt(document.getElementById('baseLodestone')?.value) || 0;
    const loamyLodestoneQty = parseInt(document.getElementById('baseLoamyLodestone')?.value) || 0;
    const powerfulGemstoneDustQty = parseInt(document.getElementById('basePowerfulGemstoneDust')?.value) || 0;
    const pureSolventQty = parseInt(document.getElementById('basePureSolvent')?.value) || 0;
    const obsidianSandpaperQty = parseInt(document.getElementById('baseStoneObsidianSandpaper')?.value) || 0;
    
    const stonePrice = parseFloat(document.getElementById('priceStone')?.value) || prices['Stone'] || 0;
    const lodestonePrice = parseFloat(document.getElementById('priceLodestone')?.value) || prices['Lodestone'] || 0;
    const loamyLodestonePrice = parseFloat(document.getElementById('priceLoamyLodestone')?.value) || prices['Loamy Lodestone'] || 0;
    const powerfulGemstoneDustPrice = parseFloat(document.getElementById('pricePowerfulGemstoneDust')?.value) || prices['Powerful Gemstone Dust'] || 0;
    const pureSolventPrice = parseFloat(document.getElementById('pricePureSolvent')?.value) || prices['Pure Solvent'] || 0;
    const obsidianSandpaperPrice = parseFloat(document.getElementById('priceObsidianSandpaper')?.value) || prices['Obsidian Sandpaper'] || 0;
    
    const allStoneCraftables = ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block'];
    
    allStoneCraftables.forEach(item => {
        const mats = calculateRawMaterials(item, 1);
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
            
            if (available > 0) {
                canCraft = Math.min(canCraft, Math.floor(available / needed));
            } else if (needed > 0) {
                canCraft = 0;
                break;
            }
        }
        
        if (canCraft > 0 && canCraft !== Number.MAX_SAFE_INTEGER) {
            // Calculate total material cost for all crafts
            for (const [mat, needed] of Object.entries(mats)) {
                const price = {
                    'Stone': stonePrice,
                    'Lodestone': lodestonePrice,
                    'Loamy Lodestone': loamyLodestonePrice,
                    'Powerful Gemstone Dust': powerfulGemstoneDustPrice,
                    'Pure Solvent': pureSolventPrice,
                    'Obsidian Sandpaper': obsidianSandpaperPrice
                }[mat] || 0;
                totalCost += price * needed * canCraft;
            }
            
            // Apply crafting bonus for actual output
            const bonus = craftingBonuses[item] || 0;
            const bonusMultiplier = 1 + (bonus / 100);
            const actualOutput = Math.floor(canCraft * bonusMultiplier);
            
            // Apply daily limits
            const finalOutput = dailyLimits[item] ? Math.min(actualOutput, dailyLimits[item]) : actualOutput;
            
            // Craft cost applies to items crafted (before bonus)
            const craftCost = (craftCosts[item] || 0) * canCraft;
            const totalCostWithCraft = totalCost + craftCost;
            
            // Calculate per-unit cost
            const unitCost = finalOutput > 0 ? totalCostWithCraft / finalOutput : 0;
            
            // Market price and selling fee (6%)
            const marketPrice = sellPrices[item] || 0;
            const sellingFee = marketPrice * 0.06;
            const netPrice = marketPrice - sellingFee;
            
            // Profit per unit
            const profitPerUnit = netPrice - unitCost;
            
            stoneResults.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults('stoneRefinedOutput', stoneResults, true);
}