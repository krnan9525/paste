// https://styled-system.com/api/#position
import type {StandardLonghandProperties} from 'csstype';
import type {ThemeShape} from '@twilio-paste/theme';
import type {ResponsiveValue, TLengthStyledSystem} from '@twilio-paste/styling-library';

// Tokens
export type ZIndexOptions = keyof ThemeShape['zIndices'];
export type ZIndex = ResponsiveValue<ZIndexOptions>;

// CSS native
type LonghandProperties = StandardLonghandProperties<TLengthStyledSystem>;
export type PositionOptions = LonghandProperties['position'];
export type TopOptions = LonghandProperties['top'];
export type RightOptions = LonghandProperties['right'];
export type BottomOptions = LonghandProperties['bottom'];
export type LeftOptions = LonghandProperties['left'];

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
