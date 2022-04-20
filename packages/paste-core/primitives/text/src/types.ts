import type {StandardLonghandProperties, StandardShorthandProperties} from 'csstype';
import type {CustomTheme} from '@twilio-paste/customization';
import type {
  Display,
  OverflowProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
  VerticalAlign,
} from '@twilio-paste/style-props';
import type {TLengthStyledSystem} from '@twilio-paste/styling-library';
import type {PseudoPropStyles} from './PseudoPropStyles';

type LonghandProperties = StandardLonghandProperties<TLengthStyledSystem>;
type ShorthandProperties = StandardShorthandProperties<TLengthStyledSystem>;

export interface TextBaseStyleProps extends OverflowProps, PositionProps, ShadowProps, SpaceProps, TypographyProps {
  content?: string;
  cursor?: LonghandProperties['cursor'];
  display?: Display;
  outline?: ShorthandProperties['outline'];
  // Do not document, we prefer if folks do not use this property for i18n.
  textTransform?: LonghandProperties['textTransform'];
  transition?: ShorthandProperties['transition'];
  verticalAlign?: VerticalAlign;
  fontVariantNumeric?: LonghandProperties['fontVariantNumeric'];
}

export type TextPseudoStyleProps = {
  [key in keyof typeof PseudoPropStyles]?: TextStyleProps;
};

export interface TextStyleProps extends TextBaseStyleProps, TextPseudoStyleProps {}

export interface TextElementProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  as: keyof JSX.IntrinsicElements;
  href?: string;
  /** Typed as any because Text can literally be any HTML element */
  ref?: any | null;
  rel?: string;
  target?: string;
  dateTime?: string;
  /** element identifier for customization */
  element?: string;
  /** variant for variant styling */
  variant?: string;
}

export interface TextProps extends TextElementProps, TextStyleProps {}

export type StyledTextProps = TextProps & {'data-paste-element': string; theme: CustomTheme};
