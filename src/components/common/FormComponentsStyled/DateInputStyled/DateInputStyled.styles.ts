export const styles = {
  calendar: {
    '& .MuiInputBase-input.MuiOutlinedInput-input ': {
      textTransform: 'uppercase',
    },
    '& input[type=date]::-webkit-calendar-picker-indicator': {
      display: 'none',
    },
    '& input[type=date]::-webkit-datetime-edit-month-field, input[type=date]::-webkit-datetime-edit-day-field, input[type=date]::-webkit-datetime-edit-year-field':
      {
        '&:focus': {
          color: 'common.white',
          backgroundColor: 'primary.light',
          borderRadius: '0.25rem',
        },
      },
  },
};
