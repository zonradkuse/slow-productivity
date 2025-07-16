import { _, register, init, isLoading, locale, locales, getLocaleFromNavigator } from 'svelte-i18n';

enum Language {
    enGB = "en-GB",
    deDE = "de-DE",
    ptPT = "pt-PT"
}

for (let l of Object.values(Language)) {
    register(l, () => import(`./translations/${l}.json`));
}

init({
    fallbackLocale: Language.enGB,
    initialLocale: getLocaleFromNavigator(),
});

export { _, isLoading, locale, locales, Language };
