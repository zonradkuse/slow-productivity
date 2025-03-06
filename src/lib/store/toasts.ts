import type { ToastItemData } from "$lib/components/toast/ToastItem";
import { writable, type Writable } from "svelte/store";

export const add = (message: string, options?: ToastItemData) => {
    toasts.update((ts) => {
        ts.push({...options, message})

        return ts;
    });
}

export const toasts: Writable<ToastItemData[]> = writable([]);
