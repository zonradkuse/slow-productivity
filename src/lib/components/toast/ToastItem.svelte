<script lang="ts">
    import type { ToastItemData } from "./ToastItem";

    let {
        message,
        ok,
        okLabel = 'Ok.',
        showCancel = false,
        cancelLabel = 'Cancel.',
        cancelAction = () => {}
    }: ToastItemData = $props();

</script>

<div
    class="pwa-toast"
    role="alert"
    aria-labelledby="toast-message"
  >
    <div class="message">
      <span id="toast-message">
        { message }
      </span>
    </div>
    <div class="buttons">
        <button type="button" onclick={ok}>
          {okLabel}
        </button>
        {#if showCancel}
            <button type="button" onclick={cancelAction}>
                {cancelLabel}
            </button>
        {/if}
    </div>
</div>

<style lang="postcss">
    .pwa-toast {
      position: fixed;
      right: 0;
      bottom: 0;
      margin: 16px;
      padding: 12px;
      border: 1px solid #8885;
      border-radius: 4px;
      z-index: 2;
      text-align: left;
      box-shadow: 3px 4px 5px 0 #8885;
      background-color: white;
    }
    .pwa-toast .message {
      margin-bottom: 8px;
    }
    .pwa-toast .buttons {
      display: flex;
    }
    .pwa-toast button {
      border: 1px solid #8885;
      outline: none;
      margin-right: 5px;
      border-radius: 2px;
      padding: 3px 10px;
    }
  </style>