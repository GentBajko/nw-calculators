// Advanced Materials Analysis page using Excel-based calculation logic

function generateAdvancedMaterialsPage() {
    const materialsPage = document.getElementById('materialsPage');
    
    materialsPage.innerHTML = `
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-3">
            <!-- Main Content - Materials Analysis (3/4 width) -->
            <div class="xl:col-span-3 space-y-3">
                <!-- Base Materials Input Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-3">
                    <h2 class="text-lg font-bold text-nw-teal-dark dark:text-nw-gold mb-2 pb-1 border-b border-gray-200 dark:border-nw-border">
                        📦 BASE MATERIALS INPUT (Enter quantity for first material only)
                    </h2>
                    
                    <!-- 5 Categories in one row -->
                    <div class="grid grid-cols-5 gap-2">
                        ${generateAdvancedMaterialInputs()}
                    </div>
                </div>
                
                <!-- Analysis Results Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-3">
                    <h2 class="text-lg font-bold text-nw-teal-dark dark:text-nw-gold mb-2 pb-1 border-b border-gray-200 dark:border-nw-border">
                        📈 ADVANCED CRAFTING ANALYSIS
                    </h2>
                    <div class="grid grid-cols-5 gap-2">
                        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2">
                            <h3 class="text-xs font-bold text-amber-700 dark:text-nw-gold mb-1 text-center">🟫 LEATHER</h3>
                            <div id="leatherAdvancedOutput" class="text-xs space-y-1"></div>
                        </div>
                        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2">
                            <h3 class="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1 text-center">🟦 CLOTH</h3>
                            <div id="clothAdvancedOutput" class="text-xs space-y-1"></div>
                        </div>
                        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2">
                            <h3 class="text-xs font-bold text-green-700 dark:text-green-400 mb-1 text-center">🟩 WOOD</h3>
                            <div id="woodAdvancedOutput" class="text-xs space-y-1"></div>
                        </div>
                        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2">
                            <h3 class="text-xs font-bold text-gray-700 dark:text-gray-400 mb-1 text-center">⬛ METAL</h3>
                            <div id="metalAdvancedOutput" class="text-xs space-y-1"></div>
                        </div>
                        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2">
                            <h3 class="text-xs font-bold text-stone-700 dark:text-stone-400 mb-1 text-center">⬜ STONE</h3>
                            <div id="stoneAdvancedOutput" class="text-xs space-y-1"></div>
                        </div>
                    </div>
                </div>

                <!-- Total Investment Summary -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-3">
                    <h2 class="text-lg font-bold text-nw-teal-dark dark:text-nw-gold mb-2 pb-1 border-b border-gray-200 dark:border-nw-border">
                        💰 INVESTMENT SUMMARY
                    </h2>
                    <div id="investmentSummary" class="grid grid-cols-5 gap-2">
                        <!-- Investment details will be populated here -->
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

function generateAdvancedMaterialInputs() {
    const categories = [
        { 
            name: 'LEATHER', 
            icon: '🟫', 
            baseMaterial: 'Rawhide',
            displayMaterials: ['Rawhide (Base)', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
            materials: ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
            color: 'amber' 
        },
        { 
            name: 'CLOTH', 
            icon: '🟦', 
            baseMaterial: 'Fibers',
            displayMaterials: ['Fibers (Base)', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
            materials: ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
            color: 'blue' 
        },
        { 
            name: 'WOOD', 
            icon: '🟩', 
            baseMaterial: 'Green Wood',
            displayMaterials: ['Green Wood (Base)', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Sandpaper'],
            materials: ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'],
            color: 'green' 
        },
        { 
            name: 'METAL', 
            icon: '⬛', 
            baseMaterial: 'Iron Ore',
            displayMaterials: ['Iron Ore (Base)', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Flux', 'Charcoal'],
            materials: ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux', 'Charcoal'],
            color: 'gray' 
        },
        { 
            name: 'STONE', 
            icon: '⬜', 
            baseMaterial: 'Stone',
            displayMaterials: ['Stone (Base)', 'Lodestone', 'Loamy Lodestone', 'Gem Dust', 'Pure Solvent', 'Sandpaper'],
            materials: ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent', 'Obsidian Sandpaper'],
            color: 'stone' 
        }
    ];
    
    return categories.map(category => `
        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border">
            <div class="category-header bg-${category.color}-50 dark:bg-${category.color}-900/10 px-1 py-1 rounded-t border-b border-${category.color}-600 dark:border-nw-gold">
                <span class="font-medium text-xs text-${category.color}-800 dark:text-nw-gold">${category.icon} ${category.name}</span>
            </div>
            <div class="category-content p-1 space-y-0.5">
                ${category.displayMaterials.map((displayName, index) => {
                    const material = category.materials[index];
                    const isBase = material === category.baseMaterial;
                    const baseId = material.replace(/\s/g, '');
                    const inputId = (material === 'Obsidian Sandpaper' && category.name === 'STONE') 
                        ? 'advStoneObsidianSandpaper' 
                        : 'adv' + baseId;
                    const shortName = displayName.length > 14 ? displayName.substring(0, 13) + '..' : displayName;
                    
                    return `
                        <div class="flex gap-1 items-center">
                            <label class="text-xs flex-1 ${isBase ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'} truncate" 
                                   title="${displayName}">${shortName}</label>
                            <input type="number" 
                                   id="${inputId}" 
                                   placeholder="0" 
                                   min="0" 
                                   ${!isBase ? 'readonly' : ''}
                                   class="adv-material-input w-16 px-1 py-0 text-xs rounded border ${isBase ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' : 'border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600'} text-gray-900 dark:text-gray-100"
                                   data-material="${material}"
                                   data-category="${category.name.toLowerCase()}"
                                   data-is-base="${isBase}">
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function initializeAdvancedCalculations() {
    // Add event listeners to base material inputs only
    document.querySelectorAll('.adv-material-input[data-is-base="true"]').forEach(input => {
        input.addEventListener('input', handleAdvancedMaterialInput);
    });
    
    // Load prices from storage
    loadPrices();
    
    // Generate pricing table for materials page
    generatePricingTable('materialsPricingTableContainer');
    
    // Add event listener for price changes
    document.addEventListener('priceUpdate', () => {
        // Recalculate if there's an active calculation
        document.querySelectorAll('.adv-material-input[data-is-base="true"]').forEach(input => {
            if (input.value) {
                const event = new Event('input');
                input.dispatchEvent(event);
            }
        });
    });
    
    // Watch for changes to price inputs
    setTimeout(() => {
        document.querySelectorAll('[id^="price"]').forEach(input => {
            input.addEventListener('input', () => {
                // Trigger recalculation for any active category
                document.querySelectorAll('.adv-material-input[data-is-base="true"]').forEach(baseInput => {
                    if (baseInput.value) {
                        const event = new Event('input');
                        baseInput.dispatchEvent(event);
                    }
                });
            });
        });
    }, 200);
}

function handleAdvancedMaterialInput(event) {
    const material = event.target.dataset.material;
    const category = event.target.dataset.category;
    const quantity = parseInt(event.target.value) || 0;
    
    if (quantity > 0) {
        performCategoryCalculations(category, material, quantity);
    } else {
        // Clear the category display
        clearCategoryDisplay(category);
    }
}

function performCategoryCalculations(category, baseMaterial, baseQuantity) {
    // Gather all prices
    const materialPrices = {};
    const marketPrices = {};
    
    // First, load from global prices object (from storage)
    Object.keys(prices).forEach(material => {
        materialPrices[material] = prices[material] || 0;
    });
    
    // Then, override with any values from price inputs on the page
    document.querySelectorAll('[id^="price"]').forEach(input => {
        if (input.value) {
            // Handle different ID formats
            let material = '';
            if (input.id.includes('price')) {
                // Remove 'price' prefix and convert camelCase to spaces
                material = input.id.replace('price', '')
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .replace(/\s+/g, ' ');
                    
                // Special cases mapping
                const materialNameMap = {
                    'Rawhide': 'Rawhide',
                    'Thick Hide': 'Thick Hide',
                    'Iron Hide': 'Iron Hide', 
                    'Dark Hide': 'Dark Hide',
                    'Scarhide': 'Scarhide',
                    'Aged Tannin': 'Aged Tannin',
                    'Fibers': 'Fibers',
                    'Silk Threads': 'Silk Threads',
                    'Wirefiber': 'Wirefiber',
                    'Spinfiber': 'Spinfiber',
                    'Scalecloth': 'Scalecloth',
                    'Wireweave': 'Wireweave',
                    'Green Wood': 'Green Wood',
                    'Aged Wood': 'Aged Wood',
                    'Wyrdwood': 'Wyrdwood',
                    'Ironwood': 'Ironwood',
                    'Runewood': 'Runewood',
                    'Wildwood': 'Wildwood',
                    'Obsidian Sandpaper': 'Obsidian Sandpaper',
                    'Iron Ore': 'Iron Ore',
                    'Starmetal Ore': 'Starmetal Ore',
                    'Orichalcum Ore': 'Orichalcum Ore',
                    'Mythril Ore': 'Mythril Ore',
                    'Cinnabar': 'Cinnabar',
                    'Obsidian Flux': 'Obsidian Flux',
                    'Charcoal': 'Charcoal',
                    'Stone': 'Stone',
                    'Lodestone': 'Lodestone',
                    'Loamy Lodestone': 'Loamy Lodestone',
                    'Powerful Gemstone Dust': 'Powerful Gemstone Dust',
                    'Pure Solvent': 'Pure Solvent'
                };
                
                if (materialNameMap[material]) {
                    materialPrices[materialNameMap[material]] = parseFloat(input.value) || 0;
                }
            }
        }
    });
    
    // Get market prices for refined materials from global sellPrices
    allCraftables.forEach(item => {
        marketPrices[item] = sellPrices[item] || 0;
    });
    
    // Use the advanced calculator
    const inputs = {
        baseQuantity: baseQuantity,
        baseMaterial: baseMaterial,
        prices: materialPrices,
        marketPrices: marketPrices
    };
    
    const results = window.advancedCalculator.performAdvancedCalculations(category, inputs);
    
    // Update dependent raw materials display
    updateDependentMaterials(category, results.raw, results.reagents);
    
    // Display refined materials results
    displayAdvancedResults(category, results);
    
    // Update investment summary
    updateInvestmentSummary(category, results, baseQuantity, baseMaterial, materialPrices);
}

function updateDependentMaterials(category, rawMaterials, reagents) {
    // Map of category to material input IDs
    const categoryInputMap = {
        'leather': {
            'Thick Hide': 'advThickHide',
            'Iron Hide': 'advIronHide',
            'Dark Hide': 'advDarkHide',
            'Aged Tannin': 'advAgedTannin'
        },
        'cloth': {
            'Silk Threads': 'advSilkThreads',
            'Wirefiber': 'advWirefiber',
            'Spinfiber': 'advSpinfiber',
            'Wireweave': 'advWireweave'
        },
        'wood': {
            'Aged Wood': 'advAgedWood',
            'Wyrdwood': 'advWyrdwood',
            'Ironwood': 'advIronwood',
            'Obsidian Sandpaper': 'advObsidianSandpaper'
        },
        'metal': {
            'Starmetal Ore': 'advStarmetalOre',
            'Orichalcum Ore': 'advOrichalcumOre',
            'Mythril Ore': 'advMythrilOre',
            'Obsidian Flux': 'advObsidianFlux',
            'Charcoal': 'advCharcoal'
        },
        'stone': {
            'Lodestone': 'advLodestone',
            'Loamy Lodestone': 'advLoamyLodestone',
            'Powerful Gemstone Dust': 'advPowerfulGemstoneDust',
            'Obsidian Sandpaper': 'advStoneObsidianSandpaper'
        }
    };
    
    const inputMap = categoryInputMap[category];
    if (!inputMap) return;
    
    // Update raw material inputs
    Object.entries(rawMaterials).forEach(([material, quantity]) => {
        const inputId = inputMap[material];
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = Math.round(quantity);
            }
        }
    });
    
    // Update reagent inputs
    Object.entries(reagents).forEach(([reagent, quantity]) => {
        const inputId = inputMap[reagent];
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = Math.round(quantity);
            }
        }
    });
}

function displayAdvancedResults(category, results) {
    const outputElement = document.getElementById(`${category}AdvancedOutput`);
    if (!outputElement) return;
    
    let html = '<div class="space-y-2">';
    
    // Sort materials by ROI to determine best/worst
    const materialEntries = Object.entries(results.refined);
    const sortedByROI = materialEntries
        .map(([item, quantity]) => ({
            item,
            quantity,
            roi: results.roi[item] || 0
        }))
        .sort((a, b) => b.roi - a.roi);
    
    // Create ROI ranking map
    const roiRanking = {};
    sortedByROI.forEach((entry, index) => {
        roiRanking[entry.item] = index;
    });
    
    const totalMaterials = sortedByROI.length;
    
    // Display refined materials with detailed financial information
    Object.entries(results.refined).forEach(([item, quantity]) => {
        const cost = results.costs[item] || 0;
        const roi = results.roi[item] || 0;
        const marketPrice = sellPrices[item] || 0;
        const financial = results.financials[item] || {};
        
        // Apply daily limits for display
        const displayQty = dailyLimits[item] ? Math.min(Math.round(quantity), dailyLimits[item]) : Math.round(quantity);
        
        // Calculate gradient position (0 = best, 1 = worst)
        const position = totalMaterials > 1 ? roiRanking[item] / (totalMaterials - 1) : 0;
        
        // Generate gradient colors based on ROI ranking
        let borderColor, bgColor, roiColor, badge = '';
        
        if (totalMaterials === 1) {
            // Single item - use standard coloring
            borderColor = roi > 0 ? 'border-green-300 dark:border-green-600' : 'border-red-300 dark:border-red-600';
            bgColor = roi > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';
        } else if (position === 0) {
            // Best ROI - bright green
            borderColor = 'border-green-500 dark:border-green-400';
            bgColor = 'bg-green-100 dark:bg-green-900/30';
            badge = '<span class="inline-block px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full mb-1">BEST</span>';
        } else if (position === 1) {
            // Worst ROI - bright red
            borderColor = 'border-red-500 dark:border-red-400';
            bgColor = 'bg-red-100 dark:bg-red-900/30';
            badge = '<span class="inline-block px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full mb-1">WORST</span>';
        } else {
            // Gradient between best and worst
            if (position < 0.5) {
                // More green (better half)
                borderColor = `border-emerald-${300 + Math.round(position * 200)} dark:border-emerald-${400 + Math.round(position * 200)}`;
                bgColor = `bg-emerald-${50 + Math.round(position * 50)} dark:bg-emerald-900/${20 + Math.round(position * 10)}`;
            } else {
                // More red (worse half)
                borderColor = `border-orange-${300 + Math.round((position - 0.5) * 400)} dark:border-red-${400 + Math.round((position - 0.5) * 200)}`;
                bgColor = `bg-orange-${50 + Math.round((position - 0.5) * 50)} dark:bg-red-900/${20 + Math.round((position - 0.5) * 10)}`;
            }
        }
        
        // ROI text color
        if (roi > 50) roiColor = 'text-green-600 dark:text-green-400 font-bold';
        else if (roi > 20) roiColor = 'text-green-500 dark:text-green-400';
        else if (roi > 0) roiColor = 'text-yellow-600 dark:text-yellow-400';
        else if (roi < 0) roiColor = 'text-red-600 dark:text-red-400';
        else roiColor = 'text-gray-500';
        
        // Profit color
        const profitColor = financial.totalProfit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        
        html += `
            <div class="${bgColor} p-3 rounded border-2 ${borderColor} shadow-sm">
                ${badge}
                <div class="font-medium text-sm text-gray-900 dark:text-gray-100 mb-2">${item}</div>
                
                <!-- Basic Info -->
                <div class="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div class="text-gray-700 dark:text-gray-300">
                        Quantity: ${displayQty.toLocaleString()}
                        ${dailyLimits[item] ? ` (${dailyLimits[item]}/day)` : ''}
                    </div>
                    <div class="text-gray-700 dark:text-gray-300">
                        Cost/Unit: ${cost.toFixed(2)}g
                    </div>
                    <div class="text-gray-700 dark:text-gray-300">
                        Market Price: ${marketPrice.toFixed(2)}g
                    </div>
                    <div class="text-gray-700 dark:text-gray-300">
                        Break Even: ${(financial.breakEvenPrice || 0).toFixed(2)}g
                    </div>
                </div>
                
                <!-- Financial Breakdown -->
                <div class="border-t border-gray-300 dark:border-gray-600 pt-2 space-y-1">
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <div class="text-gray-600 dark:text-gray-400">Total Cost:</div>
                        <div class="text-gray-900 dark:text-gray-100 font-mono">${(financial.totalCost || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400">Buying Tax (1.5%):</div>
                        <div class="text-red-600 dark:text-red-400 font-mono">-${(financial.buyingTax || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400">Gross Revenue:</div>
                        <div class="text-gray-900 dark:text-gray-100 font-mono">${(financial.totalRevenue || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400">Selling Fee (6%):</div>
                        <div class="text-red-600 dark:text-red-400 font-mono">-${(financial.sellingFee || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400">Net Revenue:</div>
                        <div class="text-gray-900 dark:text-gray-100 font-mono">${(financial.netRevenue || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400 font-medium">Total Profit:</div>
                        <div class="${profitColor} font-mono font-medium">${(financial.totalProfit || 0).toFixed(2)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400">Profit/Item:</div>
                        <div class="${profitColor} font-mono">${(financial.profitPerItem || 0).toFixed(3)}g</div>
                        
                        <div class="text-gray-600 dark:text-gray-400 font-medium">ROI:</div>
                        <div class="${roiColor} font-mono font-medium">${roi.toFixed(1)}%</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    outputElement.innerHTML = html;
}

function updateInvestmentSummary(category, results, baseQuantity, baseMaterial, materialPrices) {
    const summaryElement = document.getElementById('investmentSummary');
    if (!summaryElement) return;
    
    // Get existing summaries or create new object
    if (!window.investmentSummaries) {
        window.investmentSummaries = {};
    }
    
    // Calculate detailed investment breakdown
    const investment = {
        category: category,
        baseMaterial: baseMaterial,
        baseQuantity: baseQuantity,
        baseCost: baseQuantity * (materialPrices[baseMaterial] || 0),
        rawMaterials: {},
        rawMaterialsCost: 0,
        reagents: {},
        reagentsCost: 0,
        totalInvestment: results.totalInvestment,
        bestROI: { item: '', roi: -Infinity },
        totalProfit: 0
    };
    
    // Calculate raw materials cost with detailed breakdown
    Object.entries(results.raw).forEach(([mat, qty]) => {
        const cost = qty * (materialPrices[mat] || 0);
        investment.rawMaterials[mat] = { quantity: qty, cost: cost };
        investment.rawMaterialsCost += cost;
    });
    
    // Calculate reagents cost with detailed breakdown
    Object.entries(results.reagents).forEach(([reagent, qty]) => {
        const cost = qty * (materialPrices[reagent] || 0);
        investment.reagents[reagent] = { quantity: qty, cost: cost };
        investment.reagentsCost += cost;
    });
    
    // Find best ROI item and use only that item's profit
    Object.entries(results.roi).forEach(([item, roi]) => {
        if (roi > investment.bestROI.roi) {
            investment.bestROI = { item: item, roi: roi };
        }
    });
    
    // Use only the best ROI item's profit and financial details for the summary
    if (investment.bestROI.item && results.financials[investment.bestROI.item]) {
        const bestFinancial = results.financials[investment.bestROI.item];
        investment.totalProfit = bestFinancial.totalProfit;
        investment.buyingTax = bestFinancial.buyingTax;
        investment.totalRevenue = bestFinancial.totalRevenue;
        investment.netRevenue = bestFinancial.netRevenue;
        investment.sellingFee = bestFinancial.sellingFee;
    }
    
    window.investmentSummaries[category] = investment;
    
    // Display all investment summaries
    displayInvestmentSummaries();
}

function displayInvestmentSummaries() {
    const summaryElement = document.getElementById('investmentSummary');
    if (!summaryElement || !window.investmentSummaries) return;
    
    let html = '';
    
    Object.values(window.investmentSummaries).forEach(inv => {
        const profitColor = inv.totalProfit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        const roiColor = inv.bestROI.roi > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        
        // Build all base materials breakdown (base material + raw materials + reagents)
        const totalBaseMaterialsCost = inv.baseCost + inv.rawMaterialsCost + inv.reagentsCost;
        let baseMatsHtml = `<div class="ml-2 text-xs text-gray-600 dark:text-gray-400">
            ${inv.baseQuantity.toLocaleString()} ${inv.baseMaterial} (${inv.baseCost.toFixed(2)}g)
        </div>`;
        
        // Add raw materials
        Object.entries(inv.rawMaterials).forEach(([mat, data]) => {
            baseMatsHtml += `<div class="ml-2 text-xs text-gray-600 dark:text-gray-400">
                ${Math.round(data.quantity).toLocaleString()} ${mat} (${data.cost.toFixed(2)}g)
            </div>`;
        });
        
        // Add reagents to the same section
        Object.entries(inv.reagents).forEach(([reagent, data]) => {
            baseMatsHtml += `<div class="ml-2 text-xs text-gray-600 dark:text-gray-400">
                ${Math.round(data.quantity).toLocaleString()} ${reagent} (${data.cost.toFixed(2)}g)
            </div>`;
        });

        html += `
            <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded p-2 border border-gray-200 dark:border-nw-border">
                <div class="font-bold text-sm text-${inv.category === 'leather' ? 'amber' : inv.category === 'cloth' ? 'blue' : inv.category === 'wood' ? 'green' : inv.category === 'metal' ? 'gray' : 'stone'}-700 dark:text-nw-gold mb-1">
                    ${inv.category.toUpperCase()}
                </div>
                <div class="text-xs space-y-0.5 text-gray-800 dark:text-gray-200">
                    <div class="font-medium">Base Materials: ${totalBaseMaterialsCost.toFixed(2)}g</div>
                    ${baseMatsHtml}
                    
                    <div class="font-medium pt-1 border-t border-gray-300 dark:border-nw-border text-gray-900 dark:text-gray-100">
                        Materials Cost: ${inv.totalInvestment.toFixed(2)}g
                    </div>
                    <div class="text-red-600 dark:text-red-400">
                        Buying Tax (1.5%): ${(inv.buyingTax || 0).toFixed(2)}g
                    </div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">
                        Total Cost: ${(inv.totalInvestment + (inv.buyingTax || 0)).toFixed(2)}g
                    </div>
                    
                    <div class="pt-1 border-t border-gray-200 dark:border-gray-600">
                        <div class="text-gray-700 dark:text-gray-300">Gross Revenue: ${(inv.totalRevenue || 0).toFixed(2)}g</div>
                        <div class="text-red-600 dark:text-red-400">Selling Fee (6%): -${(inv.sellingFee || 0).toFixed(2)}g</div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">Net Revenue: ${(inv.netRevenue || 0).toFixed(2)}g</div>
                    </div>
                    
                    <div class="${profitColor} font-medium pt-1 border-t border-gray-300 dark:border-nw-border">
                        Total Profit: ${(inv.totalProfit || 0).toFixed(2)}g
                    </div>
                    <div class="text-xs ${roiColor}">
                        Best: ${inv.bestROI.item} (${inv.bestROI.roi.toFixed(1)}%)
                    </div>
                </div>
            </div>
        `;
    });
    
    summaryElement.innerHTML = html || '<div class="text-center text-gray-500 col-span-5">Enter base materials to see investment summary</div>';
}

function clearCategoryDisplay(category) {
    // Clear output display
    const outputElement = document.getElementById(`${category}AdvancedOutput`);
    if (outputElement) {
        outputElement.innerHTML = '<div class="text-center text-gray-500 dark:text-gray-400 text-xs">Enter base material quantity</div>';
    }
    
    // Clear dependent material inputs
    const categoryInputs = document.querySelectorAll(`.adv-material-input[data-category="${category}"]:not([data-is-base="true"])`);
    categoryInputs.forEach(input => {
        input.value = '';
    });
    
    // Remove from investment summary
    if (window.investmentSummaries) {
        delete window.investmentSummaries[category];
        displayInvestmentSummaries();
    }
}

// Export functions for use
window.advancedMaterialsPage = {
    generateAdvancedMaterialsPage,
    initializeAdvancedCalculations
};