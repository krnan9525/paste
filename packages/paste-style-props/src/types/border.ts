// https://styled-system.com/api/#border
import type {StandardLonghandProperties} from 'csstype';
import type {ThemeShape} from '@twilio-paste/theme';
import type {ResponsiveValue, TLengthStyledSystem} from '@twilio-paste/styling-library';
import type {StyleReset} from './helpers';

// Tokens
export type BorderRadiusOptions = keyof ThemeShape['radii'];
export type BorderWidthOptions = keyof ThemeShape['borderWidths'];
export type BorderColorOptions = keyof ThemeShape['borderColors'] | 'transparent' | 'inherit';

export type BorderRadius = ResponsiveValue<BorderRadiusOptions>;
export type BorderWidth = ResponsiveValue<BorderWidthOptions>;
export type BorderColor = ResponsiveValue<BorderColorOptions>;

export interface BorderRadiusProps {
  borderRadius?: BorderRadius;
  borderBottomLeftRadius?: BorderRadius;
  borderBottomRightRadius?: BorderRadius;
  borderTopLeftRadius?: BorderRadius;
  borderTopRightRadius?: BorderRadius;
}

export interface BorderWidthProps {
  borderWidth?: BorderWidth;
  borderBottomWidth?: BorderWidth;
  borderLeftWidth?: BorderWidth;
  borderRightWidth?: BorderWidth;
  borderTopWidth?: BorderWidth;
}

export interface BorderColorProps {
  borderColor?: BorderColor;
  borderBottomColor?: BorderColor;
  borderLeftColor?: BorderColor;
  borderRightColor?: BorderColor;
  borderTopColor?: BorderColor;
}

// CSS native
type LonghandProperties = StandardLonghandProperties<TLengthStyledSystem>;
export type BorderStyleOptions = LonghandProperties['borderBlockStyle']; // @TODO may need to exapand;
export type BorderTopStyleOptions = LonghandProperties['borderTopStyle'];
export type BorderRightStyleOptions = LonghandProperties['borderRightStyle'];
export type BorderBottomStyleOptions = LonghandProperties['borderBottomStyle'];
export type BorderLeftStyleOptions = LonghandProperties['borderLeftStyle'];

export type BorderStyle = ResponsiveValue<BorderStyleOptions>;
export type BorderTopStyle = ResponsiveValue<BorderTopStyleOptions>;
export type BorderRightStyle = ResponsiveValue<BorderRightStyleOptions>;
export type BorderBottomStyle = ResponsiveValue<BorderBottomStyleOptions>;
export type BorderLeftStyle = ResponsiveValue<BorderLeftStyleOptions>;

export interface BorderStyleProps {
  borderStyle?: BorderStyle;
  borderTopStyle?: BorderTopStyle;
  borderRightStyle?: BorderRightStyle;
  borderBottomStyle?: BorderBottomStyle;
  borderLeftStyle?: BorderLeftStyle;
}

// Styled-system grouping
export interface BorderProps extends BorderWidthProps, BorderStyleProps, BorderColorProps, BorderRadiusProps {
  border?: StyleReset;
  borderTop?: StyleReset;
  borderRight?: StyleReset;
  borderBottom?: StyleReset;
  borderLeft?: StyleReset;
}
