<script lang="ts">
	import { Tween } from 'svelte/motion'
	import { Numpad, Scanner } from './components'
	import * as easing from 'svelte/easing'

	let caloriesConsumed = $state(0)
	let caloriesLimit = $state(2000)

	$effect(() => {
		displayedCaloriesConsumed.target = caloriesConsumed
	})

	let displayedCaloriesConsumed = new Tween(caloriesConsumed, {
		easing: easing.sineOut,
		duration: 1000,
	})

	const displayedCaloriesConsumedRatio = $derived(
		Math.min((displayedCaloriesConsumed.current / caloriesLimit) * 100, 100),
	)
</script>

<div class="limit-width">
	<h1 class="pt-8 text-center text-6xl font-bold">
		<span> {Math.round(displayedCaloriesConsumed.current)} </span><span class="text-2xl text-mg">
			cal
		</span>
	</h1>
	<div class="w-full h-4 mb-4 bg-surface rounded-full">
		<div
			class="relative h-full caution-bg rounded-inherit"
			style="transition: width 000ms 00ms cubic-bezier(0.16, 1, 0.3, 1); width: {displayedCaloriesConsumedRatio}%;"
		>
			<div
				class="absolute right-0 w-4 h-4 bg-accent outline-3 outline-solid outline-bg rounded-inherit"
				style="translate: {100 - displayedCaloriesConsumedRatio}% 0;"
			></div>
		</div>
	</div>
</div>

<div class="fixed inset-0 grid place-items-center pointer-events-none">
	<div class="relative limit-width h-full pointer-events-none">
		<!-- <Numpad submit={(value) => (caloriesConsumed += value)} /> -->

		<!-- <button class="absolute bottom-8 right-8 btn btn-accent pointer-events-auto">
			<div class="icon-add"></div> Track
		</button> -->
	</div>
</div>

<Scanner />
