import * as React from 'react';
import {useUID} from '@twilio-paste/uid-library';
import {Box} from '@twilio-paste/box';
import {Button} from '@twilio-paste/button';
import {Heading} from '@twilio-paste/heading';
import {PopoverContainer, Popover, PopoverButton, usePopoverState} from '@twilio-paste/popover';
import {Text} from '@twilio-paste/text';
import {CalendarIcon} from '@twilio-paste/icons/esm/CalendarIcon';

import type {DateTimePopoverProps} from '../types';
import {DateTimeInputs} from './DateTimeInputs';

export const DateTimePopover: React.FC<DateTimePopoverProps> = ({onApply, register, errors}) => {
  const startId = `start-date-${useUID()}`;
  const endId = `end-date-${useUID()}`;

  const popover = usePopoverState({baseId: 'date-popover'});

  return (
    <PopoverContainer state={popover}>
      <PopoverButton variant="link" data-cy="custom-filter-group-popover-button">
        <CalendarIcon decorative={false} title="Set custom date/time range" />
      </PopoverButton>
      <Popover aria-label="Custom date range" data-cy="custom-date-popover">
        <Heading as="h2" variant="heading40">
          Custom date range
        </Heading>
        <Text as="p" color="colorTextWeak" marginBottom="space70">
          All dates/times in UTC. Usage data available up to 7 days.
        </Text>
        <Box display="flex" flexDirection="column" marginBottom="space50" rowGap="space50">
          <DateTimeInputs
            id={startId}
            label="Start"
            register={register}
            errors={errors}
            dateName="customDate.startDate"
            timeName="customDate.startTime"
          />
          <DateTimeInputs
            id={endId}
            label="End"
            register={register}
            errors={errors}
            dateName="customDate.endDate"
            timeName="customDate.endTime"
          />
        </Box>
        <Button
          variant="primary"
          onClick={() => {
            onApply();
            // popover.hide();
          }}
          data-cy="custom-filter-group-popover-apply-button"
        >
          Apply
        </Button>
      </Popover>
    </PopoverContainer>
  );
};
