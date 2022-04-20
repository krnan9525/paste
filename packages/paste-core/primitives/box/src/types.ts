import type {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from '@twilio-paste/style-props';
import type {TLengthStyledSystem} from '@twilio-paste/styling-library';
import type {CustomTheme} from '@twilio-paste/customization';
import type {StandardLonghandProperties, StandardShorthandProperties} from 'csstype';

// 'csstype';
import type {PseudoPropStyles} from './PseudoPropStyles';

type LonghandProperties = StandardLonghandProperties<TLengthStyledSystem>;
type ShorthandProperties = StandardShorthandProperties<TLengthStyledSystem>;

export interface BoxBaseStyleProps
  extends LayoutProps,
    SpaceProps,
    BackgroundProps,
    BorderProps,
    ShadowProps,
    PositionProps,
    TypographyProps,
    FlexboxProps {
  animation?: ShorthandProperties['animation'];
  appearance?: LonghandProperties['appearance'];
  borderCollapse?: LonghandProperties['borderCollapse'];
  borderSpacing?: LonghandProperties['borderSpacing'];
  boxSizing?: LonghandProperties['boxSizing'];
  clip?: LonghandProperties['clipPath'];
  content?: string;
  cursor?: LonghandProperties['cursor'];
  float?: LonghandProperties['float'];
  fontVariantNumeric?: LonghandProperties['fontVariantNumeric'];
  listStyleImage?: LonghandProperties['listStyleImage'];
  listStylePosition?: LonghandProperties['listStylePosition'];
  listStyleType?: LonghandProperties['listStyleType'];
  objectFit?: LonghandProperties['objectFit'];
  objectPosition?: LonghandProperties['objectPosition'];
  opacity?: LonghandProperties['opacity'];
  outline?: ShorthandProperties['outline'];
  pointerEvents?: LonghandProperties['pointerEvents'];
  resize?: LonghandProperties['resize'];
  tableLayout?: LonghandProperties['tableLayout'];
  transform?: LonghandProperties['transform'];
  transformOrigin?: LonghandProperties['transformOrigin'];
  transition?: ShorthandProperties['transition'];
  userSelect?: LonghandProperties['userSelect'];
  visibility?: LonghandProperties['visibility'];
  willChange?: LonghandProperties['willChange'];
  '-webkit-text-fill-color'?: string;
  '-webkit-opacity'?: string;
}

export type BoxPseudoStyleProps = {
  [key in keyof typeof PseudoPropStyles]?: BoxBaseStyleProps;
};

export interface BoxStyleProps extends BoxBaseStyleProps, BoxPseudoStyleProps {}

// Omits potential clashes from our style props with HTMLAttributes (i.e.: color)
export interface BoxElementProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof BoxBaseStyleProps> {
  as?: keyof JSX.IntrinsicElements;
  type?: string;
  /** Typed as any because Box can literally be any HTML element */
  ref?: any | null;
  // image props
  alt?: string;
  src?: string;
  // link props
  href?: string;
  rel?: string;
  target?: string;
  //  select props
  multiple?: boolean;
  // optgroup props
  label?: string;
  datetime?: string;
  /** element identifier for customization */
  element?: string;
  /** variant for variant styling */
  variant?: string;
}

export interface BoxProps extends BoxElementProps, BoxStyleProps {}

export type StyledBoxProps = BoxProps & {'data-paste-element': string; theme: CustomTheme};
