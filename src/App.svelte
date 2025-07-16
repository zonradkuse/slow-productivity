<script lang="ts">
  import "./app.css";
  import { _, isLoading } from './lang/i18n'

  import routes from "./routes";

  import PWARefresh from './lib/components/pwa/PWARefresh.svelte'
  import PWAInstall from './lib/components/pwa/PWAInstallPrompt.svelte'
  import Router from "$lib/components/Router.svelte";
  import Toast from "$lib/components/toast/Toast.svelte";
  import NotificationRequest from "$lib/components/pwa/NotificationRequest.svelte";

  let sideMenuClosed : boolean = true;

  function toggleAsideVisibility() {
    sideMenuClosed = !sideMenuClosed;
  }

  function closeAside() {
    sideMenuClosed = true;
  }

</script>

{#if $isLoading}
  ...
{:else}
<header class="bg-lime-700 text-white p-4 flex justify-between items-center">
  <button class="md:hidden shadow-lg text-white" onclick={toggleAsideVisibility}>
      ☰
  </button>
  <h1 class="text-xl font-bold">{$_("app.title")}</h1>
</header>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex flex-1" onclick={closeAside}>
    <!-- Sidebar -->
    <aside id="sidebar" class="bg-gray-700 text-white w-64 h-full space-y-4 fixed transform md:-translate-x-0 transition-transform z-40" class:-translate-x-full={sideMenuClosed}>
        <nav>
            <ul class="space-y-2">
                <li><a href="#/" class="block p-4 hover:bg-gray-800" onclick={toggleAsideVisibility}>{$_("home")}</a></li>
                <li><a href="#/settings" class="block p-4 hover:bg-gray-800" onclick={toggleAsideVisibility}>{$_("settings.title")}</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-6 md:ml-64 overflow-auto mb-16">
      <Router {routes} />
    </main>
</div>

<!-- Footer -->
<footer class="bg-white fixed bottom-0 left-0 w-full flex justify-around border-t md:pl-64">
    <a href="#/goals" class="btn bg-green-100">🏠 {$_("goals.title")}</a>
    <a href="#/projects" class="btn">🔍 {$_("projects.title")}</a>
    <a href="#/tasks" class="btn bg-amber-100">⚙️ {$_("tasks.title")}</a>
</footer>
  
<PWAInstall />

<PWARefresh />

<Toast />

<NotificationRequest />
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-50);
  }

  footer > .btn {
    @apply block text-gray-600 hover:text-blue-600 font-semibold px-3 py-4 hover:bg-blue-100 transition w-full text-center;
  }
</style>
