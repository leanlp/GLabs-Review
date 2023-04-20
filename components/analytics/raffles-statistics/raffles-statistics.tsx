import AnalyticsRaffle from "./analytics-raffle";
import { useAppSelector } from "store";

const RafflesStatistics = () => {
  const basicAnalytics = useAppSelector(
    (state) => state.creator.basicAnalytics
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b-1 border-b-white/80">
        <h3 className="font-bold flex items-center">Raffles Statistics</h3>
        {/* <div className="flex space-x-4 items-center text-sm py-2">
          <span className="">Timeframe:</span>
          <div className="flex h-full items-center space-x-2">
            <button type="button" className="">
              1H
            </button>
            <button type="button" className="">
              6H
            </button>
            <button type="button" className="">
              24H
            </button>
            <button type="button" className="">
              7D
            </button>
            <button type="button" className="">
              30D
            </button>
            <button type="button" className="font-bold">
              ALL
            </button>
          </div>
        </div> */}
      </div>
      {basicAnalytics && (
        <div>
          <AnalyticsRaffle
            title="Raffles"
            data={[
              {
                label: basicAnalytics.totalRaffles > 1 ? "Raffles" : "Raffle",
                value: basicAnalytics.totalRaffles,
              },
            ]}
          />
          <AnalyticsRaffle
            title="Participants"
            data={[
              {
                value: basicAnalytics.totalParticipants,
                label: `Unique participant${
                  basicAnalytics.totalParticipants > 1 ? "s" : ""
                }`,
              },
              {
                value: basicAnalytics.totalEntries,
                label: "Total Entries",
              },
            ]}
          />
          <AnalyticsRaffle
            title="Winners and rewards"
            data={[
              {
                label: "Total Winners",
                value: basicAnalytics.totalWinners,
              },
              {
                label: "Total Loyalty Created",
                value: basicAnalytics.totalLoyaltyPoints,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default RafflesStatistics;
