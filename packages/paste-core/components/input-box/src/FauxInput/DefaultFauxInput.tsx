import * as React from 'react';
import {Box} from '@twilio-paste/box';
import type {BoxShadow, BackgroundColor} from '@twilio-paste/style-props';
import type {FauxInputProps} from '../types';
import {FauxInputPropTypes} from '../types';

const DefaultFauxInput = React.forwardRef<HTMLDivElement, FauxInputProps>(
  ({disabled, element, hasError, readOnly, children, type, variant}, ref) => {
    let backgroundColor = 'colorBackgroundBody' as BackgroundColor;
    let boxShadow = 'shadowBorder' as BoxShadow;
    let boxShadowHover = 'shadowBorderPrimaryStronger' as BoxShadow;
    let boxShadowActive = 'shadowBorderPrimaryStronger' as BoxShadow;
    if (disabled && type !== 'hidden') {
      boxShadow = 'shadowBorderWeak';
      boxShadowHover = 'shadowBorderWeak';
      backgroundColor = 'colorBackground';
      boxShadowActive = 'shadowBorderWeak';
    } else if (readOnly && type !== 'hidden') {
      boxShadowHover = 'shadowBorder';
      backgroundColor = 'colorBackground';
    } else if (hasError && type !== 'hidden') {
      boxShadow = 'shadowBorderError';
      boxShadowHover = 'shadowBorderErrorStronger';
    } else if (type === 'hidden') {
      boxShadow = null;
      boxShadowHover = null;
      backgroundColor = null;
      boxShadowActive = null;
    }

    return (
      <Box
        element={element}
        ref={ref}
        display="flex"
        width="100%"
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
        borderRadius="borderRadius20"
        transition="box-shadow 100ms ease-in"
        cursor={disabled ? 'not-allowed' : 'text'}
        variant={variant}
        _hover={{
          boxShadow: boxShadowHover,
        }}
        _focusWithin={{
          boxShadow: 'shadowFocus',
        }}
        _active={{
          boxShadow: boxShadowActive,
        }}
      >
        {children}
      </Box>
    );
  }
);

DefaultFauxInput.displayName = 'DefaultFauxInput';

DefaultFauxInput.propTypes = FauxInputPropTypes;

export {DefaultFauxInput};
