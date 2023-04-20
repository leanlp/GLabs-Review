import React from "react";
import { FaEthereum } from "react-icons/fa";
// import statistics from "data/statistics.json";
import PieChart from "./pie-chart";
import { useAppSelector } from "store";
import { TAdvancedAnalytics } from "types";

const statistics: {
  [key: string]: keyof TAdvancedAnalytics["LPStats"];
} = {
  "Loyalty per User per Day": "loyaltyPerUserPerDay",
  "Loyalty per NFT per Day": "loyaltyPerNftPerDay",
  "Staked NFTs": "stakedNfts",
  "Total Loyalty Points per Day": "totalLoyaltyPointsPerDay",
};

const AnalyticsCharts = () => {
  const advancedAnalytics = useAppSelector(
    (state) => state.creator.advancedAnalytics
  );

  // conStaked.log(advancedAnalytics);
  return (
    <div className="space-y-4">
      {/* <div className="flex items-center space-x-2">
        <button type="button" className="text-sm font-bold">
          Tokenomics
        </button>
        <span>|</span>
        <button type="button" className="text-sm">
          Tabbed Link
        </button>
        <span>|</span>
        <button type="button" className="text-sm">
          Tabbed Link 2
        </button>
        <span>|</span>
        <button type="button" className="text-sm">
          Tabbed Link 3
        </button>
      </div> */}
      <div className="rounded-lg space-y-4 p-4 bg-nfts-gradient border-1 border-gray-600/50">
        <h4 className="font-light text-sm">Total Loyalty Points</h4>
        <div className="space-x-2 flex items-end">
          <span className="xl:text-5xl text-4xl text-creator-light font-extrabold">
            {advancedAnalytics?.LPStats?.totalLoyaltyPoints} LP
          </span>
          {/* <span className="flex text-xs items-center space-x-2 ml-2 pb-1">
            <span>≈</span>
            <span className="text-black p-1 bg-white rounded-full">
              <FaEthereum />
            </span>
            <span>0,00005468 ETH</span>
          </span> */}
        </div>
        <hr className="border-gray-600/50" />
        <div className="grid xl:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20">
                <PieChart percentage={44} />
              </div>
              <h6 className="font-light text-sm">Total Loyalty per user</h6>
              <p className="font-semibold text-creator-light">
                {advancedAnalytics?.LPStats?.totalLoyaltyPerUser.toFixed(2)} LP
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20">
                <PieChart percentage={56} />
              </div>
              <h6 className="font-light text-sm">Total Loyalty per NFT</h6>
              <p className="font-semibold text-creator-light">
                {advancedAnalytics?.LPStats?.totalLoyaltyPerNft.toFixed(2)} LP
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {Object.entries(statistics).map(([key, value]: [any, any], i) => (
              <div key={key} className="space-x-2 grid grid-cols-3">
                <span className="col-span-2 text-gray-200">{key}</span>
                <span className="col-span-1 font-semibold">
                  {advancedAnalytics?.LPStats?.[
                    value as keyof TAdvancedAnalytics["LPStats"]
                  ]?.toFixed(value !== "stakedNfts" ? 2 : 0) ?? 0}{" "}
                    { value !== "stakedNfts" ? "LP" : "" }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
