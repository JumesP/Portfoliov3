export type FoodData = {
  name: string;
  amount: string;
  frequency: string;
};

export type unsafeFoodData = {
  name: string;
  amount: string;
  frequency: string;
  reason?: string;
};

export const hamsterSafeFoods: FoodData[] = [
  // Vegetables
  { name: "broccoli", amount: "1-2 small florets", frequency: "2x/week" },
  { name: "carrot", amount: "1 thin slice", frequency: "few times/week" },
  { name: "cucumber", amount: "1-2 slices", frequency: "daily ok" },
  { name: "zucchini", amount: "1 small slice", frequency: "few times/week" },
  { name: "bell pepper", amount: "1 small strip", frequency: "few times/week" },
  { name: "cauliflower", amount: "1 small floret", frequency: "occasional" },
  { name: "kale", amount: "1 small leaf", frequency: "once/week" },
  { name: "spinach", amount: "1 small leaf", frequency: "once/week" },
  { name: "romaine lettuce", amount: "1 small leaf", frequency: "occasional" },
  { name: "lettuce", amount: "1 small leaf", frequency: "occasional" },
  { name: "cabbage", amount: "small piece", frequency: "occasional" },
  { name: "bok choy", amount: "1 small leaf", frequency: "occasional" },
  { name: "celery", amount: "1 small piece (strings removed)", frequency: "occasional" },
  { name: "green beans", amount: "1-2 beans", frequency: "occasional" },
  { name: "peas", amount: "2-3 peas", frequency: "occasional" },
  { name: "corn", amount: "few kernels", frequency: "occasional" },
  { name: "squash", amount: "1 small cube", frequency: "occasional" },
  { name: "pumpkin", amount: "1 small cube", frequency: "occasional" },
  { name: "sweet potato", amount: "1 small cooked cube", frequency: "occasional" },
  { name: "turnip", amount: "small piece", frequency: "occasional" },
  { name: "parsnip", amount: "small piece", frequency: "occasional" },
  { name: "radish", amount: "small piece", frequency: "occasional" },
  { name: "beetroot", amount: "small piece", frequency: "rare" },
  { name: "asparagus", amount: "1 small piece", frequency: "occasional" },
  { name: "brussels sprouts", amount: "half sprout", frequency: "rare" },
  { name: "fennel", amount: "small piece", frequency: "occasional" },

  // Fruits
  { name: "apple", amount: "1 small cube (no seeds)", frequency: "weekly" },
  { name: "banana", amount: "pea-sized piece", frequency: "weekly" },
  { name: "pear", amount: "1 small cube (no seeds)", frequency: "weekly" },
  { name: "strawberry", amount: "half a berry", frequency: "weekly" },
  { name: "blueberry", amount: "1-2 berries", frequency: "weekly" },
  { name: "raspberry", amount: "1-2 berries", frequency: "weekly" },
  { name: "blackberry", amount: "1 berry", frequency: "weekly" },
  { name: "grape", amount: "half a grape, chopped", frequency: "rare" },
  { name: "melon", amount: "1 small cube", frequency: "rare" },
  { name: "watermelon", amount: "1 small cube (no seeds/rind)", frequency: "rare" },
  { name: "peach", amount: "1 small piece (no pit)", frequency: "rare" },
  { name: "apricot", amount: "1 small piece (no pit)", frequency: "rare" },
  { name: "mango", amount: "1 small piece", frequency: "rare" },
  { name: "kiwi", amount: "1 small piece", frequency: "rare" },
  { name: "papaya", amount: "1 small piece", frequency: "rare" },
  { name: "cherry", amount: "1 piece (no pit)", frequency: "very rare" },

  // Grains & Seeds
  { name: "rice", amount: "1 tsp cooked", frequency: "occasional" },
  { name: "pasta", amount: "1 tsp cooked", frequency: "occasional" },
  { name: "oats", amount: "1 tsp", frequency: "few times/week" },
  { name: "whole wheat bread", amount: "small piece", frequency: "occasional" },
  { name: "barley", amount: "1 tsp cooked", frequency: "occasional" },
  { name: "quinoa", amount: "1 tsp cooked", frequency: "occasional" },
  { name: "sunflower seeds", amount: "2-3 seeds", frequency: "treat only" },
  { name: "pumpkin seeds", amount: "2-3 seeds", frequency: "treat only" },
  { name: "sesame seeds", amount: "small pinch", frequency: "occasional" },
  { name: "flaxseed", amount: "small pinch", frequency: "occasional" },
  { name: "millet", amount: "small pinch", frequency: "occasional" },

  // Nuts
  { name: "almond", amount: "1 unsalted", frequency: "rare treat" },
  { name: "walnut", amount: "small piece, unsalted", frequency: "rare" },
  { name: "hazelnut", amount: "1 unsalted", frequency: "rare" },
  { name: "peanut", amount: "1 unsalted", frequency: "rare" },
  { name: "cashew", amount: "1 unsalted", frequency: "very rare" },

  // Legumes (cooked only)
  { name: "lentils", amount: "1 tsp cooked", frequency: "occasional" },
  { name: "chickpeas", amount: "1-2 cooked", frequency: "occasional" },
  { name: "kidney beans", amount: "1 well-cooked bean", frequency: "rare" },

  // Protein
  { name: "chicken", amount: "small cooked piece, unseasoned", frequency: "rare" },
  { name: "egg", amount: "small boiled piece", frequency: "rare" },
  { name: "mealworms", amount: "1-2", frequency: "few times/week" },
  { name: "turkey", amount: "small cooked piece", frequency: "rare" },
  { name: "tofu", amount: "small cube", frequency: "rare" },

  // Herbs
  { name: "parsley", amount: "1 small sprig", frequency: "occasional" },
  { name: "basil", amount: "1 small leaf", frequency: "occasional" },
  { name: "dill", amount: "1 small sprig", frequency: "occasional" },
  { name: "mint", amount: "1 small leaf", frequency: "occasional" },
  { name: "cilantro", amount: "1 small sprig", frequency: "occasional" },
  { name: "dandelion greens", amount: "1 small leaf (pesticide-free)", frequency: "occasional" },

  // Other
  { name: "plain yogurt", amount: "pea-sized dab", frequency: "rare" },
  { name: "potato", amount: "1 small cooked cube (no green parts)", frequency: "rare" },
  { name: "hay", amount: "unlimited", frequency: "daily staple" },
  { name: "pellet mix", amount: "1-2 tbsp", frequency: "daily staple" },

    // Additional vegetables
  { name: "arugula", amount: "1 small leaf", frequency: "occasional" },
  { name: "swiss chard", amount: "1 small leaf", frequency: "once/week" },
  { name: "endive", amount: "1 small leaf", frequency: "occasional" },
  { name: "watercress", amount: "1 small sprig", frequency: "occasional" },

  // Additional fruits
  { name: "star fruit", amount: "1 small slice", frequency: "rare" },
  { name: "cranberries", amount: "1-2 berries", frequency: "rare" },
  { name: "honeydew melon", amount: "1 small cube", frequency: "rare" },

  // Additional grains/seeds
  { name: "wheat germ", amount: "small pinch", frequency: "occasional" },
  { name: "chia seeds", amount: "small pinch", frequency: "occasional" },
  { name: "unsweetened cheerios", amount: "1-2 pieces", frequency: "rare treat" },
  { name: "whole grain crackers", amount: "small piece, plain", frequency: "rare" },

  // Additional herbs
  { name: "oregano", amount: "small pinch, fresh", frequency: "occasional" },
  { name: "thyme", amount: "small pinch, fresh", frequency: "occasional" },
  { name: "clover", amount: "1 small leaf, pesticide-free", frequency: "occasional" },
];

export const hamsterUnsafeFoods: unsafeFoodData[] = [
  // Toxic / poisonous
  { name: "chocolate", amount: "none", frequency: "never - toxic", reason: "contains theobromine, toxic to hamsters" },
  { name: "onion", amount: "none", frequency: "never - toxic", reason: "damages red blood cells" },
  { name: "garlic", amount: "none", frequency: "never - toxic", reason: "damages red blood cells" },
  { name: "leek", amount: "none", frequency: "never - toxic", reason: "same toxic compounds as onion/garlic" },
  { name: "chives", amount: "none", frequency: "never - toxic", reason: "same toxic compounds as onion/garlic" },
  { name: "avocado", amount: "none", frequency: "never - toxic", reason: "contains persin, toxic to small animals" },
  { name: "raw kidney beans", amount: "none", frequency: "never - toxic uncooked", reason: "contains lectin (phytohaemagglutinin), toxic raw" },
  { name: "raw potato", amount: "none", frequency: "never - toxic", reason: "contains solanine, toxic raw" },
  { name: "potato skin", amount: "none", frequency: "never - toxic", reason: "high solanine concentration in skin" },
  { name: "green potato", amount: "none", frequency: "never - toxic", reason: "solanine forms in green parts" },
  { name: "tomato leaves", amount: "none", frequency: "never - toxic", reason: "contains solanine, toxic" },
  { name: "tomato stems", amount: "none", frequency: "never - toxic", reason: "contains solanine, toxic" },
  { name: "rhubarb", amount: "none", frequency: "never - toxic", reason: "contains oxalic acid, toxic" },
  { name: "rhubarb leaves", amount: "none", frequency: "never - toxic", reason: "high oxalic acid, can be fatal" },
  { name: "apple seeds", amount: "none", frequency: "never", reason: "contain amygdalin, releases cyanide when digested" },
  { name: "apple core", amount: "none", frequency: "never", reason: "seeds inside are toxic" },
  { name: "pear seeds", amount: "none", frequency: "never", reason: "contain cyanogenic compounds" },
  { name: "cherry pit", amount: "none", frequency: "never", reason: "contains cyanogenic compounds" },
  { name: "peach pit", amount: "none", frequency: "never", reason: "contains cyanogenic compounds" },
  { name: "apricot pit", amount: "none", frequency: "never", reason: "contains cyanogenic compounds" },
  { name: "plum pit", amount: "none", frequency: "never", reason: "contains cyanogenic compounds" },
  { name: "almond (bitter/wild)", amount: "none", frequency: "never", reason: "contains cyanide compounds, unlike sweet almonds" },
  { name: "kidney bean sprouts", amount: "none", frequency: "never - toxic", reason: "retains toxic lectins" },
  { name: "raw legumes", amount: "none", frequency: "never - toxic uncooked", reason: "contain lectins, toxic until cooked" },
  { name: "eggplant (raw)", amount: "none", frequency: "never - toxic raw", reason: "contains solanine when raw" },
  { name: "eggplant leaves", amount: "none", frequency: "never - toxic", reason: "contains solanine" },
  { name: "wild mushrooms", amount: "none", frequency: "never - toxic", reason: "many species are poisonous, unidentifiable risk" },
  { name: "mushrooms (store bought)", amount: "none", frequency: "avoid - risk not worth it", reason: "digestive upset, no clear benefit" },
  { name: "elderberry", amount: "none", frequency: "never - toxic", reason: "contains cyanogenic glycosides" },
  { name: "holly berries", amount: "none", frequency: "never - toxic", reason: "toxic to small animals" },
  { name: "mistletoe", amount: "none", frequency: "never - toxic", reason: "highly toxic plant" },
  { name: "ivy", amount: "none", frequency: "never - toxic", reason: "toxic plant compounds" },
  { name: "daffodil", amount: "none", frequency: "never - toxic", reason: "contains toxic alkaloids" },
  { name: "tulip", amount: "none", frequency: "never - toxic", reason: "toxic bulb/plant compounds" },
  { name: "buttercup", amount: "none", frequency: "never - toxic", reason: "contains toxic ranunculin" },
  { name: "azalea", amount: "none", frequency: "never - toxic", reason: "contains grayanotoxins" },
  { name: "oak leaves", amount: "none", frequency: "never - toxic", reason: "high tannin content, toxic" },
  { name: "acorns", amount: "none", frequency: "never - toxic", reason: "high tannin content, toxic" },

  // Citrus (digestive upset / too acidic)
  { name: "orange", amount: "none", frequency: "avoid - too acidic", reason: "acidity causes digestive upset" },
  { name: "lemon", amount: "none", frequency: "avoid - too acidic", reason: "acidity causes digestive upset" },
  { name: "lime", amount: "none", frequency: "avoid - too acidic", reason: "acidity causes digestive upset" },
  { name: "grapefruit", amount: "none", frequency: "avoid - too acidic", reason: "acidity causes digestive upset" },
  { name: "tangerine", amount: "none", frequency: "avoid - too acidic", reason: "acidity causes digestive upset" },
  { name: "pineapple", amount: "none", frequency: "avoid - too acidic", reason: "high acidity and sugar" },

  // High sugar / fat / processed
  { name: "candy", amount: "none", frequency: "never", reason: "pure sugar, no nutritional value" },
  { name: "cookies", amount: "none", frequency: "never", reason: "high sugar and fat" },
  { name: "cake", amount: "none", frequency: "never", reason: "high sugar and fat" },
  { name: "ice cream", amount: "none", frequency: "never", reason: "dairy, sugar, and fat, hamsters are lactose intolerant" },
  { name: "sugary cereal", amount: "none", frequency: "never", reason: "high refined sugar" },
  { name: "honey", amount: "none", frequency: "avoid - too sugary", reason: "concentrated sugar, can cause obesity/diabetes" },
  { name: "jam", amount: "none", frequency: "never", reason: "very high sugar content" },
  { name: "syrup", amount: "none", frequency: "never", reason: "concentrated sugar" },
  { name: "chips", amount: "none", frequency: "never", reason: "high salt and fat" },
  { name: "fried food", amount: "none", frequency: "never", reason: "too high in fat" },
  { name: "junk food", amount: "none", frequency: "never", reason: "excess sugar, salt, and fat" },
  { name: "processed snacks", amount: "none", frequency: "never", reason: "artificial additives, salt, sugar" },
  { name: "peanut butter", amount: "none", frequency: "avoid - choking hazard, sticky", reason: "can stick to cheek pouches and cause choking" },
  { name: "bacon", amount: "none", frequency: "never", reason: "too fatty and salty" },
  { name: "sausage", amount: "none", frequency: "never", reason: "too fatty, salty, often seasoned" },
  { name: "processed meat", amount: "none", frequency: "never", reason: "high salt, preservatives, fat" },
  { name: "fast food", amount: "none", frequency: "never", reason: "high fat, salt, and seasoning" },

  // Salty foods
  { name: "salted nuts", amount: "none", frequency: "never", reason: "excess sodium harmful to kidneys" },
  { name: "salted crackers", amount: "none", frequency: "never", reason: "excess sodium" },
  { name: "pretzels", amount: "none", frequency: "never", reason: "high salt content" },
  { name: "popcorn (salted/buttered)", amount: "none", frequency: "never", reason: "salt, butter, and choking hazard from kernels" },
  { name: "chips (salted)", amount: "none", frequency: "never", reason: "high salt and fat" },
  { name: "pickles", amount: "none", frequency: "never", reason: "too salty and acidic" },
  { name: "olives", amount: "none", frequency: "never", reason: "too salty and high fat" },

  // Dairy (hamsters are largely lactose intolerant)
  { name: "milk", amount: "none", frequency: "never", reason: "hamsters are lactose intolerant" },
  { name: "cheese (processed)", amount: "none", frequency: "avoid", reason: "too fatty and salty" },
  { name: "cream", amount: "none", frequency: "never", reason: "too high in fat, lactose intolerance" },
  { name: "butter", amount: "none", frequency: "never", reason: "pure fat, no nutritional benefit" },
  { name: "sour cream", amount: "none", frequency: "never", reason: "dairy fat, lactose intolerance" },
  { name: "flavored/sweetened yogurt", amount: "none", frequency: "never", reason: "added sugar, unlike plain yogurt" },

  // Caffeine / alcohol / seasoning
  { name: "coffee", amount: "none", frequency: "never - toxic", reason: "caffeine is toxic to small animals" },
  { name: "tea (caffeinated)", amount: "none", frequency: "never", reason: "caffeine is toxic to small animals" },
  { name: "alcohol", amount: "none", frequency: "never - toxic", reason: "extremely toxic to small body mass" },
  { name: "energy drinks", amount: "none", frequency: "never", reason: "caffeine and sugar, toxic" },
  { name: "soda", amount: "none", frequency: "never", reason: "sugar and often caffeine" },
  { name: "spicy food", amount: "none", frequency: "never", reason: "irritates digestive system" },
  { name: "seasoned food", amount: "none", frequency: "never", reason: "salt, spices, and additives are harmful" },
  { name: "salt (added)", amount: "none", frequency: "never", reason: "hamsters need very little sodium" },
  { name: "sugar (added)", amount: "none", frequency: "never", reason: "risk of obesity and diabetes" },

  // Choking / digestive hazards
  { name: "raw beans (any kind)", amount: "none", frequency: "never - toxic uncooked", reason: "lectins are toxic until cooked" },
  { name: "sticky candy", amount: "none", frequency: "never", reason: "choking hazard, sticks in cheek pouches" },
  { name: "whole nuts in shell (large)", amount: "none", frequency: "avoid", reason: "choking hazard, hard to open" },
  { name: "citrus peel", amount: "none", frequency: "never", reason: "oils and acidity irritate digestion" },
  { name: "raw sweet potato", amount: "none", frequency: "avoid", reason: "hard to digest raw, cook first" },
  { name: "cabbage (large amounts)", amount: "none", frequency: "avoid", reason: "causes bloating and gas" },
  { name: "broccoli (large amounts)", amount: "none", frequency: "avoid", reason: "causes gas in large quantities" },

  // Human treats / other
  { name: "xylitol (sugar substitute)", amount: "none", frequency: "never - toxic", reason: "causes rapid insulin release, toxic" },
  { name: "raisins (large amounts)", amount: "none", frequency: "avoid", reason: "concentrated sugar when dried" },
  { name: "dried fruit (sweetened)", amount: "none", frequency: "avoid", reason: "added sugar plus concentrated natural sugar" },
  { name: "trail mix (store bought)", amount: "none", frequency: "avoid", reason: "usually salted, sweetened, or chocolate-coated" },
  { name: "granola bars", amount: "none", frequency: "avoid", reason: "high sugar, often chocolate or additives" },
  { name: "bread (moldy)", amount: "none", frequency: "never - toxic", reason: "mold toxins are dangerous" },
  { name: "moldy food (any)", amount: "none", frequency: "never - toxic", reason: "mold produces harmful toxins" },
  { name: "meat (raw)", amount: "none", frequency: "never", reason: "bacteria risk (salmonella, etc.)" },
  { name: "fish (raw)", amount: "none", frequency: "never", reason: "bacteria risk and parasites" }
];
