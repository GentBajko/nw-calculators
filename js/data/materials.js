// Material categories and item lists
const materialCategories = {
    'Reagents': ['Aged Tannin', 'Wireweave', 'Obsidian Sandpaper', 'Obsidian Flux', 'Pure Solvent', 'Charcoal'],
    'Leather Materials': ['Rawhide', 'Thick Hide', 'Iron Hide', 'Scarhide', 'Dark Hide'],
    'Cloth Materials': ['Fibers', 'Silk Threads', 'Wirefiber', 'Scalecloth', 'Spinfiber'],
    'Wood Materials': ['Green Wood', 'Aged Wood', 'Wyrdwood', 'Ironwood', 'Wildwood', 'Runewood'],
    'Metal Materials': ['Iron Ore', 'Starmetal Ore', 'Orichalcum Ore', 'Cinnabar', 'Mythril Ore'],
    'Stone Materials': ['Stone', 'Lodestone', 'Loamy Lodestone', 'Powerful Gemstone Dust', 'Pure Solvent']
};

const leatherItems = ['Coarse Leather', 'Rugged Leather', 'Layered Leather', 'Infused Leather', 'Dark Leather', 'Runic Leather', 'Prismatic Leather'];
const clothItems = ['Linen', 'Sateen', 'Silk', 'Infused Silk', 'Spinweave Cloth', 'Phoenixweave', 'Prismatic Cloth'];
const woodItems = ['Timber', 'Lumber', 'Wyrdwood Plank', 'Ironwood Plank', 'Runewood Plank', 'Glittering Ebony', 'Prismatic Plank'];
const metalItems = ['Iron Ingot', 'Steel Ingot', 'Starmetal Ingot', 'Orichalcum Ingot', 'Mythril Ingot', 'Asmodeum', 'Prismatic Ingot'];
const stoneItems = ['Stone Block', 'Stone Brick', 'Lodestone Brick', 'Obsidian Voidstone', 'Runic Voidstone', 'Runestone', 'Prismatic Block'];

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