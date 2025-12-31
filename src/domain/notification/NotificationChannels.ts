export type NotificationChannelId =
  | 'default'
  | 'chat'
  | 'carpool'
  | 'notice'
  | 'schedule'
  | 'system';

export interface NotificationChannel {
  id: NotificationChannelId;
  name: string;
  description?: string;
  importance: 'min' | 'low' | 'default' | 'high' | 'max';
  vibrationPattern?: number[];
  lightColor?: string;
}


export const NOTIFICATION_CHANNELS: NotificationChannel[] = [
  {
    id: 'default',
    name: '기본 알림',
    importance: 'default',
  },
  {
    id: 'chat',
    name: '채팅 알림',
    description: '새 채팅 메시지 알림',
    importance: 'high',
    vibrationPattern: [0, 0, 250, 250],
  },
  {
    id: 'carpool',
    name: '카풀 알림',
    description: '카풀 관련 알림',
    importance: 'high',
    vibrationPattern: [0, 250, 250, 250],
  },
  {
    id: 'notice',
    name: '공지 알림',
    description: '전체 공지 알림',
    importance: 'high',
    vibrationPattern: [0, 250, 250, 250],
  },
  {
    id: 'schedule',
    name: '일정 알림',
    description: '특정 일정 시작 전 알림',
    importance: 'high',
    vibrationPattern: [250, 250, 250, 250]
  },
  {
    id: 'system',
    name: '시스템 알림',
    importance: 'max',
  },
];