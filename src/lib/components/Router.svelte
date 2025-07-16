<script lang="ts">
  import type { Component } from "svelte";
  import type { Route, RouteParam, Routes } from "../../routes"

    let { routes } : 
        { routes: Routes } = $props();

    let currentRoute = $state(window.location.hash || '#/');
    let currentRouteParams = $derived.by(() => {
        let matchedParams;
        for (const route of Object.values(routes)) {
            matchedParams = matchRoute(route, currentRoute);
            if (!!matchedParams) {
                return matchedParams;
            }
        }


        return {};
    });

    function updateRoute() {
        if (document.startViewTransition) {
            document.startViewTransition(doUpdateRoute);
        } else {
            doUpdateRoute();
        }
    }

    function doUpdateRoute() {
        currentRoute = window.location.hash;
    }

    /**
     * Will check if candidate matches against the url.
     * 
     * A url may be formatted, i.e. /myRoute/<param1:string>/<param2:number>
     * @param url
     * @param candidate
     */
    function matchRoute(candidate: Route, url: string) {
        console.log(`matching ${url}`)
        const componentParams : any = {};
        // split url by /
        const pathAspects = url.split("?")[0].split("/");

        // the number of aspects must be equal to the ones defined in the route
        if (pathAspects.length < candidate.urlAspects.length) return undefined; 

        for (let [i, aspect] of candidate.urlAspects.entries()) {
            const urlAspect = pathAspects[i];
            // now we iterate and depending on the aspect
            // console.log(`Matching ${aspect} against ${urlAspect}`);
            if ((aspect as RouteParam<any>).name !== undefined) {
                // match urlAspect to the parameter
                const routeParamAspect = aspect as RouteParam<any>;
                routeParamAspect.fromSting
                componentParams[routeParamAspect.name] = routeParamAspect.fromSting(urlAspect);
                
            } else if ((aspect as string) !== urlAspect) {
                // strings must match, if they don't return false
                return undefined;
            }
        }

        return componentParams;
    }

    window.addEventListener('hashchange', updateRoute);
</script>

<!-- TODO this is way to simplistic but works really well for now.
     Consider passing props to a view component such as url parameters if needed -->
{#each Object.entries(routes) as [url, candidate]}
    {#if matchRoute(candidate, currentRoute)}
        <candidate.component {...currentRouteParams} />
    {/if}
{/each}
