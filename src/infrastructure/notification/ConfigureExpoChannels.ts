import { NotificationChannel } from '@domain/notification/NotificationChannels';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { mapToExpoChannel } from './ExpoChannelMapper';

export async function configureExpoChannels(
  channels: NotificationChannel[]
): Promise<void> {
  if (Platform.OS !== 'android') return;

  for (const channel of channels) {
    await Notifications.setNotificationChannelAsync(
      channel.id,
      mapToExpoChannel(channel)
    );
  }
}