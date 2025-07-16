<script lang="ts">
  import { onDestroy } from "svelte";

    let { 
        timeInMinutes,
        alertCallback
    } = $props()

    let remainingTimeInSeconds = $state(timeInMinutes * 60);
    let started = $state(false);

    let timer : ReturnType<typeof setTimeout> | undefined;

    function start() {
        timer = setInterval(decreaseTimer, 1000);
        started = true;
    }

    function pause() {
        if (!timer) return;

        clearInterval(timer);
        started = false;
    }

    function decreaseTimer() {
        remainingTimeInSeconds -= 1;

        if (remainingTimeInSeconds <= 0) {
            pause();
            alertCallback();
        }
    }
	function formatTime(seconds: number) {
		const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${mins}:${secs}`;
	}

    // reconsider destruction
    // onDestroy(() => {
    //     if (timer) {
    //         clearInterval(timer);
    //     }
    // });
</script>

<div class="container">
	<div class="timer-display">{formatTime(remainingTimeInSeconds)}</div>
	<div class="button-group">
        {#if !started}
			<button onclick={start} class="btn btn-start">Start</button>
        {:else}
		    <button onclick={pause} class="btn btn-pause">Pause</button>
		{/if}
	</div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

	.container {
		@apply flex flex-col items-center space-y-6 p-6 bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto;
	}

	.timer-display {
		@apply text-4xl font-bold text-gray-800;
	}

	.button-group {
		@apply flex space-x-4;
	}

	.btn {
		@apply px-4 py-2 text-white rounded-xl transition duration-200;
	}

	.btn-start {
		@apply bg-blue-600 hover:bg-blue-700;
	}

	.btn-pause {
		@apply bg-gray-400 hover:bg-gray-500;
	}
</style>
