<script lang="ts">
    import { toasts } from "$lib/store/toasts";
    import ToastItem from "./ToastItem.svelte";

    function removeAndCall(index: number, callback?: Function) {
        if (callback) callback()

        toasts.update((t) => {
            t.splice(index, 1);
            return t;
        })
    }

</script>

{#each $toasts as toast, i}
    <ToastItem message={toast.message}
        ok={() => { removeAndCall(i, toast.ok) }}
        cancelAction={ () => { removeAndCall(i, toast.cancelAction) } }
        cancelLabel={toast.cancelLabel}
        showCancel={toast.showCancel}
        okLabel={toast.okLabel} />
{/each}



