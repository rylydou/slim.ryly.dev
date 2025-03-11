import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


/** @type {import("@sveltejs/kit").Config} */
export default {
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		if (warning.code.startsWith("a11y-")) return;
		handler(warning);
	},
};
