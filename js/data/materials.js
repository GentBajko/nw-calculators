// Unified material category configuration
const MATERIAL_CONFIG = {
    leather: {
        name: 'LEATHER',
        icon: '🟫',
        color: 'amber',
        outputElementId: 'leatherRefinedOutput',
        baseMaterials: ['Rawhide', 'Thick Hide', 'Iron Hide', 'Dark Hide', 'Scarhide', 'Aged Tannin'],
        craftables: ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather'],
        inputPrefix: 'base',
        pricePrefix: 'price'
    },
    cloth: {
        name: 'CLOTH',
        icon: '🟦',
        color: 'blue',
        outputElementId: 'clothRefinedOutput',
        baseMaterials: ['Fibers', 'Silk Threads', 'Wirefiber', 'Spinfiber', 'Scalecloth', 'Wireweave'],
        craftables: ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth'],
        inputPrefix: 'base',
        pricePrefix: 'price'
    },
    wood: {
        name: 'WOOD',
        icon: '🟩',
        color: 'green',
        outputElementId: 'woodRefinedOutput',
        baseMaterials: ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Runewood', 'Wildwood', 'Obsidian Sandpaper'],
        craftables: ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank'],
        inputPrefix: 'base',
        pricePrefix: 'price'
    },
    metal: {
        name: 'METAL',
        icon: '⬛',
        color: 'gray',
        outputElementId: 'metalRefinedOutput',
        baseMaterials: ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Mythril Ore', 'Cinnabar', 'Obsidian Flux', 'Charcoal'],
        craftables: ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'],
        inputPrefix: 'base',
        pricePrefix: 'price',
        additionalBase: 'Green Wood' // For Charcoal calculation
    },
    stone: {
        name: 'STONE',
        icon: '⬜',
        color: 'stone',
        outputElementId: 'stoneRefinedOutput',
        baseMaterials: ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent', 'Obsidian Sandpaper'],
        craftables: ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block'],
        inputPrefix: 'base',
        pricePrefix: 'price',
        specialInputIds: {
            'Obsidian Sandpaper': 'baseStoneObsidianSandpaper'
        }
    }
};

// Legacy variables for backwards compatibility
const materialCategories = {
    'Reagents': ['Aged Tannin', 'Wireweave', 'Obsidian Sandpaper', 'Obsidian Flux', 'Pure Solvent', 'Charcoal'],
    'Leather Materials': ['Rawhide', 'Thick Hide', 'Iron Hide', 'Scarhide', 'Dark Hide'],
    'Cloth Materials': ['Fibers', 'Silk Threads', 'Wirefiber', 'Scalecloth', 'Spinfiber'],
    'Wood Materials': ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Wildwood', 'Runewood'],
    'Metal Materials': ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Cinnabar', 'Mythril Ore'],
    'Stone Materials': ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent']
};

const leatherItems = MATERIAL_CONFIG.leather.craftables;
const clothItems = MATERIAL_CONFIG.cloth.craftables;
const woodItems = MATERIAL_CONFIG.wood.craftables;
const metalItems = MATERIAL_CONFIG.metal.craftables;
const stoneItems = MATERIAL_CONFIG.stone.craftables;

const allCraftables = [...leatherItems, ...clothItems, ...woodItems, ...metalItems, ...stoneItems];

// Daily craft limits
const dailyLimits = {
    'Runic Leather': 10,
    'Phoenixweave': 10,
    'Glittering Ebony': 10,
    'Asmodeum': 10,
    'Runestone': 10,
    'Prismatic Leather': 10,
    'Prismatic Cloth': 10,
    'Prismatic Plank': 10,
    'Prismatic Ingot': 10,
    'Prismatic Block': 10
};