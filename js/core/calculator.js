// Core calculation functions
let materials = {};
let prices = {};
let sellPrices = {};

function calculateMaterials(item, qty, mats = {}, applyBonus = true) {
    if (recipes[item]) {
        let adjustedQty = qty;
        
        if (applyBonus) {
            // Check if this item has a crafting bonus
            const bonus = craftingBonuses[item] || 0;
            const bonusMultiplier = 1 + (bonus / 100);
            
            // Calculate actual materials needed considering the bonus
            // If we get 50% more output, we need fewer materials to get the same final quantity
            adjustedQty = qty / bonusMultiplier;
        }
        
        for (const [mat, amount] of Object.entries(recipes[item])) {
            calculateMaterials(mat, amount * adjustedQty, mats, applyBonus);
        }
    } else {
        // Always round up material requirements to ensure we have enough
        mats[item] = Math.ceil((mats[item] || 0) + qty);
    }
    return mats;
}

// Function for materials page - gets raw recipe requirements without bonuses
function calculateRawMaterials(item, qty, mats = {}) {
    return calculateMaterials(item, qty, mats, false);
}

function updateCalculations() {
    materials = {};
    
    // Get quantities to craft for all items
    const quantities = {};
    allCraftables.forEach(item => {
        const inputId = item.charAt(0).toLowerCase() + item.slice(1).replace(/\s/g, '');
        const input = document.getElementById(inputId);
        if (input) {
            quantities[item] = parseInt(input.value) || 0;
        }
    });
    
    // Get what user already has
    const alreadyHave = {
        'Runic Leather': parseInt(document.getElementById('haveRunicLeather')?.value) || 0,
        'Phoenixweave': parseInt(document.getElementById('havePhoenixweave')?.value) || 0,
        'Glittering Ebony': parseInt(document.getElementById('haveGlitteringEbony')?.value) || 0,
        'Asmodeum': parseInt(document.getElementById('haveAsmodeum')?.value) || 0,
        'Runestone': parseInt(document.getElementById('haveRunestone')?.value) || 0
    };
    
    // Calculate adjusted quantities
    const adjustedQuantities = {...quantities};
    
    // Adjust for Prismatic items
    if (quantities['Prismatic Leather'] > 0) {
        adjustedQuantities['Runic Leather'] = Math.max(0, (adjustedQuantities['Runic Leather'] || 0) + quantities['Prismatic Leather'] - alreadyHave['Runic Leather']);
    }
    if (quantities['Prismatic Cloth'] > 0) {
        adjustedQuantities['Phoenixweave'] = Math.max(0, (adjustedQuantities['Phoenixweave'] || 0) + quantities['Prismatic Cloth'] - alreadyHave['Phoenixweave']);
    }
    if (quantities['Prismatic Plank'] > 0) {
        adjustedQuantities['Glittering Ebony'] = Math.max(0, (adjustedQuantities['Glittering Ebony'] || 0) + quantities['Prismatic Plank'] - alreadyHave['Glittering Ebony']);
    }
    if (quantities['Prismatic Ingot'] > 0) {
        adjustedQuantities['Asmodeum'] = Math.max(0, (adjustedQuantities['Asmodeum'] || 0) + quantities['Prismatic Ingot'] - alreadyHave['Asmodeum']);
    }
    if (quantities['Prismatic Block'] > 0) {
        adjustedQuantities['Runestone'] = Math.max(0, (adjustedQuantities['Runestone'] || 0) + quantities['Prismatic Block'] - alreadyHave['Runestone']);
    }
    
    // Calculate materials for Prismatic items (excluding their intermediate requirements)
    for (const item of ['Prismatic Leather', 'Prismatic Cloth', 'Prismatic Plank', 'Prismatic Ingot', 'Prismatic Block']) {
        if (quantities[item] > 0) {
            const recipe = recipes[item];
            for (const [mat, amount] of Object.entries(recipe)) {
                if (!['Runic Leather', 'Phoenixweave', 'Glittering Ebony', 'Asmodeum', 'Runestone'].includes(mat)) {
                    if (mat in recipes) {
                        calculateMaterials(mat, amount * quantities[item], materials);
                    } else {
                        materials[mat] = (materials[mat] || 0) + (amount * quantities[item]);
                    }
                }
            }
        }
    }
    
    // Calculate materials for all other items
    for (const [item, qty] of Object.entries(adjustedQuantities)) {
        if (qty > 0 && !item.startsWith('Prismatic')) {
            calculateMaterials(item, qty, materials);
        }
    }
    
    displayCraftingSummary();
    updatePriceDisplay();
}

function calculateItemCost(item) {
    const itemMaterials = {};
    calculateMaterials(item, 1, itemMaterials);
    
    let cost = 0;
    for (const [mat, qty] of Object.entries(itemMaterials)) {
        cost += (prices[mat] || 0) * qty;
    }
    
    // The cost is already adjusted for bonuses in calculateMaterials
    return cost;
}

function calculateCosts() {
    const resultsDiv = document.getElementById('costResults');
    if (!resultsDiv) return;
    
    resultsDiv.innerHTML = '';
    
    const costResults = [];
    allCraftables.forEach(item => {
        const inputId = item.charAt(0).toLowerCase() + item.slice(1).replace(/\s/g, '');
        const input = document.getElementById(inputId);
        const qty = parseInt(input?.value) || 0;
        
        if (qty > 0) {
            const unitCost = calculateItemCost(item);
            const totalCost = unitCost * qty;
            const sellPrice = sellPrices[item] || 0;
            const profit = sellPrice - unitCost;
            const totalProfit = profit * qty;
            
            // Add bonus info to item name if applicable
            const bonus = craftingBonuses[item] || 0;
            const displayName = item + (bonus > 0 ? ` (+${bonus}%)` : '');
            
            costResults.push({
                item: displayName,
                qty,
                unitCost,
                totalCost,
                sellPrice,
                profit,
                totalProfit,
                originalItem: item
            });
        }
    });
    
    if (costResults.length === 0) {
        resultsDiv.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No items to craft</p>';
        return;
    }
    
    // Sort by total profit descending
    costResults.sort((a, b) => b.totalProfit - a.totalProfit);
    
    let totalCraftingCost = 0;
    let totalExpectedProfit = 0;
    
    costResults.forEach(result => {
        totalCraftingCost += result.totalCost;
        totalExpectedProfit += result.totalProfit;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid grid-cols-5 gap-1 items-center p-2 bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border';
        
        const profitClass = result.profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        const profitIndicator = result.profit > 0 ? '📈' : '📉';
        
        itemDiv.innerHTML = `
            <div class="font-medium text-sm text-gray-900 dark:text-nw-text-light">${result.item} (${result.qty})</div>
            <div class="text-center text-sm text-gray-900 dark:text-nw-text-light">${result.unitCost.toFixed(2)}g</div>
            <div class="text-center text-sm text-gray-900 dark:text-nw-text-light">${result.totalCost.toFixed(2)}g</div>
            <div class="flex items-center justify-center gap-1">
                <input type="number" data-sellprice="${result.originalItem || result.item}" value="${result.sellPrice}" 
                       min="0" step="0.01" placeholder="0.00"
                       class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
            </div>
            <div class="text-center text-sm font-bold ${profitClass}">${profitIndicator} ${result.totalProfit.toFixed(2)}g</div>
        `;
        resultsDiv.appendChild(itemDiv);
    });
    
    // Add total summary
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'mt-4 p-3 bg-gray-100 dark:bg-nw-dark-bg-tertiary rounded border-2 border-gray-300 dark:border-nw-border';
    summaryDiv.innerHTML = `
        <div class="grid grid-cols-3 gap-4 text-sm">
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-400">Total Cost</div>
                <div class="font-bold text-lg text-gray-900 dark:text-nw-text-light">${totalCraftingCost.toFixed(2)}g</div>
            </div>
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-400">Expected Revenue</div>
                <div class="font-bold text-lg text-gray-900 dark:text-nw-text-light">${(totalCraftingCost + totalExpectedProfit).toFixed(2)}g</div>
            </div>
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-400">Expected Profit</div>
                <div class="font-bold text-lg ${totalExpectedProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">${totalExpectedProfit >= 0 ? '📈' : '📉'} ${totalExpectedProfit.toFixed(2)}g</div>
            </div>
        </div>
    `;
    resultsDiv.appendChild(summaryDiv);
    
    // Add event listeners for sell price inputs
    document.querySelectorAll('[data-sellprice]').forEach(input => {
        input.addEventListener('input', () => {
            const item = input.dataset.sellprice;
            sellPrices[item] = parseFloat(input.value) || 0;
            savePrices();
            displayCraftingSummary();
        });
    });
}

function displayCraftingSummary() {
    const summaryDiv = document.getElementById('craftingSummary');
    if (!summaryDiv) return;
    
    summaryDiv.innerHTML = '';
    
    // Get all items to craft
    const itemsToCraft = [];
    allCraftables.forEach(item => {
        const inputId = item.charAt(0).toLowerCase() + item.slice(1).replace(/\s/g, '');
        const input = document.getElementById(inputId);
        const qty = parseInt(input?.value) || 0;
        
        if (qty > 0) {
            const unitCost = calculateItemCost(item);
            const totalCost = unitCost * qty;
            const sellPrice = sellPrices[item] || 0;
            const totalRevenue = sellPrice * qty;
            const profit = totalRevenue - totalCost;
            
            // Add bonus info to item name if applicable
            const bonus = craftingBonuses[item] || 0;
            const displayName = item + (bonus > 0 ? ` (+${bonus}%)` : '');
            
            itemsToCraft.push({
                item: displayName,
                originalItem: item,
                qty,
                unitCost,
                totalCost,
                sellPrice,
                totalRevenue,
                profit
            });
        }
    });
    
    if (itemsToCraft.length === 0) {
        summaryDiv.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No items to craft</p>';
        return;
    }
    
    // Sort by profit descending
    itemsToCraft.sort((a, b) => b.profit - a.profit);
    
    // Create a clean table-style layout
    const tableContainer = document.createElement('div');
    tableContainer.className = 'space-y-4';
    
    // Items Table Header
    const itemsHeader = document.createElement('div');
    itemsHeader.innerHTML = '<h3 class="text-lg font-bold text-gray-800 dark:text-nw-text-light mb-3">📦 Items & Profitability</h3>';
    tableContainer.appendChild(itemsHeader);
    
    // Items Table
    const itemsTable = document.createElement('div');
    itemsTable.className = 'bg-white dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border overflow-hidden';
    
    // Table Header
    const tableHeader = document.createElement('div');
    tableHeader.className = 'grid grid-cols-6 gap-3 p-3 bg-gray-100 dark:bg-nw-dark-bg border-b border-gray-200 dark:border-nw-border text-sm font-bold text-gray-700 dark:text-nw-text-light';
    tableHeader.innerHTML = `
        <div>Item</div>
        <div class="text-center">Qty</div>
        <div class="text-center">Unit Cost</div>
        <div class="text-center">Total Cost</div>
        <div class="text-center">Sell Price</div>
        <div class="text-center">Profit</div>
    `;
    itemsTable.appendChild(tableHeader);
    
    // Table Rows
    itemsToCraft.forEach(item => {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-6 gap-3 p-3 border-b border-gray-100 dark:border-nw-border text-sm items-center hover:bg-gray-50 dark:hover:bg-nw-dark-bg-tertiary';
        
        const profitClass = item.profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        const profitIcon = item.profit > 0 ? '📈' : '📉';
        
        row.innerHTML = `
            <div class="font-medium text-gray-900 dark:text-nw-text-light">${item.item}</div>
            <div class="text-center text-gray-700 dark:text-gray-300">${item.qty}</div>
            <div class="text-center">
                <span class="text-yellow-600 dark:text-yellow-400 font-bold">${Math.ceil(item.unitCost)}</span>
                <span class="text-yellow-500 dark:text-yellow-300 text-xs ml-1">gold</span>
            </div>
            <div class="text-center">
                <span class="text-yellow-600 dark:text-yellow-400 font-bold">${Math.ceil(item.totalCost)}</span>
                <span class="text-yellow-500 dark:text-yellow-300 text-xs ml-1">gold</span>
            </div>
            <div class="text-center">
                <input type="number" data-sellprice="${item.originalItem}" value="${item.sellPrice}" 
                       min="0" step="0.01" placeholder="0.00"
                       class="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light text-center">
            </div>
            <div class="text-center ${profitClass} font-bold">
                ${profitIcon} 
                <span class="text-yellow-600 dark:text-yellow-400">${Math.ceil(Math.abs(item.profit))}</span>
                <span class="text-yellow-500 dark:text-yellow-300 text-xs ml-1">gold</span>
            </div>
        `;
        itemsTable.appendChild(row);
    });
    
    tableContainer.appendChild(itemsTable);
    
    // Materials Section
    const materialsHeader = document.createElement('div');
    materialsHeader.innerHTML = '<h3 class="text-lg font-bold text-gray-800 dark:text-nw-text-light mb-3 mt-6">🔧 Required Materials</h3>';
    tableContainer.appendChild(materialsHeader);
    
    const sortedMaterials = Object.entries(materials).sort((a, b) => a[0].localeCompare(b[0]));
    
    if (sortedMaterials.length === 0) {
        const noMaterials = document.createElement('p');
        noMaterials.className = 'text-gray-500 dark:text-gray-400 text-center py-4';
        noMaterials.textContent = 'No materials needed';
        tableContainer.appendChild(noMaterials);
    } else {
        const materialsList = document.createElement('div');
        materialsList.className = 'bg-white dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border p-4';
        
        const materialsGrid = document.createElement('div');
        materialsGrid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3';
        
        sortedMaterials.forEach(([mat, qty]) => {
            const cost = (prices[mat] || 0) * qty;
            const matDiv = document.createElement('div');
            matDiv.className = 'flex justify-between items-center p-2 bg-gray-50 dark:bg-nw-dark-bg rounded text-sm';
            
            matDiv.innerHTML = `
                <span class="font-medium text-gray-900 dark:text-nw-text-light">${mat}</span>
                <div class="text-right">
                    <div class="text-gray-700 dark:text-gray-300 font-bold">${Math.ceil(qty)}</div>
                    ${cost > 0 ? `<div class="text-xs"><span class="text-yellow-600 dark:text-yellow-400 font-bold">${Math.ceil(cost)}</span><span class="text-yellow-500 dark:text-yellow-300 ml-1">gold</span></div>` : ''}
                </div>
            `;
            materialsGrid.appendChild(matDiv);
        });
        
        materialsList.appendChild(materialsGrid);
        tableContainer.appendChild(materialsList);
    }
    
    // Summary Section
    const totalCost = itemsToCraft.reduce((sum, item) => sum + item.totalCost, 0);
    const totalRevenue = itemsToCraft.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalProfit = totalRevenue - totalCost;
    
    const summarySection = document.createElement('div');
    summarySection.className = 'mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-nw-dark-bg-tertiary dark:to-nw-dark-bg rounded-lg border border-gray-200 dark:border-nw-border';
    summarySection.innerHTML = `
        <h3 class="text-lg font-bold text-gray-800 dark:text-nw-text-light mb-3 text-center">📊 Summary</h3>
        <div class="grid grid-cols-3 gap-6 text-center">
            <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Investment</div>
                <div class="text-xl font-bold">
                    <span class="text-yellow-600 dark:text-yellow-400">${Math.ceil(totalCost)}</span>
                    <span class="text-yellow-500 dark:text-yellow-300 text-sm ml-1">gold</span>
                </div>
            </div>
            <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Revenue</div>
                <div class="text-xl font-bold">
                    <span class="text-yellow-600 dark:text-yellow-400">${Math.ceil(totalRevenue)}</span>
                    <span class="text-yellow-500 dark:text-yellow-300 text-sm ml-1">gold</span>
                </div>
            </div>
            <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Profit</div>
                <div class="text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                    ${totalProfit >= 0 ? '📈' : '📉'} 
                    <span class="text-yellow-600 dark:text-yellow-400">${Math.ceil(Math.abs(totalProfit))}</span>
                    <span class="text-yellow-500 dark:text-yellow-300 text-lg ml-1">gold</span>
                </div>
            </div>
        </div>
    `;
    tableContainer.appendChild(summarySection);
    
    summaryDiv.appendChild(tableContainer);
}