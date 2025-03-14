import * as React from 'react';
import * as PropTypes from 'prop-types';
import {useVirtual} from 'react-virtual';
import {useTheme, remToPx} from '@twilio-paste/theme';
import {useUID} from '@twilio-paste/uid-library';
import {ChevronDownIcon} from '@twilio-paste/icons/esm/ChevronDownIcon';
import {Box} from '@twilio-paste/box';
import {InputBox, InputChevronWrapper} from '@twilio-paste/input-box';
import {Label} from '@twilio-paste/label';
import {HelpText} from '@twilio-paste/help-text';
import type {HelpTextVariants} from '@twilio-paste/help-text';
import type {InputVariants} from '@twilio-paste/input';
import type {TextColor} from '@twilio-paste/style-props';
import {ComboboxInputSelect} from './styles/ComboboxInputSelect';
import {ComboboxInputWrapper} from './styles/ComboboxInputWrapper';
import {ComboboxListbox} from './styles/ComboboxListbox';
import {ComboboxItems} from './ComboboxItems';
import type {ComboboxProps} from './types';

import {extractPropsFromState} from './extractPropsFromState';

const getHelpTextVariant = (variant: InputVariants, hasError: boolean | undefined): HelpTextVariants => {
  if (hasError && variant === 'inverse') {
    return 'error_inverse';
  }
  if (hasError) {
    return 'error';
  }
  if (variant === 'inverse') {
    return 'inverse';
  }
  return 'default';
};

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      autocomplete,
      disabled,
      element = 'COMBOBOX',
      hasError,
      helpText,
      initialSelectedItem,
      initialIsOpen,
      inputValue,
      insertAfter,
      insertBefore,
      items,
      itemToString,
      labelText,
      onInputValueChange,
      onSelectedItemChange,
      optionTemplate,
      onHighlightedIndexChange,
      onIsOpenChange,
      required,
      selectedItem,
      groupItemsBy,
      groupLabelTemplate,
      variant = 'default',
      state,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const parentRef = React.useRef(null);
    const helpTextId = useUID();

    // Only virtualize non-grouped items
    // Not virtualizing grouped items because we cannot accessibly define position within nested sets (e.g. "groups")
    const {scrollToIndex, virtualItems, totalSize} = useVirtual({
      size: items.length,
      parentRef,
      // 36 is a magic number that represents the comboboxItem height in px
      // this is an estimate, and gets recalculated in runtime
      estimateSize: React.useCallback(() => 36, []),
      overscan: 4,
      paddingStart: remToPx(theme.space.space30, 'number') as number,
    });

    const {
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      isOpen,
    } = extractPropsFromState({
      onInputValueChange,
      onIsOpenChange,
      onSelectedItemChange,
      onHighlightedIndexChange,
      itemToString,
      initialIsOpen,
      inputValue,
      selectedItem,
      initialSelectedItem,
      items,
      state,
    });

    React.useEffect(() => {
      const comboboxIsVirtualized = typeof groupItemsBy !== 'string';
      if (comboboxIsVirtualized) {
        if (highlightedIndex !== undefined && typeof scrollToIndex === 'function' && highlightedIndex > -1) {
          scrollToIndex(highlightedIndex);
        }
      }
    }, [highlightedIndex, scrollToIndex, groupItemsBy]);

    if (
      getComboboxProps === undefined ||
      getInputProps === undefined ||
      getItemProps === undefined ||
      getLabelProps === undefined ||
      getMenuProps === undefined ||
      getToggleButtonProps === undefined ||
      highlightedIndex === undefined ||
      isOpen === undefined
    ) {
      throw new Error(
        '[Combobox]: One of getComboboxProps, getInputProps, getItemProps, getLabelProps, getMenuProps, getToggleButtonProps, highlightedIndex or isOpen is missing from the state object. Please make sure this is provided.'
      );
    }

    let iconColor = 'colorTextIcon' as TextColor;
    if (disabled) {
      iconColor = 'colorTextWeaker';
    } else if (variant === 'inverse') {
      iconColor = 'colorTextInverseWeak';
    }

    return (
      <Box position="relative" element={`${element}_WRAPPER`}>
        <Label disabled={disabled} required={required} variant={variant} {...getLabelProps()}>
          {labelText}
        </Label>
        <InputBox
          disabled={disabled}
          element={element}
          hasError={hasError}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          variant={variant}
        >
          <ComboboxInputWrapper {...getComboboxProps({role: 'combobox'})}>
            <ComboboxInputSelect
              {...getToggleButtonProps({tabIndex: 0})}
              // we spread props into `getInputProps` so that Downshift handles events correctly
              {...getInputProps({disabled, required, ref, ...props})}
              {...(!autocomplete ? {onChange: (event: React.ChangeEvent) => event.preventDefault()} : undefined)}
              autocomplete={autocomplete}
              aria-describedby={helpTextId}
              element={`${element}_ELEMENT`}
            />
            {!autocomplete && (
              <InputChevronWrapper element={`${element}_CHEVRON_WRAPPER`}>
                <ChevronDownIcon aria-hidden="true" decorative color={iconColor} size="sizeIcon30" />
              </InputChevronWrapper>
            )}
          </ComboboxInputWrapper>
        </InputBox>
        <ComboboxListbox hidden={!isOpen} element={element} {...getMenuProps({ref: parentRef})}>
          <ComboboxItems
            items={items}
            element={element}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            optionTemplate={optionTemplate}
            groupItemsBy={groupItemsBy}
            groupLabelTemplate={groupLabelTemplate}
            totalSize={totalSize}
            virtualItems={virtualItems}
          />
        </ComboboxListbox>
        {helpText && (
          <HelpText id={helpTextId} variant={getHelpTextVariant(variant, hasError)}>
            {helpText}
          </HelpText>
        )}
      </Box>
    );
  }
);

Combobox.displayName = 'Combobox';

Combobox.propTypes = {
  autocomplete: PropTypes.bool,
  element: PropTypes.string,
  groupItemsBy: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  initialIsOpen: PropTypes.bool,
  initialSelectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemToString: PropTypes.func,
  labelText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onHighlightedIndexChange: PropTypes.func,
  onInputValueChange: PropTypes.func,
  onIsOpenChange: PropTypes.func,
  onSelectedItemChange: PropTypes.func,
  optionTemplate: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export {Combobox};
