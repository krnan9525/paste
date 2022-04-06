// https://styled-system.com/api/#position
import type {Property} from 'csstype';
import type {ThemeShape} from '@twilio-paste/theme';
import type {ResponsiveValue, TLengthStyledSystem} from '@twilio-paste/styling-library';

// Tokens
export type ZIndexOptions = keyof ThemeShape['zIndices'];
export type ZIndex = ResponsiveValue<ZIndexOptions>;

// CSS native

export type PositionOptions = Property.Position;
export type TopOptions = Property.Top<TLengthStyledSystem>;
export type RightOptions = Property.Right<TLengthStyledSystem>;
export type BottomOptions = Property.Bottom<TLengthStyledSystem>;
export type LeftOptions = Property.Left<TLengthStyledSystem>;

export type Position = ResponsiveValue<PositionOptions>;
export type Top = ResponsiveValue<TopOptions>;
export type Right = ResponsiveValue<RightOptions>;
export type Bottom = ResponsiveValue<BottomOptions>;
export type Left = ResponsiveValue<LeftOptions>;

// Styled-system grouping
export interface PositionProps {
  position?: Position;
  top?: Top;
  right?: Right;
  bottom?: Bottom;
  left?: Left;
  zIndex?: ZIndex;
}
