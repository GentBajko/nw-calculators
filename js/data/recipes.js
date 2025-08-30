// Crafting bonuses (percentage increase in output)
const craftingBonuses = {
    // Leather
    'Coarse Leather': 50,
    'Rugged Leather': 48,
    'Layered Leather': 45,
    'Infused Leather': 38,
    'Dark Leather': 30,
    'Runic Leather': 25,
    'Prismatic Leather': 20,
    
    // Cloth
    'Linen': 50,
    'Sateen': 48,
    'Silk': 45,
    'Infused Silk': 38,
    'Spinweave Cloth': 30,
    'Phoenixweave': 25,
    'Prismatic Cloth': 20,
    
    // Wood
    'Timber': 50,
    'Lumber': 48,
    'Wyrdwood Plank': 45,
    'Ironwood Plank': 38,
    'Runewood Plank': 30,
    'Glittering Ebony': 25,
    'Prismatic Plank': 20,
    
    // Metal
    'Iron Ingot': 50,
    'Charcoal': 50,
    'Steel Ingot': 48,
    'Starmetal Ingot': 45,
    'Orichalcum Ingot': 38,
    'Mythril Ingot': 30,
    'Asmodeum': 25,
    'Prismatic Ingot': 20,
    
    // Stone
    'Stone Block': 50,
    'Stone Brick': 48,
    'Lodestone Brick': 45,
    'Obsidian Voidstone': 38,
    'Runic Voidstone': 30,
    'Runestone': 25,
    'Prismatic Block': 20
};

// Crafting costs (gold per craft)
const craftCosts = {
    // Tier 1 (0.01g)
    'Coarse Leather': 0.01,
    'Linen': 0.01,
    'Timber': 0.01,
    'Iron Ingot': 0.01,
    'Charcoal': 0.01,
    'Stone Block': 0.01,
    
    // Tier 2 (0.01g)
    'Rugged Leather': 0.01,
    'Sateen': 0.01,
    'Lumber': 0.01,
    'Steel Ingot': 0.01,
    'Stone Brick': 0.01,
    
    // Tier 3 (0.01g)
    'Layered Leather': 0.01,
    'Silk': 0.01,
    'Wyrdwood Plank': 0.01,
    'Starmetal Ingot': 0.01,
    'Lodestone Brick': 0.01,
    
    // Tier 4 (0.03g)
    'Infused Leather': 0.03,
    'Infused Silk': 0.03,
    'Ironwood Plank': 0.03,
    'Orichalcum Ingot': 0.03,
    'Obsidian Voidstone': 0.03,
    
    // Tier 5 (0.05g)
    'Dark Leather': 0.05,
    'Spinweave Cloth': 0.05,
    'Runewood Plank': 0.05,
    'Mythril Ingot': 0.05,
    'Runic Voidstone': 0.05,
    
    // Daily Limited Tier 5 (0.04g)
    'Runic Leather': 0.04,
    'Phoenixweave': 0.04,
    'Glittering Ebony': 0.04,
    'Asmodeum': 0.04,
    'Runestone': 0.04,
    
    // Prismatic (0.11g)
    'Prismatic Leather': 0.11,
    'Prismatic Cloth': 0.11,
    'Prismatic Plank': 0.11,
    'Prismatic Ingot': 0.11,
    'Prismatic Block': 0.11
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