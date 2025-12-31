import * as Notifications from 'expo-notifications';

export class NotificationPermission {
    async getStatus(): Promise<Notifications.PermissionStatus> {
        const { status } = await Notifications.getPermissionsAsync();
        return status;
    }

    async request(): Promise<Notifications.PermissionStatus> {
        const { status } = await Notifications.requestPermissionsAsync();
        return status;
    }

    async ensureGranted(): Promise<boolean> {
        const current = await this.getStatus();
        if (current === 'granted') return true;

        const requested = await this.request();
        return requested === 'granted';
    }
}