import { AccountCard, AccountTokenCard } from "components/shared";
import AnalyticsCharts from "./analytics-charts";
import AnalyticsUserSection from "./analytics-user-section";
import RafflesStatistics from "./raffles-statistics";
import AnalyticsMostPopularRaffles from "./analytics-most-popular-raffles";
import {
  useGetAdvancedAnalyticsQuery,
  useGetBasicAnalyticsQuery,
} from "store/features/api.slice";

const AnalyticsPage = () => {
  const advancedAnalyticsQuery = useGetAdvancedAnalyticsQuery();

  return (
    <div className="space-y-4 mb-16">
      <div className="grid lg:grid-cols-2 space-y-4 lg:space-y-0">
        <div className="col-span-2 lg:col-span-1 flex items-center">
          <h1 className="text-3xl font-extrabold">
            Raffle<span className="font-light">master</span>
          </h1>
        </div>
        <div className="col-span-2 lg:col-span-1 grid md:grid-cols-2 gap-7">
          <AccountTokenCard />
          <AccountCard />
        </div>
      </div>
      <h2 className="text-3xl font-bold my-2">Analytics</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <AnalyticsCharts />
        <RafflesStatistics />
        <AnalyticsUserSection />
        <AnalyticsMostPopularRaffles />
      </div>
    </div>
  );
};

export default AnalyticsPage;
