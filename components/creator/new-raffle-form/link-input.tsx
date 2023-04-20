import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes, FC } from "react";

interface LinkInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: JSX.Element;
  optional?: boolean;
}

const LinkInput: FC<LinkInputProps> = ({
  label,
  name,
  icon,
  optional,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid items-center grid-cols-6 gap-4">
      <div className="flex items-center col-span-2 space-x-2">
        <label className="flex items-center space-x-2 text-sm font-semibold">
          <span>{label}</span>
          <span>{icon}</span>
        </label>
        {optional && (
          <span className="ml-2 text-sm text-white/50">Optional</span>
        )}
      </div>
      <input
        placeholder={`add ${label ?? ""} link`}
        className={`w-full col-span-4 p-2 rounded outline-none bg-black/50 outline-3 focus:outline-creator-light ${
          errors[name] ? "outline-red-500" : "outline-none"
        }`}
        {...register(name)}
        {...props}
      />
    </div>
  );
};

export default LinkInput;
