// Advanced material calculation system based on Excel logic
// Implements cascading calculations with proper bonus application

// Material tier definitions for calculation order
const MATERIAL_TIERS = {
    leather: {
        2: 'Coarse Leather',
        3: 'Rugged Leather', 
        4: 'Layered Leather',
        5: 'Infused Leather',
        6: 'Dark Leather'
    },
    cloth: {
        2: 'Linen',
        3: 'Sateen',
        4: 'Silk',
        5: 'Infused Silk',
        6: 'Spinweave Cloth'
    },
    wood: {
        2: 'Timber',
        3: 'Lumber',
        4: 'Wyrdwood Plank',
        5: 'Ironwood Plank',
        6: 'Runewood Plank'
    },
    metal: {
        2: 'Iron Ingot',
        3: 'Steel Ingot',
        4: 'Starmetal Ingot',
        5: 'Orichalcum Ingot',
        6: 'Mythril Ingot'
    },
    stone: {
        2: 'Stone Block',
        3: 'Stone Brick',
        4: 'Lodestone Brick',
        5: 'Obsidian Voidstone',
        6: 'Runic Voidstone'
    }
};

// Recipe ratios for refined materials
const REFINING_RATIOS = {
    // Tier 2: base material to refined
    'Coarse Leather': { input: 'Rawhide', ratio: 4 },
    'Linen': { input: 'Fibers', ratio: 4 },
    'Timber': { input: 'Green Wood', ratio: 4 },
    'Iron Ingot': { input: 'Iron Ore', ratio: 4 },
    'Stone Block': { input: 'Stone', ratio: 4 },
    
    // Tier 3: uses tier 2
    'Rugged Leather': { input: 'Coarse Leather', ratio: 4 },
    'Sateen': { input: 'Linen', ratio: 4 },
    'Lumber': { input: 'Timber', ratio: 4 },
    'Steel Ingot': { input: 'Iron Ingot', ratio: 4 },
    'Stone Brick': { input: 'Stone Block', ratio: 4 },
    
    // Tier 4: uses tier 3
    'Layered Leather': { input: 'Rugged Leather', ratio: 2 },
    'Silk': { input: 'Sateen', ratio: 2 },
    'Wyrdwood Plank': { input: 'Lumber', ratio: 2 },
    'Starmetal Ingot': { input: 'Steel Ingot', ratio: 2 },
    'Lodestone Brick': { input: 'Stone Brick', ratio: 2 },
    
    // Tier 5: uses tier 4
    'Infused Leather': { input: 'Layered Leather', ratio: 2 },
    'Infused Silk': { input: 'Silk', ratio: 2 },
    'Ironwood Plank': { input: 'Wyrdwood Plank', ratio: 2 },
    'Orichalcum Ingot': { input: 'Starmetal Ingot', ratio: 2 },
    'Obsidian Voidstone': { input: 'Lodestone Brick', ratio: 2 },
    
    // Tier 6: uses tier 5
    'Dark Leather': { input: 'Infused Leather', ratio: 2 },
    'Spinweave Cloth': { input: 'Infused Silk', ratio: 2 },
    'Runewood Plank': { input: 'Ironwood Plank', ratio: 2 },
    'Mythril Ingot': { input: 'Orichalcum Ingot', ratio: 2 },
    'Runic Voidstone': { input: 'Obsidian Voidstone', ratio: 2 }
};

// Additional raw material requirements per refined tier
const ADDITIONAL_RAW_MATERIALS = {
    // Leather
    'Layered Leather': { 'Thick Hide': 6 },
    'Infused Leather': { 'Iron Hide': 8 },
    'Dark Leather': { 'Dark Hide': 8 },
    
    // Cloth
    'Silk': { 'Silk Threads': 6 },
    'Infused Silk': { 'Wirefiber': 8 },
    'Spinweave Cloth': { 'Spinfiber': 8 },
    
    // Wood
    'Wyrdwood Plank': { 'Aged Wood': 6 },
    'Ironwood Plank': { 'Wyrdwood': 8 },
    'Runewood Plank': { 'Ironwood': 8 },
    
    // Metal
    'Starmetal Ingot': { 'Starmetal Ore': 6 },
    'Orichalcum Ingot': { 'Orichalcum Ore': 8 },
    'Mythril Ingot': { 'Mythril Ore': 8 },
    
    // Stone
    'Lodestone Brick': { 'Lodestone': 6 },
    'Obsidian Voidstone': { 'Loamy Lodestone': 8 },
    'Runic Voidstone': { 'Powerful Gemstone Dust': 8 }
};

// Reagent requirements for refined materials
const REAGENT_REQUIREMENTS = {
    // Aged Tannin used in leather
    'Rugged Leather': { 'Aged Tannin': 1 },
    'Layered Leather': { 'Aged Tannin': 1 },
    'Infused Leather': { 'Aged Tannin': 1 },
    
    // Wireweave used in cloth
    'Sateen': { 'Wireweave': 1 },
    'Silk': { 'Wireweave': 1 },
    'Infused Silk': { 'Wireweave': 1 },
    
    // Obsidian Sandpaper used in wood
    'Lumber': { 'Obsidian Sandpaper': 1 },
    'Wyrdwood Plank': { 'Obsidian Sandpaper': 1 },
    'Ironwood Plank': { 'Obsidian Sandpaper': 1 },
    
    // Obsidian Flux used in metal
    'Steel Ingot': { 'Obsidian Flux': 1 },
    'Starmetal Ingot': { 'Obsidian Flux': 1 },
    'Orichalcum Ingot': { 'Obsidian Flux': 1 },
    
    // Obsidian Sandpaper used in stone
    'Stone Brick': { 'Obsidian Sandpaper': 1 },
    'Lodestone Brick': { 'Obsidian Sandpaper': 1 }
};

// Charcoal requirements for metal (special case)
const CHARCOAL_REQUIREMENTS = {
    'Iron Ingot': 2,  // Uses 2 charcoal per craft
    'Steel Ingot': 3,  // Uses 3 charcoal per craft
    'Starmetal Ingot': 4,  // Uses 4 charcoal per craft
    'Orichalcum Ingot': 5,  // Uses 5 charcoal per craft
    'Mythril Ingot': 6   // Uses 6 charcoal per craft
};

/**
 * Calculate refined material quantities with cascading bonuses
 * @param {string} category - Material category (leather, cloth, wood, metal, stone)
 * @param {number} baseQuantity - Base raw material quantity (user input)
 * @returns {Object} Quantities of all refined materials
 */
function calculateRefinedQuantities(category, baseQuantity) {
    const tiers = MATERIAL_TIERS[category];
    const quantities = {};
    
    // Calculate tier 2 from base material
    const tier2Item = tiers[2];
    const tier2Ratio = REFINING_RATIOS[tier2Item].ratio;
    const tier2Bonus = (craftingBonuses[tier2Item] || 0) / 100;
    quantities[tier2Item] = (baseQuantity / tier2Ratio) * (1 + tier2Bonus);
    
    // Calculate subsequent tiers
    for (let tier = 3; tier <= 6; tier++) {
        if (!tiers[tier]) break;
        
        const currentItem = tiers[tier];
        const prevItem = tiers[tier - 1];
        const ratio = REFINING_RATIOS[currentItem].ratio;
        const bonus = (craftingBonuses[currentItem] || 0) / 100;
        
        quantities[currentItem] = (quantities[prevItem] / ratio) * (1 + bonus);
    }
    
    return quantities;
}

/**
 * Calculate dependent raw material quantities based on refined outputs
 * @param {string} category - Material category
 * @param {Object} refinedQuantities - Calculated refined material quantities
 * @returns {Object} Required raw material quantities
 */
function calculateDependentRawMaterials(category, refinedQuantities) {
    const rawMaterials = {};
    
    // Calculate additional raw materials needed for each refined tier
    for (const [refinedItem, quantity] of Object.entries(refinedQuantities)) {
        const additionalRaws = ADDITIONAL_RAW_MATERIALS[refinedItem];
        if (additionalRaws) {
            for (const [raw, ratio] of Object.entries(additionalRaws)) {
                // Raw materials needed = refined quantity * ratio (no bonus applied to raw)
                const baseRefinedQty = quantity / (1 + (craftingBonuses[refinedItem] || 0) / 100);
                rawMaterials[raw] = (rawMaterials[raw] || 0) + (baseRefinedQty * ratio);
            }
        }
    }
    
    return rawMaterials;
}

/**
 * Calculate reagent quantities based on refined material production
 * @param {string} category - Material category
 * @param {Object} refinedQuantities - Calculated refined material quantities
 * @returns {Object} Required reagent quantities
 */
function calculateReagentQuantities(category, refinedQuantities) {
    const reagents = {};
    
    // Special formulas for reagents based on instructions
    if (category === 'leather') {
        // Aged Tannin = (Coarse ÷ 4) + (Rugged ÷ 2) + (Layered ÷ 2) + (Infused ÷ 2)
        const coarse = refinedQuantities['Coarse Leather'] || 0;
        const rugged = refinedQuantities['Rugged Leather'] || 0;
        const layered = refinedQuantities['Layered Leather'] || 0;
        const infused = refinedQuantities['Infused Leather'] || 0;
        
        reagents['Aged Tannin'] = (coarse / 4) + (rugged / 2) + (layered / 2) + (infused / 2);
    }
    else if (category === 'cloth') {
        // Wireweave = (Linen ÷ 4) + (Sateen ÷ 2) + (Silk ÷ 2) + (Infused Silk ÷ 2)
        const linen = refinedQuantities['Linen'] || 0;
        const sateen = refinedQuantities['Sateen'] || 0;
        const silk = refinedQuantities['Silk'] || 0;
        const infusedSilk = refinedQuantities['Infused Silk'] || 0;
        
        reagents['Wireweave'] = (linen / 4) + (sateen / 2) + (silk / 2) + (infusedSilk / 2);
    }
    else if (category === 'wood') {
        // Obsidian Sandpaper = (Timber ÷ 2) + (Lumber ÷ 2) + (Wyrdwood ÷ 2) + (Ironwood ÷ 2)
        const timber = refinedQuantities['Timber'] || 0;
        const lumber = refinedQuantities['Lumber'] || 0;
        const wyrdwood = refinedQuantities['Wyrdwood Plank'] || 0;
        const ironwood = refinedQuantities['Ironwood Plank'] || 0;
        
        reagents['Obsidian Sandpaper'] = (timber / 2) + (lumber / 2) + (wyrdwood / 2) + (ironwood / 2);
    }
    else if (category === 'metal') {
        // Obsidian Flux = (Iron ÷ 4) + (Steel ÷ 2) + (Starmetal ÷ 2) + (Orichalcum ÷ 2)
        const iron = refinedQuantities['Iron Ingot'] || 0;
        const steel = refinedQuantities['Steel Ingot'] || 0;
        const starmetal = refinedQuantities['Starmetal Ingot'] || 0;
        const orichalcum = refinedQuantities['Orichalcum Ingot'] || 0;
        
        reagents['Obsidian Flux'] = (iron / 4) + (steel / 2) + (starmetal / 2) + (orichalcum / 2);
        
        // Charcoal = (Iron × 2/3) + Steel + Starmetal + Orichalcum
        // Note: Adjusted to actual crafting ratios without bonus
        const ironBase = iron / (1 + 0.5);
        const steelBase = steel / (1 + 0.48);
        const starmetalBase = starmetal / (1 + 0.45);
        const orichalcumBase = orichalcum / (1 + 0.43);
        
        reagents['Charcoal'] = (ironBase * 2) + (steelBase * 3) + (starmetalBase * 4) + (orichalcumBase * 5);
    }
    else if (category === 'stone') {
        // Obsidian Sandpaper = (Stone Block ÷ 4) + (Stone Brick ÷ 2) + (Lodestone Brick ÷ 8)
        const stoneBlock = refinedQuantities['Stone Block'] || 0;
        const stoneBrick = refinedQuantities['Stone Brick'] || 0;
        const lodestoneBrick = refinedQuantities['Lodestone Brick'] || 0;
        
        reagents['Obsidian Sandpaper'] = (stoneBlock / 4) + (stoneBrick / 2) + (lodestoneBrick / 8);
    }
    
    return reagents;
}

/**
 * Calculate cost per unit for refined materials
 * @param {string} item - Refined material name
 * @param {Object} materialPrices - Prices for all materials
 * @returns {number} Cost per unit
 */
function calculateCostPerUnit(item, materialPrices) {
    let totalCost = 0;
    
    // Get the base refining ratio
    const refiningInfo = REFINING_RATIOS[item];
    if (refiningInfo) {
        const inputMat = refiningInfo.input;
        const ratio = refiningInfo.ratio;
        
        // For cascading materials, need to calculate the cost of the input material first
        if (REFINING_RATIOS[inputMat]) {
            // Input is another refined material, calculate its cost recursively
            const inputCost = calculateCostPerUnit(inputMat, materialPrices);
            totalCost += inputCost * ratio;
        } else {
            // Input is a raw material
            totalCost += (materialPrices[inputMat] || 0) * ratio;
        }
    }
    
    // Add additional raw materials cost
    const additionalRaws = ADDITIONAL_RAW_MATERIALS[item];
    if (additionalRaws) {
        for (const [mat, quantity] of Object.entries(additionalRaws)) {
            totalCost += (materialPrices[mat] || 0) * quantity;
        }
    }
    
    // Add reagent costs
    const reagents = REAGENT_REQUIREMENTS[item];
    if (reagents) {
        for (const [reagent, quantity] of Object.entries(reagents)) {
            totalCost += (materialPrices[reagent] || 0) * quantity;
        }
    }
    
    // Add charcoal for metal items
    const charcoalReq = CHARCOAL_REQUIREMENTS[item];
    if (charcoalReq) {
        totalCost += (materialPrices['Charcoal'] || 0) * charcoalReq;
    }
    
    // Add crafting cost
    totalCost += craftCosts[item] || 0;
    
    // Apply bonus to get actual cost per unit
    const bonus = (craftingBonuses[item] || 0) / 100;
    const costPerUnit = totalCost / (1 + bonus);
    
    return costPerUnit;
}

/**
 * Calculate detailed financial breakdown for a material
 * @param {number} marketPrice - Market selling price
 * @param {number} costPerUnit - Cost to produce one unit
 * @param {number} quantity - Total quantity being analyzed
 * @returns {Object} Detailed financial information
 */
function calculateFinancialBreakdown(marketPrice, costPerUnit, quantity = 1) {
    if (costPerUnit <= 0) return {
        roi: 0,
        totalCost: 0,
        totalRevenue: 0,
        sellingFee: 0,
        buyingTax: 0,
        netRevenue: 0,
        totalProfit: 0,
        profitPerItem: 0,
        breakEvenPrice: 0
    };
    
    // Calculate all financial components
    const totalCost = costPerUnit * quantity;
    const totalRevenue = marketPrice * quantity;
    const sellingFee = totalRevenue * 0.06; // 6% selling fee
    const buyingTax = totalCost * 0.015; // 1.5% buying tax on raw materials
    const netRevenue = totalRevenue - sellingFee;
    const totalProfit = netRevenue - totalCost - buyingTax;
    const profitPerItem = totalProfit / quantity;
    const roi = ((netRevenue - totalCost - buyingTax) / (totalCost + buyingTax)) * 100;
    const breakEvenPrice = (costPerUnit + buyingTax/quantity) / 0.94; // Price needed to break even after selling fee
    
    return {
        roi: roi,
        totalCost: totalCost,
        totalRevenue: totalRevenue,
        sellingFee: sellingFee,
        buyingTax: buyingTax,
        netRevenue: netRevenue,
        totalProfit: totalProfit,
        profitPerItem: profitPerItem,
        breakEvenPrice: breakEvenPrice
    };
}

/**
 * Calculate ROI for a material (legacy function for backward compatibility)
 * @param {number} marketPrice - Market selling price
 * @param {number} costPerUnit - Cost to produce one unit
 * @returns {number} ROI percentage
 */
function calculateROI(marketPrice, costPerUnit) {
    return calculateFinancialBreakdown(marketPrice, costPerUnit, 1).roi;
}

/**
 * Main calculation function for materials page
 * @param {string} category - Material category
 * @param {Object} inputs - User inputs (quantities and prices)
 * @returns {Object} Complete calculation results
 */
function performAdvancedCalculations(category, inputs) {
    const results = {
        refined: {},
        raw: {},
        reagents: {},
        costs: {},
        roi: {},
        totalInvestment: 0
    };
    
    // Step 1: Calculate refined quantities (forward cascade)
    results.refined = calculateRefinedQuantities(category, inputs.baseQuantity);
    
    // Step 2: Calculate dependent raw materials (backward reference)
    results.raw = calculateDependentRawMaterials(category, results.refined);
    
    // Step 3: Calculate reagent quantities
    results.reagents = calculateReagentQuantities(category, results.refined);
    
    // Step 4: Calculate costs per unit
    for (const item of Object.keys(results.refined)) {
        results.costs[item] = calculateCostPerUnit(item, inputs.prices);
    }
    
    // Step 5: Calculate ROI and financial breakdown
    results.financials = {};
    for (const item of Object.keys(results.refined)) {
        const marketPrice = inputs.marketPrices[item] || 0;
        const quantity = results.refined[item];
        results.roi[item] = calculateROI(marketPrice, results.costs[item]);
        results.financials[item] = calculateFinancialBreakdown(marketPrice, results.costs[item], quantity);
    }
    
    // Step 6: Calculate total investment
    // Base material cost
    results.totalInvestment += inputs.baseQuantity * (inputs.prices[inputs.baseMaterial] || 0);
    
    // Additional raw material costs
    for (const [mat, qty] of Object.entries(results.raw)) {
        results.totalInvestment += qty * (inputs.prices[mat] || 0);
    }
    
    // Reagent costs
    for (const [reagent, qty] of Object.entries(results.reagents)) {
        results.totalInvestment += qty * (inputs.prices[reagent] || 0);
    }
    
    return results;
}

// Export functions for use in other modules
window.advancedCalculator = {
    calculateRefinedQuantities,
    calculateDependentRawMaterials,
    calculateReagentQuantities,
    calculateCostPerUnit,
    calculateROI,
    calculateFinancialBreakdown,
    performAdvancedCalculations
};