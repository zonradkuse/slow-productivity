<script lang="ts">
    import TaskEdit from "$lib/components/tasks/TaskEdit.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import TaskList from "$lib/components/tasks/TaskList.svelte";
    import { projectsDb, Priority, type Task, type Project } from "$lib/store/db/db";
    import { liveQuery } from "dexie";
    import { getCurrentUrlSearchParams } from "$lib/utils/routing";

    const PARAM_PROJECT_ID = "projectId"

    let urlParams: URLSearchParams = getCurrentUrlSearchParams()
    
    let selectedProjectId : number | undefined = undefined;
    if (urlParams.has(PARAM_PROJECT_ID)) {
        selectedProjectId = parseInt(urlParams.get(PARAM_PROJECT_ID)!)
    }

    const filteredTasks = liveQuery( async () => {
        const tasks = await projectsDb
            .tasks
            .orderBy("priority")
            .reverse()
            .filter((t) => !t.done)
            .filter((t) => !selectedProjectId || t.projectId == selectedProjectId)
            .toArray();

        const tasksDone = await projectsDb
            .tasks
            .orderBy("priority")
            .reverse()
            .filter((t) => t.done)
            .filter((t) => !selectedProjectId || t.projectId == selectedProjectId)
            .toArray();

        return [...tasks, ...tasksDone];
    });

    let addingTask = $state(false);

    const emptyTask = {
        id: -1, // this is actually undefined later, refactor me
        done: false,
        estimatedHours: 0,
        priority: Priority.Medium,
        short_description: "New task",
        description: "More text"
    }

    // TODO this add functionality should be in the tasks view as there may be multiple lists in view that apply different filters
    async function addTask(task: Task) {
        const id = await projectsDb.tasks.add({
            ...task,
            projectId: selectedProjectId,
            id: undefined, // TODO this is ugly and only necessary because the id will be set by the DB
        });

        hideTaskEdit();
    }

    function showTaskEdit() {
        addingTask = true;
    }

    function hideTaskEdit() {
        addingTask = false;
    }

</script>

<Modal isOpen={addingTask} closeModal={hideTaskEdit}>
    <TaskEdit task={emptyTask} onclose={hideTaskEdit} onsave={() => {addTask(emptyTask)}} />
</Modal>
        
<TaskList title="All Tasks" tasks={filteredTasks} />

<button class="btn-add-task" onclick={showTaskEdit}>
    + Add Task
</button>

<style lang="postcss">
    @reference "tailwindcss";
    .btn-add-task {
        @apply fixed bottom-24 right-0 transform -translate-x-1/2 bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition;
    }
</style>