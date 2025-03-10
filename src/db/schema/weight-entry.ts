import { float, id, int, str, table, timestamp_date } from './shared';


export const weightEntry = table('weight-entry', {
	id: id(),
	date: timestamp_date('date'),
	weight: float('weight'),
});
