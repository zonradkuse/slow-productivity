<script lang="ts">
    import { _ } from '$lang/i18n';
    import Modal from '$lib/components/Modal.svelte';
    import { Priority, projectsDb, type Project } from '$lib/store/db/db';
    import { maxActiveProjects } from '$lib/store/settings';
    import { liveQuery } from 'dexie';


    let projects = liveQuery(async () => {
        return projectsDb.projects.toArray()
    });

    let editingProject: Project | null = null;
    let confirmDeleteProject: Project | null = null;

    function isOverActiveLimit() {
        return $projects?.filter(p => p.active).length > $maxActiveProjects;
    }

    function confirmDelete(project: Project) {
        confirmDeleteProject = project;
    }

    function cancelDelete() {
        confirmDeleteProject = null;
    }

    function addProject() {
        editingProject = { id: -1, name: "", priority: Priority.Medium, description: "", active: false, goal_ids: [] };
    }

    function editProject(project: Project) {
        editingProject = { ...project };
    }

    function saveProject() {
        if (!editingProject?.id) return;

        if (editingProject.id == -1) {
            projectsDb.projects.add({ ...editingProject, id: undefined })
        } else {
            projectsDb.projects.put(editingProject);
        }
        closeModal();
    }

    function closeModal() {
        editingProject = null;
    }

    function removeProject() {
        if (!confirmDeleteProject) return;

        projectsDb.projects.delete(confirmDeleteProject.id);
        confirmDeleteProject = null;
    }

    function toggleActive(project: Project) {
        const activeProjects = $projects.filter(p => p.active);

        projectsDb.projects.update(project.id, {active: !project.active});
    }

</script>

<div class="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl relative">
    <div class="mb-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Projects</h2>
        <button on:click={addProject} class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
            + Add Project
        </button>
    </div>

   
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Active Projects -->
        <div>
            <h3 class="text-xl font-semibold mb-3">Active Projects</h3>
            
            {#if isOverActiveLimit()}
                <p class="text-red-600 font-medium mb-2">⚠ You have more than {maxActiveProjects} active projects!</p>
            {/if}

            <ul class="space-y-4">
                {#each $projects?.filter(p => p.active) as project (project.id)}
                    <li class={`p-4 border-l-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center
                        ${isOverActiveLimit() ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'}`}>
                        
                        <div class="mb-2 md:mb-0">
                            <h3 class="text-lg font-semibold"><a href="#/tasks?projectId={project.id}">{project.name}</a><span class="text-sm text-gray-600">({project.priority})</span></h3>
                            {#if project.description}
                                <p class="text-gray-600 text-sm">{project.description}</p>
                            {/if}
                        </div>
                        <div class="flex space-x-3">
                            <button on:click={() => editProject(project)} class="text-green-600 hover:text-green-800 text-lg">✏️</button>
                            <button on:click={() => toggleActive(project)} class="text-gray-500 hover:text-gray-700 text-lg">🚫</button>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Regular Projects -->
        <div>
            <h3 class="text-xl font-semibold mb-3">Available Projects</h3>
            <ul class="space-y-4">
                {#each $projects?.filter(p => !p.active) as project (project.id)}
                    <li class="p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
                        <div class="mb-2 md:mb-0">
                            <h3 class="text-lg font-semibold">{project.name} <span class="text-sm text-gray-600">({project.priority})</span></h3>
                            {#if project.description}
                                <p class="text-gray-600 text-sm">{project.description}</p>
                            {/if}
                        </div>
                        <div class="flex space-x-3">
                            <button on:click={() => editProject(project)} class="text-green-600 hover:text-green-800 text-lg">✏️</button>
                            <button on:click={() => toggleActive(project)} class="text-gray-500 hover:text-gray-700 text-lg">✅</button>
                            <button on:click={() => confirmDelete(project)} class="text-red-500 hover:text-red-700 text-lg">✖</button>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <!-- Modal for Adding/Editing -->
    <Modal isOpen={!!editingProject} closeModal={closeModal}>
        <div class="p-6 w-full max-w-lg">
            <h3 class="text-xl font-semibold mb-4">{editingProject?.id ? "Edit Project" : "New Project"}</h3>

            <div class="mb-2">
                <label class="text-sm font-medium text-gray-700">Project Name</label>
                <input type="text" bind:value={editingProject!.name} class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none">
            </div>
            
            <div class="mb-2">
                <label class="text-sm font-medium text-gray-700">Priority</label>
                <select bind:value={editingProject!.priority} class="w-full p-2 border border-gray-300 rounded-lg">
                    {#each Object.values(Priority) as priority}
                        <option value={priority}>{priority}</option>
                    {/each}
                </select>
            </div>
            
            <div class="mb-2">
                <label class="text-sm font-medium text-gray-700">Description</label>
                <textarea bind:value={editingProject!.description} class="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>

            <div class="mt-4 flex justify-end space-x-2">
                <button on:click={saveProject} class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save</button>
                <button on:click={closeModal} class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Cancel</button>
            </div>
        </div>
    </Modal>

    {#if confirmDeleteProject}
        <Modal isOpen={true} closeModal={cancelDelete}>
            <div class="p-6 w-full max-w-md">
                <h3 class="text-xl font-semibold mb-4 text-red-600">Confirm Deletion</h3>
                <p class="text-gray-700 mb-4">Are you sure you want to delete <strong>{confirmDeleteProject.name}</strong>? This action cannot be undone.</p>

                <div class="mt-4 flex justify-end space-x-2">
                    <button on:click={removeProject} class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
                    <button on:click={cancelDelete} class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Cancel</button>
                </div>
            </div>
        </Modal>
    {/if}

</div>

<style lang="postcss">
    @reference "tailwindcss";
</style>
