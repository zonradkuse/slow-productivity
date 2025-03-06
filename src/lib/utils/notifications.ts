import { add as addToast } from "$lib/store/toasts";

export async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        addToast("You chose not to grant permission. Please reset the notification settings on your device if you change your mind.")
        return false;
    }

    sendNotification("Notifications are now enabled!")
    return true;
}

export async function sendNotification(message: string, options?: NotificationOptions) {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (!!registration && 'showNotification' in registration) {
        registration.showNotification("Notifications are now enabled", {requireInteraction: true});
    } else {
        return new Notification(message, options);
    }
}
