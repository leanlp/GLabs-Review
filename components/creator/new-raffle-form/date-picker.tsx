import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, FC } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

interface DatePickerProps {
  label: string;
  name: string;
}

const DatePicker: FC<DatePickerProps> = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <div className="flex items-center justify-center">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MuiDatePicker
              label={label}
              value={moment(field.value)}
              onChange={(newValue) => {
                field.onChange(moment(newValue).toISOString());
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  error={fieldState.invalid}
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                      backgroundColor: "rgb(0 0 0 / 0.5)",
                    },
                    "& .MuiInputBase-root:hover": {
                      backgroundColor: "rgb(0 0 0 / 0.5)",
                    },
                    "& .MuiButtonBase-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                  }}
                  autoComplete="off"
                />
              )}
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
};

export default DatePicker;
