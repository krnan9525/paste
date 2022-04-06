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
import type {CustomTheme} from '@twilio-paste/customization';
import type {Property} from 'csstype';
import type {PseudoPropStyles} from './PseudoPropStyles';

export interface BoxBaseStyleProps
  extends LayoutProps,
    SpaceProps,
    BackgroundProps,
    BorderProps,
    ShadowProps,
    PositionProps,
    TypographyProps,
    FlexboxProps {
  animation?: Property.Animation;
  appearance?: Property.Appearance;
  borderCollapse?: Property.BorderCollapse;
  borderSpacing?: Property.BorderSpacing;
  boxSizing?: Property.BoxSizing;
  clip?: Property.Clip;
  content?: string;
  cursor?: Property.Cursor;
  float?: Property.Float;
  fontVariantNumeric?: Property.FontVariantNumeric;
  listStyleImage?: Property.ListStyleImage;
  listStylePosition?: Property.ListStylePosition;
  listStyleType?: Property.ListStyleType;
  objectFit?: Property.ObjectFit;
  objectPosition?: Property.ObjectPosition;
  opacity?: Property.Opacity;
  outline?: Property.Outline;
  pointerEvents?: Property.PointerEvents;
  resize?: Property.Resize;
  tableLayout?: Property.TableLayout;
  transform?: Property.Transform;
  transformOrigin?: Property.TransformOrigin;
  transition?: Property.Transition;
  userSelect?: Property.UserSelect;
  visibility?: Property.Visibility;
  willChange?: Property.WillChange;
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
