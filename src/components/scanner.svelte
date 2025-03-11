<script lang="ts">
	import { onMount } from 'svelte'

	import {
		MultiFormatReader,
		BarcodeFormat,
		BrowserMultiFormatReader,
		DecodeHintType,
	} from '@zxing/library'

	const {
		scanned,
		cancel,
	}: {
		scanned?: (code: String) => void
		cancel?: () => void
	} = $props()

	let videoPlayer: HTMLVideoElement
	// let canvas: HTMLCanvasElement

	let status = $state('Tap to start scanning')

	let hints = new Map()
	hints.set(DecodeHintType.TRY_HARDER, false)
	hints.set(DecodeHintType.POSSIBLE_FORMATS, [
		BarcodeFormat.UPC_A,
		BarcodeFormat.UPC_E,
		BarcodeFormat.EAN_8,
		BarcodeFormat.EAN_13,
		BarcodeFormat.UPC_EAN_EXTENSION,
		BarcodeFormat.CODE_93,
		// BarcodeFormat.ITF,
		// BarcodeFormat.CODABAR,
		// BarcodeFormat.CODE_128,
		// BarcodeFormat.DATA_MATRIX, // 2D
	])

	let codeReader = new BrowserMultiFormatReader(hints)

	const restart = () => {
		status = 'Loading...'

		if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			status = 'ERROR: No camera available'
			return
		}

		;(async () => {
			codeReader.stopContinuousDecode()
			codeReader.reset()

			try {
				const videoStream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						height: { ideal: window.outerWidth * window.devicePixelRatio },
						width: { ideal: window.outerHeight * window.devicePixelRatio },
						facingMode: 'environment',
						backgroundBlur: false,
					},
				})
				videoPlayer.srcObject = videoStream
				videoPlayer.play()

				codeReader.decodeFromVideoElementContinuously(videoPlayer, (result, error) => {
					if (error) {
						error = error
					}
					if (result) {
						status = `${BarcodeFormat[result.getBarcodeFormat()]}: ${result.getText()}`

						setTimeout(() => (status = 'Scanning...'), 3000)
					}
				})

				status = 'Scanning...'
			} catch (error) {
				status = 'ERROR: Failed to access camera - ' + error
			}
		})()
	}

	const cancelButtonClicked = () => {
		codeReader.stopContinuousDecode()
		codeReader.reset()
		cancel?.()
	}
</script>

<div class="fixed inset-0 grid place-items-center h-full z-100 bg-black">
	<video bind:this={videoPlayer} muted class="w-full h-full object-contain" onpointerdown={restart}
	></video>

	<div class="contents pointer-events-none">
		<div class="absolute h-px w-full bg-[red] top-auto bottom-auto"></div>
		<div
			class="absolute w-[80%] aspect-2/1 border-2 border-white border-solid outline-2 outline-solid outline-black"
		></div>
		{#if status}
			<div
				class="absolute top-32 w-full max-w-full text-center text-wrap text-lg bg-black/50 text-white break-words"
			>
				{status}
			</div>
		{/if}
	</div>

	<div class="absolute bottom-8 flex-col gap-2">
		<button class="btn btn-glass scale-50" onclick={cancelButtonClicked}> Enter Manually </button>
		<button class="btn btn-glass" onclick={cancelButtonClicked}>
			<div class="icon-close"></div>
			Cancel
		</button>
	</div>
</div>
