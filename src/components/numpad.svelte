<script lang="ts">
	import { longPress } from '../directives'

	let {
		submit,
		cancel,
		unit = 'cal',
		maxLength = 4,
	}: {
		submit?: (value: number) => void
		cancel?: () => void
		unit?: string
		maxLength?: number
	} = $props()

	let wipInput = $state('0')

	const onSubmitClicked = () => {
		submit?.(Number(wipInput) || 0)
		wipInput = '0'
	}

	const appendDigit = (digit: number) => {
		if (wipInput.length >= maxLength) return
		if (!Number(wipInput) || (digit === 0 && Number(wipInput) == 0)) {
			wipInput = digit.toString()
		} else {
			wipInput += digit
		}
	}

	const backspace = () => {
		wipInput = wipInput.slice(0, wipInput.length - 1) || '0'
		// if (wipInput.length <= 0) {
		// 	wipInput = '0'
		// }
	}
</script>

<div class="pointer-events-auto absolute bottom-2 inset-x-0">
	<div class="relative entry mb-4 text-center text-5xl font-bold">
		{wipInput}<div class="caret"></div>
		<div class="inline-block text-mg"><span class="text-xl">{unit}</span></div>

		<button class="absolute right-2 btn btn-accent btn-small-fab" onclick={onSubmitClicked}>
			<div class="icon-add"></div>
		</button>
	</div>

	<div class="grid grid-cols-3 gap-2">
		{#each [[7, 8, 9], [4, 5, 6], [1, 2, 3]] as rowOfDigits}
			{#each rowOfDigits as digit}
				<button class="btn" onclick={() => appendDigit(digit)}>{digit}</button>
			{/each}
		{/each}

		{#if Number(wipInput)}
			<button
				class="btn btn-flat"
				onclick={backspace}
				use:longPress={{
					callback: () => (wipInput = '0'),
					timeout: 500,
				}}
			>
				<div class="icon-backspace"></div>
			</button>
		{:else}
			<button class="btn">
				<div class="icon-search"></div>
			</button>
		{/if}
		<button class="btn" onclick={() => appendDigit(0)}> 0 </button>

		<button class="btn btn-accent">
			<div class="icon-scan-barcode"></div>
		</button>

		<!-- {#if Number(wipInput)}
			<button
				class="btn"
				onclick={backspace}
				use:longPress={{
					callback: () => (wipInput = '0'),
					timeout: 500,
				}}
			>
				<div class="icon-backspace"></div>
			</button>
			<button class="btn" onclick={() => appendDigit(0)}> 0 </button>
		{:else}
			<button class="btn">
				<div class="icon-search"></div>
			</button>
			<button class="btn btn-accent col-span-2">
				<div class="icon-scan-barcode"></div>
				Scan
			</button>
		{/if} -->
	</div>
</div>
