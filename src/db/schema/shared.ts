import { date } from 'drizzle-orm/pg-core';
import { jsonb, time } from 'drizzle-orm/pg-core';
import { integer, real, pgTableCreator, text, index, uniqueIndex, primaryKey, boolean, } from 'drizzle-orm/pg-core';


export const table = pgTableCreator((name) => name);
export const pk = primaryKey;


export const idx = (name: string) => index(name);
export const uniqueIdx = (name: string) => uniqueIndex(name);

export const int = (name: string) => integer(name);
export const bool = (name: string) => boolean(name);
export const float = (name: string) => real(name);

export const timestamp_date = (name: string) => date(name, { mode: "date", });
export const timestamp_time = (name: string) => time(name, { precision: 2, withTimezone: true, });
export const str = (name: string, options?: { length?: number, enum?: [string, ...string[]]; }) => text(name, { ...options });
export const json = (name: string) => jsonb(name);

export const id = (name = 'id') => integer(name).primaryKey();
export const ref = (name: string) => integer(name);
// export const id = (name = 'id') => text(name).primaryKey();
// export const ref = (name: string) => text(name);
