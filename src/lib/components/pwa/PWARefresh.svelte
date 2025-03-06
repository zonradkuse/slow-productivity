<script lang="ts">
  import { updateCheckIntervalInMinutes } from '$lib/store/settings';
  import { toasts } from '$lib/store/toasts';
  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const period = $derived($updateCheckIntervalInMinutes * 60 * 1000)

  function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
    if (period <= 0) return

    setInterval(async () => {
      if ('onLine' in navigator && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await r.update()
    }, period)
  }

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(swUrl, r)
        })
      }
    },
  })

  needRefresh.subscribe((needsRefresh) => {
    if (!needsRefresh) return;

    toasts.update((t) => {
      t.push({
        message: 'New content available. Do you want to reload?',
        ok: () => updateServiceWorker(true),
        okLabel: "Reload!"
      })
      
      return t;
    });
  })
</script>
