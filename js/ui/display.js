// UI Display functions
function displayMaterials() {
    const materialsDiv = document.getElementById('requiredMaterials');
    if (!materialsDiv) return;
    
    materialsDiv.innerHTML = '';
    
    const sortedMaterials = Object.entries(materials).sort((a, b) => a[0].localeCompare(b[0]));
    
    if (sortedMaterials.length === 0) {
        materialsDiv.innerHTML = '<p class="col-span-2 text-gray-500 dark:text-gray-400 text-center py-4">No materials calculated yet</p>';
        return;
    }
    
    for (const [mat, qty] of sortedMaterials) {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center p-2 bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border text-sm';
        
        const cost = (prices[mat] || 0) * qty;
        div.innerHTML = `
            <span class="font-medium text-gray-900 dark:text-nw-text-light">${mat}</span>
            <div class="flex items-center gap-2">
                <span class="text-gray-700 dark:text-gray-400">${Math.ceil(qty).toLocaleString()}</span>
                ${cost > 0 ? `<span class="text-xs text-gray-600 dark:text-gray-500">(${cost.toFixed(2)}g)</span>` : ''}
            </div>
        `;
        materialsDiv.appendChild(div);
    }
    
    const totalCost = Object.entries(materials).reduce((sum, [mat, qty]) => {
        return sum + ((prices[mat] || 0) * qty);
    }, 0);
    
    if (totalCost > 0) {
        const totalDiv = document.createElement('div');
        totalDiv.className = 'col-span-2 pt-2 mt-2 border-t border-gray-200 dark:border-nw-border text-right font-bold text-gray-900 dark:text-nw-text-light';
        totalDiv.innerHTML = `Total Material Cost: ${totalCost.toFixed(2)}g`;
        materialsDiv.appendChild(totalDiv);
    }
}

function updatePriceDisplay() {
    document.querySelectorAll('[data-material]').forEach(input => {
        const mat = input.dataset.material;
        const label = input.parentElement.querySelector('label');
        const qty = materials[mat] || 0;
        if (label) {
            label.textContent = qty > 0 ? `${mat} (${qty})` : mat;
        }
    });
}

function displayRefinedResults(elementId, results, sortByROI = true) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create compact header for materials page
    const header = document.createElement('div');
    header.className = 'grid grid-cols-5 gap-1 pb-1 border-b border-gray-300 dark:border-nw-border font-bold text-xs text-gray-700 dark:text-nw-text-light';
    header.innerHTML = `
        <div class="col-span-2 pl-1">Item</div>
        <div class="text-center">Q</div>
        <div class="text-center">$</div>
        <div class="text-center">%</div>
    `;
    container.appendChild(header);
    
    // Always show all possible craftables for this category
    const allCraftables = {
        'leatherRefinedOutput': ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather'],
        'clothRefinedOutput': ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth'],
        'woodRefinedOutput': ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank'],
        'metalRefinedOutput': ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'],
        'stoneRefinedOutput': ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block']
    };
    
    const categoryItems = allCraftables[elementId] || [];
    
    // Create a map of results for quick lookup
    const resultsMap = {};
    results.forEach(r => {
        const baseName = r.name.replace(/ \(\d+\/day\)/, '').replace(/ \+\d+%/, '');
        resultsMap[baseName] = r;
    });
    
    // Create ROI-sorted copy for color ranking
    let colorRanking = [];
    if (sortByROI && results.length > 0) {
        const sortedByROI = [...results].sort((a, b) => b.roi - a.roi);
        colorRanking = sortedByROI.map(item => item.name);
    }
    
    // Display all items, even if not craftable
    categoryItems.forEach(itemName => {
        const result = resultsMap[itemName];
        const row = document.createElement('div');
        
        if (result) {
            // Item can be crafted
            row.className = 'grid grid-cols-5 gap-1 py-0.5 text-xs rounded px-1 text-gray-700 dark:text-nw-text-light';
            
            // Assign color based on ROI ranking
            let colorClass = 'roi-neutral';
            if (sortByROI && colorRanking.length > 0) {
                const roiRank = colorRanking.indexOf(result.name);
                const totalItems = colorRanking.length;
                const position = roiRank / Math.max(1, totalItems - 1);
                
                if (position <= 0.2) {
                    colorClass = 'roi-best';
                } else if (position <= 0.4) {
                    colorClass = 'roi-good';
                } else if (position <= 0.6) {
                    colorClass = 'roi-neutral';
                } else if (position <= 0.8) {
                    colorClass = 'roi-bad';
                } else {
                    colorClass = 'roi-worst';
                }
            }
            
            row.classList.add(colorClass);
            
            const qty = Math.floor(result.qty);
            const profit = result.profit * qty;
            const displayName = result.name.length > 15 ? result.name.substring(0, 14) + '..' : result.name;
            
            row.innerHTML = `
                <div class="col-span-2 font-medium truncate pl-1" title="${result.name}">${displayName}</div>
                <div class="text-center">
                    <input type="number" 
                           class="refined-qty-input w-10 px-0 py-0 text-xs text-center rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light"
                           value="${qty}"
                           min="0"
                           data-item="${result.name}"
                           data-category="${elementId}">
                </div>
                <div class="text-center font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">${profit >= 0 ? '+' : ''}${profit.toFixed(0)}</div>
                <div class="text-center font-bold">${result.roi.toFixed(0)}%</div>
            `;
            
            // Add event listener to the qty input
            const qtyInput = row.querySelector('.refined-qty-input');
            if (qtyInput) {
                qtyInput.addEventListener('input', (e) => {
                    handleRefinedQtyChange(e.target, result, row);
                });
            }
        } else {
            // Item cannot currently be crafted but input is still functional for reverse calculation
            row.className = 'grid grid-cols-5 gap-1 py-0.5 text-xs rounded px-1 text-gray-600 dark:text-gray-400';
            const displayName = itemName.length > 15 ? itemName.substring(0, 14) + '..' : itemName;
            const dailyLimit = dailyLimits[itemName] ? ` (${dailyLimits[itemName]}/d)` : '';
            
            row.innerHTML = `
                <div class="col-span-2 truncate pl-1" title="${itemName}">${displayName}${dailyLimit}</div>
                <div class="text-center">
                    <input type="number" 
                           class="reverse-qty-input w-10 px-0 py-0 text-xs text-center rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light"
                           value="0"
                           min="0"
                           data-item="${itemName}"
                           data-category="${elementId}">
                </div>
                <div class="text-center">-</div>
                <div class="text-center">-</div>
            `;
            
            // Add event listener for reverse calculation
            const qtyInput = row.querySelector('.reverse-qty-input');
            if (qtyInput) {
                qtyInput.addEventListener('input', (e) => {
                    handleReverseQtyChange(e.target, itemName, elementId);
                });
            }
        }
        
        container.appendChild(row);
    });
}

function handleReverseQtyChange(input, itemName, categoryId) {
    const newQty = parseInt(input.value) || 0;
    
    // Clear all other inputs in this category first
    const container = document.getElementById(categoryId);
    if (container) {
        const allInputs = container.querySelectorAll('.refined-qty-input, .reverse-qty-input');
        allInputs.forEach(otherInput => {
            if (otherInput !== input) {
                otherInput.value = 0;
            }
        });
    }
    
    if (newQty > 0) {
        // Account for crafting bonus - calculate how many times we need to craft
        const bonus = craftingBonuses[itemName] || 0;
        const outputPerCraft = 1 + (bonus / 100);
        const timesToCraft = Math.ceil(newQty / outputPerCraft);
        
        // Calculate materials needed for the actual number of crafts
        const mats = calculateRawMaterials(itemName, timesToCraft);
        
        // Determine category from elementId
        const category = categoryId.replace('RefinedOutput', '');
        
        // Update the base material inputs WITHOUT triggering recalculation
        updateCategoryMaterialInputs(mats, category);
    } else {
        // Clear base material inputs if quantity is 0
        const category = categoryId.replace('RefinedOutput', '');
        updateCategoryMaterialInputs({}, category);
    }
}

function handleRefinedQtyChange(input, originalResult, row) {
    const newQty = parseInt(input.value) || 0;
    const categoryId = input.dataset.category;
    
    // Clear all other inputs in this category first
    const container = document.getElementById(categoryId);
    if (container) {
        const allInputs = container.querySelectorAll('.refined-qty-input, .reverse-qty-input');
        allInputs.forEach(otherInput => {
            if (otherInput !== input) {
                otherInput.value = 0;
            }
        });
    }
    
    if (newQty > 0) {
        // Get the clean item name
        const itemName = originalResult.name.replace(/ \(\d+\/day\)/, '').replace(/ \+\d+%/, '');
        
        // Account for crafting bonus - calculate how many times we need to craft
        const bonus = craftingBonuses[itemName] || 0;
        const outputPerCraft = 1 + (bonus / 100);
        const timesToCraft = Math.ceil(newQty / outputPerCraft);
        
        // Calculate materials needed for the actual number of crafts
        const mats = calculateRawMaterials(itemName, timesToCraft);
        
        // Determine category from elementId
        const category = categoryId.replace('RefinedOutput', '');
        
        // Update the base material inputs WITHOUT triggering recalculation
        updateCategoryMaterialInputs(mats, category);
        
        // Update the row's calculated values for compact layout
        const profit = originalResult.profit * newQty;
        const roi = originalResult.cost > 0 ? (originalResult.profit / originalResult.cost * 100) : 0;
        
        // Update profit column (column 3)
        const profitCell = row.children[3];
        if (profitCell) {
            profitCell.className = `text-center font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`;
            profitCell.textContent = (profit >= 0 ? '+' : '') + profit.toFixed(0);
        }
        
        // Update ROI column (column 4) - ROI doesn't change with quantity
        const roiCell = row.children[4];
        if (roiCell) {
            roiCell.textContent = roi.toFixed(0) + '%';
        }
    } else {
        // Clear base material inputs
        const category = categoryId.replace('RefinedOutput', '');
        updateCategoryMaterialInputs({}, category);
    }
}

function updateCategoryMaterialInputs(materials, category) {
    const categoryMaterials = {
        'leather': ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
        'cloth': ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
        'wood': ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'],
        'metal': ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux', 'Charcoal'],
        'stone': ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent', 'Obsidian Sandpaper']
    };
    
    // Set a flag to prevent event handler feedback loop
    window.updatingMaterialInputs = true;
    
    // Clear inputs for this category first
    const materialsToUpdate = categoryMaterials[category] || [];
    materialsToUpdate.forEach(mat => {
        // Handle special case for Stone's Obsidian Sandpaper
        const inputId = (mat === 'Obsidian Sandpaper' && category === 'stone') 
            ? 'baseStoneObsidianSandpaper' 
            : 'base' + mat.replace(/\s/g, '');
        const input = document.getElementById(inputId);
        if (input) {
            input.value = '';
        }
    });
    
    // Set new values from calculated materials
    Object.entries(materials).forEach(([mat, qty]) => {
        if (materialsToUpdate.includes(mat)) {
            // Handle special case for Stone's Obsidian Sandpaper
            const inputId = (mat === 'Obsidian Sandpaper' && category === 'stone')
                ? 'baseStoneObsidianSandpaper'
                : 'base' + mat.replace(/\s/g, '');
            const input = document.getElementById(inputId);
            if (input) {
                input.value = Math.ceil(qty);
            }
        }
    });
    
    // Clear the flag after a short delay to allow events to settle
    setTimeout(() => {
        window.updatingMaterialInputs = false;
    }, 10);
}

function toggleCategory(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.collapsible-arrow');
    
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        arrow.style.transform = 'rotate(180deg)';
    }
}

function showCraftingPage() {
    document.getElementById('craftingPage').classList.remove('hidden');
    document.getElementById('materialsPage').classList.add('hidden');
    
    // Update tab styles
    const tabs = document.querySelectorAll('.page-tab');
    tabs[0].classList.add('text-nw-teal-dark', 'dark:text-nw-gold', 'border-b-4', 'border-nw-teal-dark', 'dark:border-nw-gold');
    tabs[0].classList.remove('text-gray-600', 'dark:text-gray-400', 'border-b-3', 'border-transparent');
    tabs[1].classList.remove('text-nw-teal-dark', 'dark:text-nw-gold', 'border-b-4', 'border-nw-teal-dark', 'dark:border-nw-gold');
    tabs[1].classList.add('text-gray-600', 'dark:text-gray-400', 'border-b-3', 'border-transparent');
}

function showMaterialsPage() {
    document.getElementById('craftingPage').classList.add('hidden');
    document.getElementById('materialsPage').classList.remove('hidden');
    
    // Update tab styles
    const tabs = document.querySelectorAll('.page-tab');
    tabs[1].classList.add('text-nw-teal-dark', 'dark:text-nw-gold', 'border-b-4', 'border-nw-teal-dark', 'dark:border-nw-gold');
    tabs[1].classList.remove('text-gray-600', 'dark:text-gray-400', 'border-b-3', 'border-transparent');
    tabs[0].classList.remove('text-nw-teal-dark', 'dark:text-nw-gold', 'border-b-4', 'border-nw-teal-dark', 'dark:border-nw-gold');
    tabs[0].classList.add('text-gray-600', 'dark:text-gray-400', 'border-b-3', 'border-transparent');
    
    // Initialize and calculate base materials
    setTimeout(() => {
        initializeBaseMaterialPrices();
        calculateBaseMaterials();
    }, 10);
}