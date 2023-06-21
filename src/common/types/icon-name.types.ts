import { ICON_NAMES } from '../constants/icon-names.consts';

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];
