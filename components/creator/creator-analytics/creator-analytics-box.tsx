import LoadingSpinner from "components/shared/loading-spinner";
import { FC } from "react";

const format = Intl.NumberFormat("en-US", {
  // compact
  notation: "compact",
  compactDisplay: "short",
});

const CreatorAnalyticsBox: FC<{
  label: string;
  value: number | "loading" | "error";
}> = ({ label, value }) => {
  return (
    <div className=" flex-1 bg-black/30 px-3 py-10 text-center border-white/10 border-x-1 border-y-1">
      <div className=" text-3xl">
        {value === "loading" ? (
          <LoadingSpinner size={24} />
        ) : value === "error" ? (
          "error"
        ) : (
          format.format(value)
        )}
      </div>
      <div className=" text-xs">{label}</div>
    </div>
  );
};

export default CreatorAnalyticsBox;
