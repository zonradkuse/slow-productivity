import { writable, type Writable } from "svelte/store";
import { settingsDb } from "./db/db";
import { Language, locale } from "$lang/i18n";

const keyRefreshCycle = "refreshCycle";
const keyIsNotificationsRequested = "notificationsRequested";
const keySelectedLanguage = "language";
const keyMaxActiveProjects = "maxActiveProjects";

export let updateCheckIntervalInMinutes: Writable<number> = writable();
export let notificationsRequested: Writable<boolean> = writable();
export let language: Writable<Language> = writable();
export let maxActiveProjects: Writable<number> = writable();

language.subscribe((v) => {
    locale.set(v);
});

initSettingsWritableWithDefaultValue(updateCheckIntervalInMinutes, keyRefreshCycle, 1);
initSettingsWritableWithDefaultValue(notificationsRequested, keyIsNotificationsRequested, false);
initSettingsWritableWithDefaultValue(language, keySelectedLanguage, Language.enGB);
initSettingsWritableWithDefaultValue(maxActiveProjects, keyMaxActiveProjects, 3);

async function initSettingsWritableWithDefaultValue<T>(w: Writable<T>, settingsKey: string, defaultValue: T): Promise<Writable<T>> {
    const currentSetting = await settingsDb.settings.where("key").equals(settingsKey).first();
    const writableValue = currentSetting ? currentSetting.value : defaultValue;

    w.set(writableValue);
    w.subscribe((val) => {
        settingsDb.settings.put({key: settingsKey, value: val});
    });

    return w;
}

