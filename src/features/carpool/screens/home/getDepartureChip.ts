import { CarpoolStatus } from '@domain/carpool/CarpoolStatus';
import { Color } from '@shared/constants/color';

export function getDepartureChip(status: CarpoolStatus) {
  const isBefore = status === 'before_departure';

  return {
    label: !isBefore ? '출발 대기' : '출발',
    backgroundColor: !isBefore ? Color.tertiary.main : Color.primary.hover,
    textColor: Color.text.white,
  };
}