// Unified pricing table component
function generatePricingTable() {
    const categories = [
        {
            name: 'REAGENTS',
            icon: '⚗️',
            color: 'purple',
            baseMaterials: ['Aged Tannin', 'Wireweave', 'Obsidian Sandpaper', 'Obsidian Flux', 'Pure Solvent'],
            refinedMaterials: ['Charcoal']
        },
        {
            name: 'LEATHER',
            icon: '🟫',
            color: 'amber',
            baseMaterials: ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide'],
            refinedMaterials: ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather']
        },
        {
            name: 'CLOTH',
            icon: '🟦',
            color: 'blue',
            baseMaterials: ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth'],
            refinedMaterials: ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth']
        },
        {
            name: 'WOOD',
            icon: '🟩',
            color: 'green',
            baseMaterials: ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood'],
            refinedMaterials: ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank']
        },
        {
            name: 'METAL',
            icon: '⬛',
            color: 'gray',
            baseMaterials: ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar'],
            refinedMaterials: ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot']
        },
        {
            name: 'STONE',
            icon: '⬜',
            color: 'stone',
            baseMaterials: ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust'],
            refinedMaterials: ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block']
        }
    ];

    let html = `
        <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-3">
            <h2 class="text-base font-bold text-nw-teal-dark dark:text-nw-gold mb-2 pb-1 border-b-2 border-gray-200 dark:border-nw-border">
                💰 PRICES
            </h2>
            <div class="space-y-3 max-h-[700px] overflow-y-auto custom-scrollbar">
    `;

    categories.forEach(category => {
        html += `
            <div class="border border-gray-200 dark:border-nw-border rounded-lg overflow-hidden">
                <div class="bg-${category.color}-50 dark:bg-${category.color}-900/20 px-2 py-1 border-b border-gray-200 dark:border-nw-border">
                    <h3 class="text-xs font-bold text-${category.color}-800 dark:text-nw-gold">
                        ${category.icon} ${category.name}
                    </h3>
                </div>
                <div class="p-2">
                    <div class="grid grid-cols-1 gap-2">
                        <!-- Base Materials Column -->
                        <div>
                            <h4 class="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">Base Materials</h4>
                            <div class="space-y-0.5">
                                ${category.baseMaterials.map(material => `
                                    <div class="flex gap-1 items-center">
                                        <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light truncate" title="${material}">${material}</label>
                                        <input type="number" 
                                               data-material="${material}" 
                                               data-type="base"
                                               min="0" 
                                               step="0.01" 
                                               placeholder="0" 
                                               value="${prices[material] || ''}"
                                               class="price-input w-14 px-1 py-0.5 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Refined Materials Column -->
                        <div>
                            <h4 class="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">Refined Materials</h4>
                            <div class="space-y-0.5">
                                ${category.refinedMaterials.map(material => {
                                    const limit = dailyLimits[material] ? ` (${dailyLimits[material]}/d)` : '';
                                    return `
                                        <div class="flex gap-1 items-center">
                                            <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light truncate" title="${material}${limit}">${material}${limit}</label>
                                            <input type="number" 
                                                   data-material="${material}" 
                                                   data-type="refined"
                                                   min="0" 
                                                   step="0.01" 
                                                   placeholder="0" 
                                                   value="${sellPrices[material] || ''}"
                                                   class="price-input w-14 px-1 py-0.5 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

function initializePricingTable() {
    // Add event listeners to all price inputs
    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', () => {
            const material = input.dataset.material;
            const type = input.dataset.type;
            const value = parseFloat(input.value) || 0;
            
            if (type === 'base') {
                prices[material] = value;
            } else {
                sellPrices[material] = value;
            }
            
            savePrices();
            updateCalculations();
            
            // Update materials analysis if on that page
            const materialsPage = document.getElementById('materialsPage');
            if (materialsPage && !materialsPage.classList.contains('hidden')) {
                calculateBaseMaterials();
            }
        });
    });
}

function updatePricingTableValues() {
    // Update all price input values from stored prices
    document.querySelectorAll('.price-input').forEach(input => {
        const material = input.dataset.material;
        const type = input.dataset.type;
        
        if (type === 'base') {
            input.value = prices[material] || '';
        } else {
            input.value = sellPrices[material] || '';
        }
    });
}