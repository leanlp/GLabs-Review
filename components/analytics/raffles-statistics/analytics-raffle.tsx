import { FC } from "react";

interface AnalyticsRaffleProps {
  title: string;
  data: {
    label: string;
    value: string | number;
  }[];
}

const AnalyticsRaffle: FC<AnalyticsRaffleProps> = ({ title, data }) => {
  return (
    <div className="space-y-1 py-4 border-b-1 bg-row-gradient border-white/10">
      <h6 className="font-extralight">{title}</h6>
      <div className="flex flex-wrap justify-between space-x-4">
        {data.map((item) => (
          <div className="flex items-center space-x-2 px-2" key={item.label}>
            <p className="font-extrabold text-4xl">{item.value}</p>
            <p className="max-w-[12ch] text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsRaffle;
