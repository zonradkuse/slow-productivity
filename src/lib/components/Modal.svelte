<script>
    export let isOpen = false;
    export let closeModal;
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button on:click={closeModal} class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl">
                &times;
            </button>
            <slot></slot> <!-- The content (task form) goes here -->
        </div>
    </div>
{/if}
<style lang="postcss">
    @reference "tailwindcss";

</style>