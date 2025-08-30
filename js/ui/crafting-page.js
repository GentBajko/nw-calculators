// Crafting page UI generation
function generateCraftingPage() {
    const craftingPage = document.getElementById('craftingPage');
    
    craftingPage.innerHTML = `
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <!-- Main Content - 3/4 width -->
            <div class="xl:col-span-3 space-y-4">
                <!-- Craft Planner Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                    <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                        🎯 CRAFT PLANNER
                    </h2>
                    
                    <!-- 5 Categories in one row -->
                    <div class="grid grid-cols-5 gap-3 mb-4">
                        ${generateCraftCategories()}
                    </div>
                    
                    <!-- Materials I Already Have Section -->
                    <div class="mt-6 p-3 bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded border border-gray-200 dark:border-nw-border">
                        <h3 class="text-sm font-bold text-gray-700 dark:text-nw-text-light mb-2">📦 Materials I Already Have</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            <div class="flex gap-2 items-center">
                                <label class="text-xs flex-1 text-gray-600 dark:text-gray-400">Runic Leather</label>
                                <input type="number" id="haveRunicLeather" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                            </div>
                            <div class="flex gap-2 items-center">
                                <label class="text-xs flex-1 text-gray-600 dark:text-gray-400">Phoenixweave</label>
                                <input type="number" id="havePhoenixweave" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                            </div>
                            <div class="flex gap-2 items-center">
                                <label class="text-xs flex-1 text-gray-600 dark:text-gray-400">Glittering Ebony</label>
                                <input type="number" id="haveGlitteringEbony" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                            </div>
                            <div class="flex gap-2 items-center">
                                <label class="text-xs flex-1 text-gray-600 dark:text-gray-400">Asmodeum</label>
                                <input type="number" id="haveAsmodeum" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                            </div>
                            <div class="flex gap-2 items-center">
                                <label class="text-xs flex-1 text-gray-600 dark:text-gray-400">Runestone</label>
                                <input type="number" id="haveRunestone" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Crafting Summary Section -->
                <div class="bg-white dark:bg-nw-dark-bg-secondary rounded-lg shadow-lg p-4">
                    <h2 class="text-xl font-bold text-nw-teal-dark dark:text-nw-gold mb-4 pb-2 border-b-2 border-gray-200 dark:border-nw-border">
                        💰 CRAFTING SUMMARY
                    </h2>
                    <div id="craftingSummary" class="space-y-3"></div>
                </div>
            </div>
            
            <!-- Right Column - Pricing Table (1/4 width) -->
            <div id="pricingTableContainer" class="xl:col-span-1">
                <!-- Pricing table will be inserted here -->
            </div>
        </div>
    `;
}

function generateCraftCategories() {
    const categories = [
        { name: 'LEATHER', icon: '🟫', items: leatherItems, color: 'amber' },
        { name: 'CLOTH', icon: '🟦', items: clothItems, color: 'blue' },
        { name: 'WOOD', icon: '🟩', items: woodItems, color: 'green' },
        { name: 'METAL', icon: '⬛', items: metalItems, color: 'gray' },
        { name: 'STONE', icon: '⬜', items: stoneItems, color: 'stone' }
    ];
    
    return categories.map(category => `
        <div class="bg-gray-50 dark:bg-nw-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-nw-border">
            <div class="category-header bg-${category.color}-50 dark:bg-${category.color}-900/10 px-2 py-2 rounded-t-lg border-b-2 border-${category.color}-600 dark:border-nw-gold">
                <span class="font-medium text-xs text-${category.color}-800 dark:text-nw-gold">${category.icon} ${category.name}</span>
            </div>
            <div class="category-content p-2 space-y-1">
                ${category.items.map(item => {
                    const inputId = item.charAt(0).toLowerCase() + item.slice(1).replace(/\s/g, '');
                    const limit = dailyLimits[item] ? ` <span class="text-xs text-gray-500">(${dailyLimits[item]}/day)</span>` : '';
                    return `
                        <div class="flex gap-2 items-center">
                            <label class="text-xs flex-1 text-gray-700 dark:text-nw-text-light">${item}${limit}</label>
                            <input type="number" id="${inputId}" min="0" placeholder="0" class="w-20 px-2 py-1 text-xs rounded border border-gray-300 dark:border-nw-border bg-white dark:bg-nw-dark-bg text-gray-900 dark:text-nw-text-light">
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function initializePrices() {
    // Generate and insert the pricing table
    const container = document.getElementById('pricingTableContainer');
    if (container) {
        container.innerHTML = generatePricingTable();
        initializePricingTable();
    }
}