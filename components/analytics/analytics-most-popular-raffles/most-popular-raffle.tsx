import PopularRaffle from "./popular-raffle";
import { useAppSelector } from "store";

const MostPopularRaffles = () => {
  const advancedAnalytics = useAppSelector(
    (state) => state.creator.advancedAnalytics
  );

  // console.log(advancedAnalytics?.PopularRaffleStats?.topRaffles);

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b-1 border-b-white/80">
        <h3 className="font-bold flex items-center">Most Popular Raffles</h3>
        <div className="flex space-x-4 items-center text-sm py-2">
          {/* <div className="flex h-full items-center space-x-2">
            <button type="button" className="">
              participant
            </button>
            <button type="button" className="">
              Winners
            </button>
            <button type="button" className="">
              Views
            </button>
            <button type="button" className="font-bold">
              Entries
            </button>
          </div> */}
        </div>
      </div>
      {advancedAnalytics?.PopularRaffleStats?.topRaffles?.map((raffle, i) => (
        <PopularRaffle index={i} key={raffle._id} raffle={raffle} />
      ))}
    </div>
  );
};

export default MostPopularRaffles;
