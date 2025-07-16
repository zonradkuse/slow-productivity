import Counter from '$lib/components/Counter.svelte'
import Goals from '$lib/views/Goals.svelte';
import Home from '$lib/views/Home.svelte';
import Pomodoro from '$lib/views/Pomodoro.svelte';
import Projects from '$lib/views/Projects.svelte';
import RouterDebugView from '$lib/views/RouterDebugView.svelte';
import Settings from '$lib/views/Settings.svelte';
import Tasks from '$lib/views/Tasks.svelte';
import type { Component } from 'svelte';

export type Routes = {
    [url: string]: Route
}

export interface RouteParam<T> {
    name: string;
    fromSting(val: string): T;
}

export type RouteAspect<T> = RouteParam<T> | string;

export interface Route {
    readonly component: Component;
    readonly urlAspects: Array<RouteAspect<any>> ;
}

function getRouteFromString(component: Component, inp: string) {
    const urlAspects : Array<RouteAspect<any>> = [];

    const aspects = inp.split("/");
    for (const aspect of aspects) {
        if (aspect.startsWith("<") && aspect.endsWith(">")) {
            // parameter found
            const paramDescription = aspect.substring(1, aspect.length - 1)
            const paramDescriptionParts = paramDescription.split(":");
            if (paramDescriptionParts.length !== 2) throw new Error(`Route parameters must be typed but ${paramDescription} isn't`);

            const parameterAspect : RouteParam<string> = {
                name: paramDescriptionParts[0],
                fromSting(val: string) {
                    return val
                },
            }

            urlAspects.push(parameterAspect);
        } else {
            urlAspects.push(aspect);
        }
    }

    return {
        component,
        urlAspects
    }
}

export default {
    '#/test': getRouteFromString(Counter, "#/test"),
    '#/settings': getRouteFromString(Settings, "#/settings"),
    '#/': getRouteFromString(Home, "#/"),
    '#/projects': getRouteFromString(Projects, "#/projects"),
    '#/tasks': getRouteFromString(Tasks, "#/tasks"),
    '#/goals': getRouteFromString(Goals, "#/goals"),
    '#/pomodoro': getRouteFromString(Pomodoro, "#/pomodoro"),
    '#/router/<name:string>/<other:string>': getRouteFromString(RouterDebugView, '#/router/<name:string>/<other:string>')
};
