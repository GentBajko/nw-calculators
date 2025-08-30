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
                <span class="text-gray-700 dark:text-gray-400">${qty.toLocaleString()}</span>
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
    
    // Create header
    const header = document.createElement('div');
    header.className = 'grid grid-cols-7 gap-2 pb-1 border-b border-gray-300 dark:border-nw-border font-bold text-sm text-gray-700 dark:text-nw-text-light';
    header.innerHTML = `
        <div>Item</div>
        <div class="text-center">Qty</div>
        <div class="text-center">Unit Cost</div>
        <div class="text-center">Market</div>
        <div class="text-center">Total Cost</div>
        <div class="text-center">Total Revenue</div>
        <div class="text-center">ROI</div>
    `;
    container.appendChild(header);
    
    if (results.length === 0) {
        const emptyRow = document.createElement('div');
        emptyRow.className = 'text-center text-gray-500 dark:text-gray-400 py-3 col-span-7 text-sm';
        emptyRow.textContent = 'No materials or prices set';
        container.appendChild(emptyRow);
        return;
    }
    
    // Create ROI-sorted copy for color ranking, but keep original order for display
    let colorRanking = [];
    if (sortByROI) {
        const sortedByROI = [...results].sort((a, b) => b.roi - a.roi);
        colorRanking = sortedByROI.map(item => item.name);
    }
    
    results.forEach((result, index) => {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-7 gap-2 py-1 text-sm rounded px-1 text-gray-700 dark:text-nw-text-light';
        
        // Assign color based on ROI ranking position, not display position
        let colorClass = 'roi-neutral';
        if (sortByROI && colorRanking.length > 0) {
            const roiRank = colorRanking.indexOf(result.name);
            const totalItems = colorRanking.length;
            const position = roiRank / Math.max(1, totalItems - 1);
            
            if (position <= 0.2) {
                colorClass = 'roi-best';      // Top 20% ROI - Strong green
            } else if (position <= 0.4) {
                colorClass = 'roi-good';      // Next 20% ROI - Light green
            } else if (position <= 0.6) {
                colorClass = 'roi-neutral';   // Middle 20% ROI - Yellow
            } else if (position <= 0.8) {
                colorClass = 'roi-bad';       // Next 20% ROI - Orange
            } else {
                colorClass = 'roi-worst';     // Bottom 20% ROI - Red
            }
        }
        
        row.classList.add(colorClass);
        
        const totalCost = result.cost * result.qty;
        const totalRevenue = result.price * result.qty;
        
        row.innerHTML = `
            <div class="font-medium truncate">${result.name}</div>
            <div class="text-center">${result.qty.toLocaleString()}</div>
            <div class="text-center">${result.cost.toFixed(2)}</div>
            <div class="text-center">${result.price.toFixed(2)}</div>
            <div class="text-center">${totalCost.toFixed(2)}</div>
            <div class="text-center">${totalRevenue.toFixed(2)}</div>
            <div class="text-center font-bold">${result.roi.toFixed(0)}%</div>
        `;
        container.appendChild(row);
    });
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