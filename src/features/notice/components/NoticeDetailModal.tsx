import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { BaseModal } from '@shared/components/modal/BaseModal';

import { Notice } from '@domain/notice/Notice';
import { getNoticeAuthorLabel } from '../screens/getNoticeAuthorLabel';
import { styles } from '../screens/styles';

type Props = {
  visible: boolean;
  notice?: Notice | null;
  dateText?: string;
  onClose: () => void;
};

export function NoticeDetailModal({ visible, notice, dateText, onClose }: Props) {
  const title = useMemo(() => {
    if (!notice) return '';
    return `[${getNoticeAuthorLabel(notice.author)}] ${notice.title}`;
  }, [notice]);

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.noticeModalWrapper}>
        {/* 카테고리 */}
        <ThemedText variant="heading2" style={styles.noticeCategoryText}>
          [ {getNoticeAuthorLabel(notice?.author)} ]
        </ThemedText>

        {/* 제목 */}
        <ThemedText variant="heading2" style={styles.noticeModalTitle}>
          {notice?.title}
        </ThemedText>

        {/* 본문 */}
        <ThemedText variant="text1" style={styles.noticeModalContent}>
          {notice?.body}
        </ThemedText>

        {/* 날짜 */}
        <ThemedText variant="text2" style={styles.noticeModalDate}>
          {dateText}
        </ThemedText>
      </View>
    </BaseModal>

  );
}
