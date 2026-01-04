import { NOTIFICATION_CHANNELS } from '@domain/notification/NotificationChannels';
import { configureExpoChannels } from '@infrastructure/notification/ConfigureExpoChannels';
import { registerNotificationHandlers } from '@infrastructure/notification/ExpoNotificationHandler';
import { getExpoPushToken } from '@infrastructure/notification/ExpoPushTokenProvider';
import { NotificationPermission } from '@infrastructure/notification/NotificationPermission';



export async function initializeNotifications(): Promise<{
  pushToken: string | null;
}> {
  // 1. Android Channel 설정
  await configureExpoChannels(NOTIFICATION_CHANNELS);

  // 2. Permission
  const permission = new NotificationPermission();
  const granted = await permission.ensureGranted();
  if (!granted) {
    return { pushToken: null };
  }

  // 3. Push Token 확보
  const pushToken = await getExpoPushToken();
  console.log('Expo Push Token (Bootstrap):', pushToken);

  // 4. Handler 등록
  registerNotificationHandlers();

  return { pushToken };
}