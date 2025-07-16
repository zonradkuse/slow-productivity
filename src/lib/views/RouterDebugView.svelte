<script lang="ts">
    import { _ } from '$lang/i18n';

    let props = $props();
</script>

<h2>{$_("goals.title")}</h2>

{JSON.stringify(props)}

<style lang="postcss">
    @reference "tailwindcss";
</style>
