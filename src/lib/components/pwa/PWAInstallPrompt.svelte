<script lang="ts">
    import { toasts } from '$lib/store/toasts';

    let deferredPrompt : any;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallToast();
    });

    function showInstallToast () {
        // requires update method call or assignment to propagate correctly
        toasts.update((toasters) => {
            toasters.push({message: "Would you like to install this App locally on your device?", ok: promptUser, showCancel: true, cancelLabel: "No, thank you!"});
            return toasters
        })
        console.log($toasts);
    }
  
    function promptUser () {
        if (!!deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt = null;
        }
    }

</script>

  