import type { Action } from "svelte/action";


export const longPress: Action<HTMLElement, { callback: Function, timeout: number; }> = (node, params) => {
	let timeout = 0;

	const pointerDown = (event: PointerEvent) => {
		console.log('button=', event.button);
		if (event.button != 0) return;

		timeout = setTimeout(params.callback, params.timeout);
		window.addEventListener('pointerup', pointerUp);
	};

	const pointerUp = (event: PointerEvent) => {
		if (event.button != 0) return;

		clearTimeout(timeout);
		window.removeEventListener('pointerup', pointerUp);
	};

	node.addEventListener('pointerdown', pointerDown);
	node.addEventListener('pointerup', pointerUp);

	return {
		destroy() {
			clearTimeout(timeout);
			node.removeEventListener('pointerdown', pointerDown);
			node.removeEventListener('pointerup', pointerUp);
		},
	};
};
