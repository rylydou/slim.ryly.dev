import { importDirectorySync, parseColors, runSVGO } from '@iconify/tools';
import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss';


const loadCustomIconSet = (path: string) => {
	// Load icon set
	const iconSet = importDirectorySync(path, {
		prefix: 'svg',
	});

	// Parse all icons: optimise, clean up palette
	iconSet.forEachSync((name) => {
		const svg = iconSet.toSVG(name)!;

		parseColors(svg, {
			defaultColor: 'currentColor',
			callback: (attr, colorStr, color) => {
				if (!color || color.type === 'none' || color.type === 'transparent') return 'transparent';
				return 'currentColor';
			},
		});

		// Optimise
		runSVGO(svg);

		// Update icon in icon set
		iconSet.fromSVG(name, svg);
	});

	// Return as function
	return () => iconSet.export();
};


export default defineConfig({
	safelist: [
		'icon-home',
		'icon-search',
		'icon-compass',
		'icon-person',
	],
	theme: {
		colors: {
			'depress': 'var(--clr-depress)',
			'bg': 'var(--clr-bg)',
			'surface': 'var(--clr-surface)',
			'border': 'var(--clr-border)',
			'mg': 'var(--clr-mg)',
			'fg': 'var(--clr-fg)',
			'accent': 'var(--clr-accent)',
			'accent-on': 'var(--clr-accent-on)',
		},
		breakpoints: {
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
	},
	rules: [
		[/^stack$/, function* ([], { symbols }) {
			yield {
				'display': 'grid',
				'place-content': 'center',
			};
			yield {
				[symbols.selector]: selector => `${selector}>*`,
				'grid-area': '1/1',
			};
		}],
		['animation-reverse', { 'animation-direction': 'reverse', }],
		['collapse', { 'visibility': 'collapse', }],
		['flex-col', {
			'display': 'flex',
			'flex-direction': 'column',
		}],
		['flex-row', {
			'display': 'flex',
			'flex-direction': 'row',
		}],
		['col-span', { 'grid-column': '1/-1', }],
		['row-span', { 'grid-row': '1/-1', }],
	],
	presets: [
		presetUno({ dark: 'media', }),
		presetIcons({
			autoInstall: false,
			prefix: '',
			collections: {
				'icon': loadCustomIconSet('assets/icons'),
			},
		}),
	],
	transformers: [
		transformerVariantGroup(),
	],
	// extractors: [
	// 	extractorSvelte(),
	// ]
});
