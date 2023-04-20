import { FC, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
  percentage: number;
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

const PieChart: FC<IPieChartProps> = ({ percentage }) => {
  const data = useMemo(
    () => ({
      labels: ["#232334", "#574BBC"],
      datasets: [
        {
          data: [100 - percentage, percentage],
          backgroundColor: ["#232334", "#574BBC"],
          borderWidth: 0,
        },
      ],
    }),
    [percentage]
  );

  return (
    <div className="w-full relative">
      <div className="absolute w-[90%] h-[90%] bg-[#0c0a1d] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
