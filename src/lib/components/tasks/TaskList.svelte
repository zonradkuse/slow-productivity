<script lang="ts">
    import TaskEdit from "$lib/components/tasks/TaskEdit.svelte";
  import { db, TaskPriority, type Task } from "$lib/store/db/db";
  import { liveQuery } from "dexie";

    const editableTasks: {[key: number]: boolean} = $state({});

    let { title, tasks } = $props()

    function openForEdit(id: number) {
        editableTasks[id] = true;
    }

    async function saveTask(task: Task) {
        await db.tasks.update(task.id, task);
        closeEdit(task.id);
    }

    function closeEdit(id: number) {
        editableTasks[id] = false;
    }

    function doDelete(id: number) {
        db.tasks.delete(id);
    }

    function toggleTaskDone(task: Task) {
        task.done = !task.done;
        saveTask(task);
    }

</script>

<div class="max-w-6xl mx-auto p-6 bg-white shadow-sm rounded-lg">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">{title} (<span id="task-count">{$tasks?.length}</span>)</h2>
        
    </div>


    <ul class="space-y-3">
        <div class="space-y-3"></div>
        
        {#each $tasks as task}
            {#if !editableTasks[task.id]}
            <li>
                <label class="flex items-center space-x-3">
                    <input type="checkbox" class="checkbox" checked={task.done} onchange={() => {toggleTaskDone(task)}}>
                    <span class="{task.done ? 'line-through text-gray-500' : 'text-gray-800'}">
                        {task.short_description} ({task.estimatedHours}h, {task.priority})
                    </span>
                </label>
                <div class="flex space-x-6">
                    <button onclick={() => openForEdit(task.id)} class="text-blue-500 hover:text-blue-700">✏️</button>
                    <button onclick={() => doDelete(task.id)} class="text-red-500 hover:text-red-700">✖</button>
                </div>
            </li>
            {:else}
                <TaskEdit {task} onclose={() => {closeEdit(task.id)}} onsave={() => {saveTask(task)}} />
            {/if}
        {/each}

    </ul>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .checkbox {
        @apply w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-green-500;
    }

    li {
        @apply flex items-center justify-between p-3 bg-gray-100 rounded-sm;
    }
</style>
