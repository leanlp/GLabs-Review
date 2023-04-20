import { FC, InputHTMLAttributes, useId } from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  fullWidth?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ label, name, fullWidth, ...props }) => {
  const { register } = useFormContext();
  const inputId = useId();

  return (
    <div className={`flex flex-col space-y-2`}>
      <label className="text-sm font-semibold" htmlFor={inputId}>
        {label}
      </label>
      <textarea
        className="bg-black/50 rounded p-2 outline-none outline-3 focus:outline-creator-light"
        id={inputId}
        {...register(name)}
        {...props}
      />
    </div>
  );
};

export default TextArea;
