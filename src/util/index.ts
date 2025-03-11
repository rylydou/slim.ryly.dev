import { idGenerator } from './nanoid';


export * from './nanoid';
export * from './date';


export const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
export const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const digits = '0123456789';


export const alphaID = idGenerator(lowerAlpha, 6);
export const alphanumID = idGenerator(lowerAlpha + digits, 4);
export const alphanumcaseID = idGenerator(lowerAlpha + upperAlpha + digits, 16);


// 400 days
export const maxCookieAge = 60 * 60 * 24 * 400;


export const compareStr = (a: string, b: string) => {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
};


export const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
