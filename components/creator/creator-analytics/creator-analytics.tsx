import { useGetBasicAnalyticsQuery } from "store/features/api.slice";
import CreatorAnalyticsBox from "./creator-analytics-box";
import CreatorAnalyticsHeader from "./creator-analytics-header";
import { TBasicAnalytics, TBasicAnalyticsKey } from "types";

const BASIC_KEYS: {
  label: string;
  key: keyof TBasicAnalytics;
}[] = [
  {
    label: "Total Raffles",
    key: "totalRaffles",
  },
  {
    label: "Total participants",
    key: "totalParticipants",
  },
  {
    label: "Total Entries",
    key: "totalEntries",
  },
  {
    label: "Total Winners",
    key: "totalWinners",
  },
  {
    label: "Total Loyalty Points",
    key: "totalLoyaltyPoints",
  },
];

const CreatorAnalytics = () => {
  const basicAnalyticsQuery = useGetBasicAnalyticsQuery();

  return (
    <div>
      <CreatorAnalyticsHeader />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {BASIC_KEYS.map((data) => (
          <CreatorAnalyticsBox
            key={data.label}
            label={data.label}
            value={
              basicAnalyticsQuery.data
                ? basicAnalyticsQuery.data[data.key]
                : basicAnalyticsQuery.isLoading
                ? "loading"
                : "error"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CreatorAnalytics;
