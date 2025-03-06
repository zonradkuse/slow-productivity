import { writable, type Writable } from "svelte/store";

let persistedRefreshCycle = localStorage.getItem("settings_refreshCycle");

const refreshCycleDefaultValue = persistedRefreshCycle ? Number.parseInt(persistedRefreshCycle) : 1
export const updateCheckIntervalInMinutes: Writable<number> = writable(refreshCycleDefaultValue);

updateCheckIntervalInMinutes.subscribe((num) => {
    localStorage.setItem("settings_refreshCycle", num.toString());
});


let notificationsRequestedStore = localStorage.getItem("settings_notificationsRequested");

const notificationsRequestedDefaultStore = notificationsRequestedStore ? notificationsRequestedStore === "true" : false
export const notificationsRequested: Writable<boolean> = writable(notificationsRequestedDefaultStore);

notificationsRequested.subscribe((b) => {
    localStorage.setItem("settings_notificationsRequested", b.toString());
});

