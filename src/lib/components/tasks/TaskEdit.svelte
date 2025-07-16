<script lang="ts">
  import { Priority } from "$lib/store/db/db";

    let {
        task,
        onclose,
        onsave
    } = $props();

</script>

<div class="p-4 mb-4 bg-gray-100 rounded-lg">
    <div class="mb-2">
        <label class="text-sm font-medium text-gray-700">Task Name</label>
        <input type="text" bind:value={task.short_description} class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none">
    </div>
    <div class="flex justify-between">
        <div>
            <label class="text-sm text-gray-700">Estimated Hours</label>
            <input type="number" min="1" bind:value={task.estimatedHours} class="w-16 p-2 border border-gray-300 rounded-lg">
        </div>
        <div>
            <label class="text-sm text-gray-700">Priority</label>
            <select bind:value={task.priority} class="p-2 border border-gray-300 rounded-lg">
                {#each Object.values(Priority) as v}
                    <option>{v}</option>
                {/each}
            </select>
        </div>
    </div>Priority
    <div class="mt-4 flex justify-end space-x-2">
        <button onclick={onsave} class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save</button>
        <button onclick={onclose} class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Cancel</button>
    </div>
</div>
