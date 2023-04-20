import moment from "moment";
import { FC } from "react";
import { TRaffle } from "types";

interface PopularRaffleProps {
  raffle: TRaffle;
  index: number;
}

const PopularRaffle: FC<PopularRaffleProps> = ({ raffle, index }) => {
  return (
    <div className="grid grid-cols-8 md:grid-cols-6 gap-4 py-2 bg-blend-multiply border-b-1 border-white/20">
      <div className="relative isolate">
        <div className="z-10 mt-3 md:mt-0 flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded bg-creator-gradient font-bold">
          {index + 1}
        </div>
        <img
          src={raffle.metadata.logoUrl}
          alt="Raffle Image"
          className="absolute inset-0 object-contain rounded-full max-h-12 aspect-square left-4 -z-10"
        />
      </div>
      <div className="md:col-span-5 col-span-7 py-2">
        <h4 className="font-bold text-sm md:text-base">{raffle.projectName}</h4>
        <div className="flex flex-col sm:items-center sm:flex-row sm:space-x-4 text-xs">
          {/* <div>
            <span>Winners</span> <strong className="font-semibold">25.6M</strong>
          </div> */}
          <div className="space-x-2">
            <span>
              Participants (Unique):{" "}
              <span className="font-bold">{raffle.participants.length}</span>{" "}
              Finished
            </span>
            {moment(raffle.raffleDetails.endDate).isAfter(moment()) && (
              <span className="p-1 bg-white font-semibold text-black rounded">
                Finished
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRaffle;
