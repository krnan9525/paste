// https://styled-system.com/api/#background
import type {Property} from 'csstype';
import type {ThemeShape} from '@twilio-paste/theme';
import type {ResponsiveValue, TLengthStyledSystem} from '@twilio-paste/styling-library';
import type {StyleReset} from './helpers';

// Tokens
export type BackgroundColorOptions = keyof ThemeShape['backgroundColors'];
export type BackgroundColor = ResponsiveValue<BackgroundColorOptions | 'none' | 'transparent' | 'inherit'>;

// CSS native
export type BackgroundImageOptions = Property.BackgroundImage;
export type BackgroundSizeOptions = Property.BackgroundSize<TLengthStyledSystem>;
export type BackgroundPositionOptions = Property.BackgroundPosition<TLengthStyledSystem>;
export type BackgroundRepeatOptions = Property.BackgroundRepeat;
export type BackgroundAttachmentOptions = Property.BackgroundAttachment;

export type BackgroundImage = ResponsiveValue<BackgroundImageOptions>;
export type BackgroundSize = ResponsiveValue<BackgroundSizeOptions>;
export type BackgroundPosition = ResponsiveValue<BackgroundPositionOptions>;
export type BackgroundRepeat = ResponsiveValue<BackgroundRepeatOptions>;
export type BackgroundAttachment = ResponsiveValue<BackgroundAttachmentOptions>;

/* Styled-system grouping
 * ---
 * We add `backgroundColor` here, not in the `color` interface grouping like styled-system does
 * We also add `backgroundAttachment` here since it's logically grouped
 */
export interface BackgroundProps {
  background?: StyleReset;
  backgroundColor?: BackgroundColor;
  backgroundImage?: BackgroundImage;
  backgroundSize?: BackgroundSize;
  backgroundPosition?: BackgroundPosition;
  backgroundRepeat?: BackgroundRepeat;
  backgroundAttachment?: BackgroundAttachment;
}
