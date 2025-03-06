import Counter from '$lib/components/Counter.svelte'
import Goals from '$lib/views/Goals.svelte';
import Home from '$lib/views/Home.svelte';
import Projects from '$lib/views/Projects.svelte';
import Settings from '$lib/views/Settings.svelte';
import Tasks from '$lib/views/Tasks.svelte';

export default {
    '#/test': {
        name: "Counter",
        component: Counter
    },
    '#/settings': {
        name: "Settings",
        component: Settings
    },
    '#/': {
        name: "Home",
        component: Home
    },
    '#/projects': {
        name: "Projects",
        component: Projects
    },
    '#/tasks': {
        name: "Tasks",
        component: Tasks
    },
    '#/goals': {
        name: "Goals",
        component: Goals
    }
};
