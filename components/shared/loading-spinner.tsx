import { FC } from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: "white" | "black" | "creator" | "participant";
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size, color }) => {
  return (
    <div className="flex justify-center items-center w-full h-full p-2">
      <div
        style={{
          width: size,
          height: size,
        }}
        className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
          color === "black"
            ? "border-black"
            : color === "creator"
            ? "border-creator-dark"
            : color === "participant"
            ? "border-participant-dark"
            : "border-white"
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
