import * as React from 'react';
import {ErrorMessage} from '@hookform/error-message';
import {Box} from '@twilio-paste/box';
import {HelpText} from '@twilio-paste/help-text';
import {DatePicker} from '@twilio-paste/date-picker';
import {TimePicker} from '@twilio-paste/time-picker';
import {Label} from '@twilio-paste/label';

import type {DateTimeInputsProps} from '../types';

export const DateTimeInputs: React.FC<DateTimeInputsProps> = ({id, register, errors, label, dateName, timeName}) => (
  <Box display="flex" flexDirection="row" columnGap="space50">
    <Box width="100%">
      <Label htmlFor={`${id}-date`} required>
        {`${label} date`}
      </Label>
      <DatePicker
        id={`${id}-date`}
        aria-describedby={`${id}-date-error`}
        required
        {...register(dateName, {required: `${label} date is required.`})}
      />
      <ErrorMessage
        errors={errors}
        name={dateName}
        render={({message}): React.ReactNode => (
          <HelpText variant="error" id={`${id}-date-error`} data-cy={`${label}-date-error`}>
            {message}
          </HelpText>
        )}
      />
    </Box>
    <Box width="100%">
      <Label htmlFor={`${id}-time`} required>
        {`${label} date`}
      </Label>
      <TimePicker id={`${id}-time`} required {...register(timeName, {required: `${label} time is required.`})} />
      <ErrorMessage
        errors={errors}
        name={timeName}
        render={({message}) => (
          <HelpText variant="error" id={`${id}-time-error`} data-cy={`${label}-date-error`}>
            {message}
          </HelpText>
        )}
      />
    </Box>
  </Box>
);
