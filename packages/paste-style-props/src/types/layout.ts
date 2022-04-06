// https://styled-system.com/api/#layout
import type {Property} from 'csstype';
import type {ThemeShape} from '@twilio-paste/theme';
import type {ResponsiveValue, TLengthStyledSystem} from '@twilio-paste/styling-library';

// Tokens
export type WidthOptions = keyof ThemeShape['widths'] | '100%' | '100vw' | 'auto' | Property.Width<TLengthStyledSystem>;
export type MinWidthOptions =
  | keyof ThemeShape['minWidths']
  | '100%'
  | '100vw'
  | 'auto'
  | Property.Width<TLengthStyledSystem>;
export type MaxWidthOptions =
  | keyof ThemeShape['maxWidths']
  | '100%'
  | '100vw'
  | 'auto'
  | Property.Width<TLengthStyledSystem>;
export type HeightOptions =
  | keyof ThemeShape['heights']
  | '100%'
  | '100vh'
  | 'auto'
  | Property.Height<TLengthStyledSystem>;
export type MinHeightOptions =
  | keyof ThemeShape['minHeights']
  | '100%'
  | '100vh'
  | 'auto'
  | Property.Height<TLengthStyledSystem>;
export type MaxHeightOptions =
  | keyof ThemeShape['maxHeights']
  | '100%'
  | '100vh'
  | 'auto'
  | Property.Height<TLengthStyledSystem>;
export type IconSizeOptions = keyof ThemeShape['iconSizes'];

export type Width = ResponsiveValue<WidthOptions>;
export type MinWidth = ResponsiveValue<MinWidthOptions>;
export type MaxWidth = ResponsiveValue<MaxWidthOptions>;
export type Height = ResponsiveValue<HeightOptions>;
export type MinHeight = ResponsiveValue<MinHeightOptions>;
export type MaxHeight = ResponsiveValue<MaxHeightOptions>;
export type IconSize = ResponsiveValue<IconSizeOptions>;
export type Size = Width | Height;

// CSS native
export type DisplayOptions = Property.Display;
export type VerticalAlignOptions = Property.VerticalAlign<TLengthStyledSystem>;
export type OverflowOptions = Property.Overflow;
export type OverflowXOptions = Property.OverflowX;
export type OverflowYOptions = Property.OverflowY;

export type Display = ResponsiveValue<DisplayOptions>;
export type VerticalAlign = ResponsiveValue<VerticalAlignOptions>;
export type Overflow = ResponsiveValue<OverflowOptions>;
export type OverflowX = ResponsiveValue<OverflowXOptions>;
export type OverflowY = ResponsiveValue<OverflowYOptions>;

export interface OverflowProps {
  overflow?: Overflow;
  overflowX?: OverflowX;
  overflowY?: OverflowY;
}

// Styled-system grouping
export interface LayoutProps extends OverflowProps {
  width?: Width;
  minWidth?: MinWidth;
  maxWidth?: MaxWidth;
  height?: Height;
  minHeight?: MinHeight;
  maxHeight?: MaxHeight;
  size?: Size;
  display?: Display;
  verticalAlign?: VerticalAlign;
}
