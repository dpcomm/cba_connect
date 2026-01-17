import { Color } from '@shared/constants/color';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface Props {
  visible: boolean;
}

export function LoadingOverlay({ visible }: Props) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Color.primary.main} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
