import { mealEntry } from './meal-entry';
import { id, int, ref, str, table, timestamp_date } from './shared';


export const mealDetail = table('meal-detail', {
	parentMealEntry: ref('meal-entry').references(() => mealEntry.id),
	key: str('key'),
	value: str('value'),
});
