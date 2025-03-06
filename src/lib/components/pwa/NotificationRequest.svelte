<script lang="ts">

    import {add as addToast} from "$lib/store/toasts";
    import {requestNotificationPermission, sendNotification} from "$lib/utils/notifications";
    import { notificationsRequested } from "$lib/store/settings";

    function suggestNotifications() {
        if (!$notificationsRequested) {
        addToast("Would you like to enable push notifications?", {
            ok: async () => {
            await requestNotificationPermission();

            $notificationsRequested = true;
            },
            showCancel: true
        })
        }
  }

  setTimeout(suggestNotifications, 10000);
</script>