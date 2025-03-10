export type NutritionalFact = {
	key: string,
	name: string,
	unit?: string,
	parent?: string,
	isVitamin?: boolean,
};


export const nutritionalFacts: NutritionalFact[] = [
	{ key: '#', name: 'Barcode', unit: 'barcode', },
	{ key: 'c', name: 'Calories', unit: 'cal', },

	{ key: 'fat', name: 'Fat', unit: 'g', },
	{ key: 'fat_sat', name: 'Saturated Fat', unit: 'g', parent: 'fat', },
	{ key: 'fat_trans', name: 'Trans Fat', unit: 'g', parent: 'fat', },

	{ key: 'chol', name: 'Cholesterol', unit: 'g', },
	{ key: 'na', name: 'Sodium', unit: 'g', },

	{ key: 'carb', name: 'Carbohydrates', unit: 'g', },
	{ key: 'fiber', name: 'Fiber', unit: 'g', parent: 'carb', },
	{ key: 'sugar', name: 'Sugar', unit: 'g', parent: 'carb', },
	{ key: 'sugar_add', name: 'Added Sugars', unit: 'g', parent: 'sugar', },

	{ key: 'protein', name: 'Protein', unit: 'g', },

	// vitamins
	{ key: 'calcium', name: 'Calcium', unit: 'g', isVitamin: true, },
];


export let nutritionalFactsByKey = new Map<string, NutritionalFact>();


// index meal data types in look up table
for (const nutritionalFact of nutritionalFacts) {
	nutritionalFactsByKey.set(nutritionalFact.key, nutritionalFact);
}
