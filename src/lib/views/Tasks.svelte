<script lang="ts">
  import TaskEdit from "$lib/components/tasks/TaskEdit.svelte";
  import Modal from "$lib/components/Modal.svelte";
    import TaskList from "$lib/components/tasks/TaskList.svelte";
    import { db, TaskPriority, type Task } from "$lib/store/db/db";
    import { liveQuery } from "dexie";

    let urlParams: {[key: string]: string[]} = {}
    
    const allTasks = liveQuery( async () => {
        const tasks = await db.tasks.orderBy("priority").reverse().toArray();

        return tasks;
    });

    let addingTask = $state(false);

    const emptyTask = {
        id: -1,
        done: false,
        estimatedHours: 0,
        priority: TaskPriority.Medium,
        short_description: "New task",
        description: "More text"
    }

    // TODO this add functionality should be in the tasks view as there may be multiple lists in view that apply different filters
    async function addTask(task: Task) {
        const id = await db.tasks.add({
            ...task,
            id: undefined,
        });

        addingTask = false;
    }

    function showTaskEdit() {
        addingTask = true;
    }

</script>

<Modal isOpen={addingTask} closeModal={() => {addingTask = false;}}>
    <TaskEdit task={emptyTask} onclose={() => {addingTask = false;}} onsave={() => {addTask(emptyTask)}} />
</Modal>
        
<TaskList title="All Tasks" tasks={allTasks} />

<button class="btn-add-task" onclick={showTaskEdit}>
    + Add Task
</button>

<style lang="postcss">
    @reference "tailwindcss";
    .btn-add-task {
        @apply fixed bottom-24 right-0 transform -translate-x-1/2 bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition;
    }
</style>