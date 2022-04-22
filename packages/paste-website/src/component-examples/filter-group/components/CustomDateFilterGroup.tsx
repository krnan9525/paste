import * as React from 'react';
import {useForm, useFormState} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {isEqual} from 'lodash';
import {useUID} from '@twilio-paste/uid-library';
import {Box} from '@twilio-paste/box';
import {Button} from '@twilio-paste/button';
import {Input} from '@twilio-paste/input';
import {Label} from '@twilio-paste/label';
import {Select, Option} from '@twilio-paste/select';
import {Separator} from '@twilio-paste/separator';
import {FilterIcon} from '@twilio-paste/icons/esm/FilterIcon';
import {SearchIcon} from '@twilio-paste/icons/esm/SearchIcon';
import {ExportIcon} from '@twilio-paste/icons/esm/ExportIcon';

import {DATE_TIME_RANGES, ROOM_TYPES, FORM_DEFAULT_VALUES} from '../constants';
import type {FilterGroupDateTimeProps, DateTimeFormValues} from '../types';
import {filterByDateTimeRange, filterByRoomType, filterBySearchString} from '../helpers';

import {SampleDataGrid} from './SampleDataGrid';
import {EmptyState} from './EmptyState';
import {DateTimePopover} from './DateTimePopover';

// Note: update the codesandboxes if update this
export const CustomDateFilterGroup: React.FC<FilterGroupDateTimeProps> = ({data}) => {
  const dateRangesId = `quality-${useUID()}`;
  const roomTypesId = `type-${useUID()}`;

  const {control, handleSubmit, register, reset, resetField, setError, setValue, watch} = useForm<DateTimeFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    criteriaMode: 'all',
  });
  const {isDirty, errors} = useFormState({control});

  const [filteredTableData, setFilteredTableData] = React.useState(data);

  React.useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (type === 'change') {
        if (name?.includes('customDate') && value.range !== 'custom') {
          setValue('range', 'custom');
        }

        if (name === 'range' && !isEqual(value.customDate, FORM_DEFAULT_VALUES.customDate)) {
          resetField('customDate');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setError]);

  const handleApplyFilters: SubmitHandler<DateTimeFormValues> = (formData) => {
    const {search, type, range, customDate} = formData;
    const {startDate, startTime, endDate, endTime} = customDate;

    const filtered = data.filter(({uniqueName, sid, roomType, dateCompleted}) => {
      return (
        filterBySearchString(uniqueName, sid, search) &&
        filterByRoomType(roomType, type) &&
        filterByDateTimeRange(dateCompleted, range, startDate, startTime, endDate, endTime)
      );
    });
    setFilteredTableData(filtered);
  };

  const handleClearAll = (): void => {
    reset();
    setFilteredTableData(data);
  };

  return (
    <Box paddingBottom="space70" as="form" onSubmit={handleSubmit(handleApplyFilters)}>
      <Box display="flex" alignItems="flex-end" columnGap="space50">
        <Box>
          <Label htmlFor={roomTypesId}>Room type</Label>
          <Select id={roomTypesId} {...register('type')}>
            {ROOM_TYPES.map((type) => (
              <Option value={type} key={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Box>
        <Box>
          <Label htmlFor={dateRangesId}>Date/time range</Label>
          <Select
            id={dateRangesId}
            {...register('range')}
            insertAfter={
              <DateTimePopover onApply={handleSubmit(handleApplyFilters)} register={register} errors={errors} />
            }
          >
            {DATE_TIME_RANGES.map((range) => (
              <Option value={range.value} key={range.value}>
                {range.name}
              </Option>
            ))}
          </Select>
        </Box>
        <Box display="flex" columnGap="space50" paddingLeft="space40">
          <Button
            variant="primary"
            aria-label="Apply filters"
            disabled={!isDirty}
            onClick={handleSubmit(handleApplyFilters)}
            data-cy="custom-filter-group-apply-button"
          >
            <FilterIcon decorative />
            Apply
          </Button>
          <Button
            variant="link"
            disabled={!isDirty}
            onClick={handleClearAll}
            data-cy="custom-filter-group-clear-button"
          >
            Clear all
          </Button>
        </Box>
      </Box>
      <Box paddingY="space50">
        <Separator orientation="horizontal" />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box width="size40">
          <Input
            aria-label="Search"
            type="text"
            placeholder="Search by SID or unique name"
            {...register('search')}
            insertAfter={
              <Button
                variant="link"
                onClick={handleSubmit(handleApplyFilters)}
                data-cy="custom-filter-group-search-button"
              >
                <SearchIcon decorative={false} title="Search" />
              </Button>
            }
          />
        </Box>
        <Button variant="secondary">
          <ExportIcon decorative />
          Export CSV
        </Button>
      </Box>
      <Box paddingTop="space50">
        {filteredTableData.length > 0 ? (
          <SampleDataGrid data={filteredTableData} showDateTime />
        ) : (
          <EmptyState handleClearAll={handleClearAll} />
        )}
      </Box>
    </Box>
  );
};
