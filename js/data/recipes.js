// Crafting bonuses (percentage increase in output)
const craftingBonuses = {
    'Coarse Leather': 50,
    'Rugged Leather': 48,
    'Layered Leather': 45,
    'Infused Leather': 43,
    'Dark Leather': 30,
    'Runic Leather': 25,
    'Prismatic Leather': 20
};

// Complete recipe database from crafting.txt
const recipes = {
    // Leather
    'Prismatic Leather': {
        'Runic Leather': 1,
        'Dark Leather': 12,
        'Aged Tannin': 4
    },
    'Runic Leather': {
        'Infused Leather': 5,
        'Scarhide': 2,
        'Aged Tannin': 1
    },
    'Dark Leather': {
        'Infused Leather': 2,
        'Dark Hide': 16,
        'Aged Tannin': 1
    },
    'Infused Leather': {
        'Layered Leather': 2,
        'Iron Hide': 8,
        'Aged Tannin': 1
    },
    'Layered Leather': {
        'Rugged Leather': 2,
        'Thick Hide': 6,
        'Aged Tannin': 1
    },
    'Rugged Leather': {
        'Coarse Leather': 4,
        'Aged Tannin': 1
    },
    'Coarse Leather': {
        'Rawhide': 4
    },
    
    // Cloth
    'Prismatic Cloth': {
        'Phoenixweave': 1,
        'Spinweave Cloth': 10,
        'Wireweave': 4
    },
    'Phoenixweave': {
        'Infused Silk': 5,
        'Scalecloth': 2,
        'Wireweave': 1
    },
    'Spinweave Cloth': {
        'Infused Silk': 2,
        'Spinfiber': 12,
        'Wireweave': 1
    },
    'Infused Silk': {
        'Silk': 2,
        'Wirefiber': 8,
        'Wireweave': 1
    },
    'Silk': {
        'Sateen': 2,
        'Silk Threads': 6,
        'Wireweave': 1
    },
    'Sateen': {
        'Linen': 4,
        'Wireweave': 1
    },
    'Linen': {
        'Fibers': 4
    },
    
    // Wood
    'Prismatic Plank': {
        'Glittering Ebony': 1,
        'Runewood Plank': 10,
        'Obsidian Sandpaper': 4
    },
    'Glittering Ebony': {
        'Ironwood Plank': 5,
        'Wildwood': 2,
        'Obsidian Sandpaper': 1
    },
    'Runewood Plank': {
        'Ironwood Plank': 2,
        'Runewood': 12,
        'Obsidian Sandpaper': 1
    },
    'Ironwood Plank': {
        'Wyrdwood Plank': 2,
        'Ironwood': 8,
        'Obsidian Sandpaper': 1
    },
    'Wyrdwood Plank': {
        'Lumber': 2,
        'Wyrdwood': 6,
        'Obsidian Sandpaper': 1
    },
    'Lumber': {
        'Timber': 2,
        'Aged Wood': 4,
        'Obsidian Sandpaper': 1
    },
    'Timber': {
        'Green Wood': 4
    },
    
    // Metal
    'Prismatic Ingot': {
        'Asmodeum': 1,
        'Mythril Ingot': 10,
        'Obsidian Flux': 4,
        'Charcoal': 4
    },
    'Asmodeum': {
        'Orichalcum Ingot': 1,
        'Cinnabar': 2,
        'Obsidian Flux': 1,
        'Charcoal': 2
    },
    'Mythril Ingot': {
        'Orichalcum Ingot': 2,
        'Mythril Ore': 12,
        'Obsidian Flux': 1,
        'Charcoal': 2
    },
    'Orichalcum Ingot': {
        'Starmetal Ingot': 2,
        'Orichalcum Ore': 8,
        'Obsidian Flux': 1,
        'Charcoal': 2
    },
    'Starmetal Ingot': {
        'Steel Ingot': 2,
        'Starmetal Ore': 6,
        'Obsidian Flux': 1,
        'Charcoal': 2
    },
    'Steel Ingot': {
        'Iron Ingot': 3,
        'Obsidian Flux': 1,
        'Charcoal': 2
    },
    'Iron Ingot': {
        'Iron Ore': 4
    },
    'Charcoal': {
        'Green Wood': 2
    },
    
    // Stone
    'Prismatic Block': {
        'Runestone': 1,
        'Runic Voidstone': 5,
        'Pure Solvent': 4
    },
    'Runestone': {
        'Obsidian Voidstone': 5,
        'Loamy Lodestone': 1,
        'Obsidian Sandpaper': 1
    },
    'Runic Voidstone': {
        'Obsidian Voidstone': 1,
        'Powerful Gemstone Dust': 1,
        'Pure Solvent': 4
    },
    'Obsidian Voidstone': {
        'Lodestone Brick': 8,
        'Lodestone': 2,
        'Loamy Lodestone': 1,
        'Obsidian Sandpaper': 1
    },
    'Lodestone Brick': {
        'Stone Brick': 2,
        'Lodestone': 1,
        'Obsidian Sandpaper': 1
    },
    'Stone Brick': {
        'Stone Block': 4,
        'Obsidian Sandpaper': 1
    },
    'Stone Block': {
        'Stone': 4
    }
};