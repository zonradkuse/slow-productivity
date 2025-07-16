<script lang="ts">
  import { language, maxActiveProjects, updateCheckIntervalInMinutes } from "$lib/store/settings";
  import { locale, locales, _ } from '../../lang/i18n';

</script>

<div class="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-xl">
    <h2 class="text-2xl font-semibold mb-4">{$_("settings.title")}</h2>

    <!-- Settings Container -->
    <div class="space-y-4">
        <!-- Number Input -->
        <div class="flex items-center justify-between">
            <label for="interval" class="font-bold text-gray-700">{$_("settings.refreshCycle")}</label>
            <input type="number" id="interval" bind:value="{$updateCheckIntervalInMinutes}"
                class="num">
        </div>

        <div class="flex items-center justify-between">
            <label for="activeProjects" class="font-bold text-gray-700">{$_("settings.macActiveProjects")}</label>
            <input type="number" id="activeProjects" bind:value="{$maxActiveProjects}"
                class="num">
        </div>

        <!-- Boolean Toggle
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Enable notifications</span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-blue-500 peer-checked:before:translate-x-5 transition-all before:content-[''] before:absolute before:top-1 before:left-1 before:bg-white before:border before:rounded-full before:h-4 before:w-4 before:transition-transform"></div>
            </label>
        </div> -->

        <!-- Language Picker -->
        <div class="flex justify-between items-center">
            <label for="languageSelect" class="text-gray-700">{$_("settings.lang")}</label>
            <select id="languageSelect" bind:value={$language} class="p-2 border border-gray-300 rounded-lg">
                {#each $locales as locale}
                    <option value={locale}>{locale}</option>
                {/each}
            </select>
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .num {
        @apply w-20 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500;
    }

    label {
        @apply font-bold text-gray-700;
    }
</style>
