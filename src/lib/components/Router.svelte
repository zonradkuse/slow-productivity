<script lang="ts">
  import type { Component } from "svelte";

    type Routes = {
        [url: string]: Route
    }

    interface Route {
        name: string;
        component: Component;
        description?: string;
    }

    export let routes: Routes = {};
    
    let currentRoute = window.location.hash || '#/';

    function updateRoute() {
        currentRoute = window.location.hash;
    }

    window.addEventListener('hashchange', updateRoute);
</script>

<!-- TODO this is way to simplistic but works really well for now.
     Consider passing props to a view component such as url parameters if needed -->
{#each Object.entries(routes) as [url, {name, component}]}
    {#if url === currentRoute}
        <svelte:component this={component} />
    {/if}
{/each}