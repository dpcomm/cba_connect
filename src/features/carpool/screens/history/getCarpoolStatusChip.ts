import { CarpoolStatus } from "@domain/carpool/CarpoolStatus";
import { Color } from '@shared/constants/color';

export function getStatusChipMeta(status: CarpoolStatus) {
    switch (status) {
        case 'before_departure':
            return {
                label: '출발 대기',
                backgroundColor: Color.tertiary.main,
                textColor: Color.text.white,
            };

        case 'in_transit':
            return {
                label: '출발',
                backgroundColor: Color.primary.hover,
                textColor: Color.text.white,
            };

        case 'arrived':
            return {
                label: '도착',
                backgroundColor: Color.primary.pressed,
                textColor: Color.text.white,
            };

        default:
            return {
                label: '',
                backgroundColor: Color.secondary.hover,
                textColor: Color.text.main,
            };
    }
}
