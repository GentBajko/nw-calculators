// Materials page UI generation and calculation functions
// REFACTORED VERSION - Eliminates ~400 lines of duplicate code

// Generate the compact material categories for Base Materials Analysis
function generateCompactMaterialCategories() {
    const html = Object.entries(MATERIAL_CONFIG).map(([key, config]) => `
        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-nw-border">
            <div class="category-header bg-${config.color}-50 dark:bg-${config.color}-900/10 px-2 py-2 rounded-t-lg border-b-2 border-${config.color}-600 dark:border-nw-gold cursor-pointer" onclick="toggleCategory(this)">
                <div class="flex justify-between items-center">
                    <span class="font-medium text-xs text-${config.color}-800 dark:text-nw-gold">${config.icon} ${config.name}</span>
                    <svg class="collapsible-arrow w-3 h-3 text-gray-500 dark:text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
            <div class="category-content p-2 space-y-1" style="transition: max-height 0.2s ease-out, opacity 0.2s ease-out; max-height: 500px; overflow: hidden;">
                ${generateMaterialInputs(config.baseMaterials, key)}
            </div>
        </div>
    `).join('');
    
    return html;
}

// Generate material inputs for a specific category
function generateMaterialInputs(materials, categoryKey) {
    const config = MATERIAL_CONFIG[categoryKey];
    
    return materials.map(mat => {
        // Handle special input IDs (like Stone's Obsidian Sandpaper)
        const inputId = config?.specialInputIds?.[mat] || 
                       'base' + mat.replace(/\s/g, '');
        
        return `
            <div class="flex gap-2 items-center">
                <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light">${mat}</label>
                <input type="number" 
                       id="${inputId}" 
                       data-material="${mat}"
                       data-category="${categoryKey}"
                       min="0" 
                       placeholder="0" 
                       class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
            </div>
        `;
    }).join('');
}

// Generate material categories table with outputs
function generateMaterialCategories() {
    const html = Object.entries(MATERIAL_CONFIG).map(([key, config]) => `
        <div>
            <h3 class="text-sm font-bold text-${config.color}-700 dark:text-nw-gold mb-2 flex items-center gap-1">
                ${config.icon} ${config.name}
            </h3>
            <div id="${config.outputElementId}" class="space-y-0.5">
                <div class="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
                    No materials yet
                </div>
            </div>
        </div>
    `).join('');
    
    return html;
}

// Generic function to calculate materials for any category
function calculateCategoryMaterials(categoryKey) {
    const config = MATERIAL_CONFIG[categoryKey];
    if (!config) return;
    
    const results = [];
    
    // Get quantities and prices for all base materials
    const quantities = {};
    const materialPrices = {};
    
    config.baseMaterials.forEach(mat => {
        // Handle special input IDs (like Stone's Obsidian Sandpaper)
        const inputId = config.specialInputIds?.[mat] || 
                       config.inputPrefix + mat.replace(/\s/g, '');
        const priceId = config.pricePrefix + mat.replace(/\s/g, '');
        
        quantities[mat] = parseInt(document.getElementById(inputId)?.value) || 0;
        materialPrices[mat] = parseFloat(document.getElementById(priceId)?.value) || prices[mat] || 0;
    });
    
    // Handle additional base materials (like Green Wood for Charcoal in metal)
    if (config.additionalBase) {
        const mat = config.additionalBase;
        const inputId = config.inputPrefix + mat.replace(/\s/g, '');
        const priceId = config.pricePrefix + mat.replace(/\s/g, '');
        quantities[mat] = parseInt(document.getElementById(inputId)?.value) || 0;
        materialPrices[mat] = parseFloat(document.getElementById(priceId)?.value) || prices[mat] || 0;
    }
    
    // Calculate for each craftable item
    config.craftables.forEach(item => {
        const mats = calculateRawMaterials(item, 1);
        let canCraft = Number.MAX_SAFE_INTEGER;
        let totalCost = 0;
        
        // Check availability for all required materials
        for (const [mat, needed] of Object.entries(mats)) {
            const available = quantities[mat] || 0;
            
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
                const price = materialPrices[mat] || 0;
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
            
            results.push({
                name: item + (dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : '') + (bonus > 0 ? ` +${bonus}%` : ''),
                qty: finalOutput,
                cost: unitCost,
                totalCost: totalCostWithCraft,
                price: marketPrice,
                profit: profitPerUnit,
                roi: unitCost > 0 ? (profitPerUnit / unitCost * 100) : 0
            });
        }
    });
    
    displayRefinedResults(config.outputElementId, results, true);
}

// Legacy wrapper functions for backwards compatibility
function calculateBaseMaterials() {
    calculateCategoryMaterials('leather');
    calculateCategoryMaterials('cloth');
    calculateCategoryMaterials('wood');
    calculateCategoryMaterials('metal');
    calculateCategoryMaterials('stone');
}

function calculateClothMaterials() {
    calculateCategoryMaterials('cloth');
}

function calculateWoodMaterials() {
    calculateCategoryMaterials('wood');
}

function calculateMetalMaterials() {
    calculateCategoryMaterials('metal');
}

function calculateStoneMaterials() {
    calculateCategoryMaterials('stone');
}

// Calculate requirements for a specific category when user inputs a refined material quantity
function calculateCategoryRequirements(material, quantity, category) {
    // This function remains unchanged from original
    const allRequirements = {};
    
    // Find all craftables in this category that use this material
    const config = MATERIAL_CONFIG[category];
    if (!config) return allRequirements;
    
    config.craftables.forEach(craftable => {
        const fullMats = calculateRawMaterials(craftable, 1);
        
        // Check if this craftable uses our material
        if (fullMats[material]) {
            // Calculate how many we can make from the available material
            const canMake = Math.floor(quantity / fullMats[material]);
            
            if (canMake > 0) {
                // Get bonuses for this item
                const bonus = craftingBonuses[craftable] || 0;
                const bonusMultiplier = 1 + (bonus / 100);
                
                // Calculate how many crafts needed (accounting for bonus)
                const craftsNeeded = Math.ceil(canMake / bonusMultiplier);
                
                // Add all required materials for these crafts
                Object.entries(fullMats).forEach(([reqMat, reqQty]) => {
                    if (reqMat !== material) {
                        allRequirements[reqMat] = (allRequirements[reqMat] || 0) + (reqQty * craftsNeeded);
                    }
                });
            }
        }
    });
    
    return allRequirements;
}

// Event handler for material inputs
function handleMaterialInput(event) {
    // Skip if we're programmatically updating inputs
    if (window.updatingMaterialInputs) {
        return;
    }
    
    const material = event.target.dataset.material;
    const inputCategory = event.target.dataset.category;
    const quantity = parseInt(event.target.value) || 0;
    
    if (quantity > 0 && inputCategory) {
        const config = MATERIAL_CONFIG[inputCategory];
        
        // Clear other inputs in the same category first
        config.baseMaterials.forEach(mat => {
            if (mat !== material) {
                const inputId = config.specialInputIds?.[mat] || 
                               'base' + mat.replace(/\s/g, '');
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = '';
                }
            }
        });
        
        // Calculate what can be made with this material
        const requirements = calculateCategoryRequirements(material, quantity, inputCategory);
        
        // Update other inputs in the same category
        Object.entries(requirements).forEach(([requiredMaterial, requiredQty]) => {
            if (config.baseMaterials.includes(requiredMaterial) && requiredMaterial !== material) {
                const inputId = config.specialInputIds?.[requiredMaterial] ||
                               'base' + requiredMaterial.replace(/\s/g, '');
                const input = document.getElementById(inputId);
                if (input) {
                    window.updatingMaterialInputs = true;
                    input.value = Math.ceil(requiredQty);
                    setTimeout(() => {
                        window.updatingMaterialInputs = false;
                    }, 10);
                }
            }
        });
    }
    
    // Recalculate the category
    calculateCategoryMaterials(inputCategory);
}

// Initialize base material prices from pricing table
function initializeBaseMaterialPrices() {
    // Get all price inputs from the pricing table
    document.querySelectorAll('[id^="price"]').forEach(input => {
        const materialName = input.dataset.material;
        if (materialName) {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                prices[materialName] = value;
            }
        }
    });
}

// Generate the materials page HTML
function generateMaterialsPage() {
    const materialsPage = document.getElementById('materialsPage');
    
    materialsPage.innerHTML = `
        <div class="space-y-4">
            <!-- Base Materials Input Section -->
            <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                    📦 BASE MATERIALS I HAVE
                </h2>
                
                <!-- 5 Categories in one row -->
                <div class="grid grid-cols-5 gap-3 mb-4">
                    ${generateCompactMaterialCategories()}
                </div>
                
                <button onclick="calculateBaseMaterials()" class="mt-4 px-6 py-2 bg-nw-teal-dark dark:bg-nw-gold text-white dark:text-nw-dark-bg-primary font-medium rounded hover:bg-nw-teal-light dark:hover:bg-yellow-500 transition-colors">
                    Calculate What I Can Make
                </button>
            </div>
            
            <!-- Results Section -->
            <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                    🎯 BASE MATERIALS ANALYSIS
                </h2>
                
                <!-- 5 Category Results in one row -->
                <div class="grid grid-cols-5 gap-3">
                    ${generateMaterialCategories()}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for material inputs
    setTimeout(() => {
        document.querySelectorAll('#materialsPage input[data-material]').forEach(input => {
            input.addEventListener('input', handleMaterialInput);
        });
    }, 10);
}