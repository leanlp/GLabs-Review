import { FC, InputHTMLAttributes, useId } from "react";
import { useFormContext } from "react-hook-form";
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ label, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputId = useId();
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`p-2 rounded outline-none bg-black/50 focus:outline-creator-light ${
          errors[name] ? "outline-red-500" : "outline-none"
        }`}
        {...register(name, {
          valueAsNumber: props.type === "number",
        })}
        {...props}
        step={props.type === "number" ? "0.01" : undefined}
      />
    </div>
  );
};

export default InputField;
