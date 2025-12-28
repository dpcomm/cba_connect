import { NotificationChannel } from '@domain/notification/NotificationChannels';
import * as Notifications from 'expo-notifications';

export function mapToExpoChannel(
  channel: NotificationChannel
): Notifications.NotificationChannelInput {
  return {
    name: channel.name,
    description: channel.description,
    importance:
      Notifications.AndroidImportance[
        channel.importance.toUpperCase() as keyof typeof Notifications.AndroidImportance
      ],
    vibrationPattern: channel.vibrationPattern,
    lightColor: channel.lightColor,
  };
}