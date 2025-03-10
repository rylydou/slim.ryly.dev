import { id, int, str, table, timestamp_date } from './shared';


export const mealEntry = table('meal-entry', {
	id: id(),
	name: str('name'),
	date: timestamp_date('date'),
});
