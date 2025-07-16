<script lang="ts">
        import { _ } from '$lang/i18n';
  import Timer from '$lib/components/Timer.svelte';
  import { sendNotification } from '$lib/utils/notifications';

        let myTime = 25;

        function notify() {
                sendNotification("Your time is up!")
        }
</script>
<Timer timeInMinutes={myTime} alertCallback={notify} ></Timer>