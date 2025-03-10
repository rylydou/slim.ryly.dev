<script lang="ts">
	import { onMount } from 'svelte'
	import Quagga from '@ericblade/quagga2'

	let videoPlayer: HTMLVideoElement

	let cameraError = $state('')

	const start = () => {
		if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			cameraError = 'No camera available'
			return
		}

		;(async () => {
			try {
				const videoStream = await navigator.mediaDevices.getUserMedia({
					// video: { facingMode: 'front' },
					video: { facingMode: 'environment' },
				})
				videoPlayer.srcObject = videoStream
				videoPlayer.play()
			} catch (error) {
				cameraError = 'Failed to access camera: ' + error
			}
		})()
	}
</script>

<div class="fixed inset-0 grid place-items-center h-full z-100 bg-black" onpointerdown={start}>
	<video bind:this={videoPlayer} muted class="w-full h-full object-cover"></video>

	<div class="absolute h-px w-full bg-[red] top-auto bottom-auto"></div>
	<div
		class="absolute w-[80%] aspect-2/1 border-2 border-white border-solid outline-2 outline-solid outline-black"
	></div>

	{#if cameraError}
		<div class="absolute top-16 text-red font-bold text-xl">{cameraError}</div>
	{/if}

	<div class="absolute bottom-8">
		<button class="btn btn-glass">
			<div class="icon-close"></div>
			Cancel
		</button>
	</div>
</div>
