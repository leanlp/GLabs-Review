import { Chip, IconButton, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAdd } from "react-icons/io5";

interface ArrayInputProps {
  name: string;
  label: string;
  placeholder: string;
}

const ArrayInput: FC<ArrayInputProps> = ({ name, label, placeholder }) => {
  const {
    control,
    watch,
    setValue: setContextValue,
    formState: { errors },
  } = useFormContext();

  const onAdd = (value: string) => {
    const currentValue = watch(name);
    // console.log({ name, isMatch: /twitter/i.test(name) });
    if (!value || currentValue.includes(value)) return;
    if (/twitter/i.test(name) && !/twitter/i.test(value)) {
      toast.error("Only Twitter Full URL is allowed");
      return;
    }
    setContextValue(name, [...watch(name), value]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          size="small"
          multiple
          options={field.value as string[]}
          value={field.value as string[]}
          componentsProps={{
            paper: {
              sx: {
                display: "none",
              },
            },
          }}
          onChange={(e, value) => {
            field.onChange(value);
          }}
          popupIcon={false}
          sx={{
            "& .MuiOutlinedInput-root": {
              pr: "6px !important",
            },
          }}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAdd(params.inputProps.value as string);
                }
              }}
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
                  border: errors[name] ? "1px solid red" : "none",
                },
              }}
              variant="outlined"
              label={label}
              placeholder={placeholder}
            />
          )}
        />
      )}
    />
  );
  // return (
  //   <Controller
  //     name={name}
  //     control={control}
  //     render={({ field, fieldState }) => (
  //       <Autocomplete
  //         multiple
  //         id="tags-standard"
  //         options={field.value as string[]}
  //         getOptionLabel={(option) => option}
  //         //   limitTags={2}
  //         value={field.value as string[]}
  //         onChange={(e, value) => {
  //           field.onChange(value);
  //         }}
  //         size="small"
  //         popupIcon={false}
  //         // sx={{
  //         //   "& .MuiOutlinedInput-root": {
  //         //     pr: "6px !important",
  //         //   },
  //         // }}
  //         renderTags={(values, getTagProps) => {
  //           console.log(values);
  //           return values.map((v, index) => <div key={index}>{v}</div>);
  //           return values.map((option: string, index: number) => (
  //             <Chip
  //               variant="outlined"
  //               label={option}
  //               {...getTagProps({ index })}
  //               key={index}
  //             />
  //           ));
  //         }}
  //         renderInput={(params) => (
  //           <TextField
  //             {...params}
  //             variant="outlined"
  //             inputRef={inputRef}
  //             size="small"
  //             label={label}
  //             placeholder={placeholder}
  //             onKeyDown={(e) => {
  //               if (e.key === "Enter") {
  //                 e.preventDefault();
  //                 onAdd();
  //               }
  //             }}
  //             sx={{
  //               "& .MuiInputBase-root": {
  //                 color: "white",
  //                 backgroundColor: "rgb(0 0 0 / 0.5)",
  //               },
  //               "& .MuiInputBase-root:hover": {
  //                 backgroundColor: "rgb(0 0 0 / 0.5)",
  //               },
  //               "& .MuiButtonBase-root": {
  //                 color: "white",
  //               },
  //               "& .MuiOutlinedInput-notchedOutline": {
  //                 border: "none !important",
  //               },
  //             }}
  //             InputProps={{
  //               endAdornment: (
  //                 <Tooltip title="Add">
  //                   <IconButton size="small">
  //                     <IoAdd />
  //                   </IconButton>
  //                 </Tooltip>
  //               ),
  //             }}
  //           />
  //         )}
  //       />
  //     )}
  //   />
  // );
};

export default ArrayInput;
