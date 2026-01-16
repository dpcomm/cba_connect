import { Ionicons } from '@expo/vector-icons';
import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';

interface FooterButton {
  text: string;
  onPress: () => void;
  color?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  leftButton?: FooterButton;
  rightButton?: FooterButton;
}

export function BaseModal({ visible, onClose, title, children, leftButton, rightButton }: Props) {
  if (!visible) return null;

  const hasFooter = leftButton || rightButton;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  {title && (
                    <ThemedText variant="heading2" color={Color.text.main}>
                      {title}
                    </ThemedText>
                  )}
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={Color.text.main} />
                </TouchableOpacity>
              </View>
              <View>
                {children}
              </View>
              {hasFooter && (
                <View style={[
                  styles.footer,
                  leftButton && !rightButton && { justifyContent: 'flex-start' },
                  !leftButton && rightButton && { justifyContent: 'flex-end' },
                  leftButton && rightButton && { justifyContent: 'space-between' },
                ]}>
                  {leftButton && (
                    <View>
                      <Button
                        title={leftButton.text}
                        onPress={leftButton.onPress}
                        size="small"
                        style={{ minWidth: 100, ...(leftButton.color && { backgroundColor: leftButton.color }) }}
                      />
                    </View>
                  )}
                  {rightButton && (
                    <View>
                      <Button
                        title={rightButton.text}
                        onPress={rightButton.onPress}
                        size="small"
                        style={{ minWidth: 100, ...(rightButton.color && { backgroundColor: rightButton.color }) }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

