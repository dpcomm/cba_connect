import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
  },
  container: {
    width: '100%',
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.s,
    paddingVertical: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.l,
    ...Layout.shadow.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 40,
  },
  closeButton: {
    position: 'absolute',
    top: -Layout.spacing.xl + 22,
    right: -Layout.spacing.l + 22,
  },
  footer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.l,
    gap: Layout.spacing.s,
  },
});
