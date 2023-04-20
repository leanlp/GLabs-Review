import { FC } from "react";
import { FaEthereum } from "react-icons/fa";
import { useAppDispatch } from "store";
import { setSelectedRaffleId } from "store/features/raffles.slice";
import { TRaffle } from "types";
import { useCountDown } from "hooks/useCountDown";
import { useRouter } from "next/router";

interface RafflesTableRowProps {
  raffle: TRaffle;
}

const RafflesTableRow: FC<RafflesTableRowProps> = ({ raffle }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelectRaffle = () => {
    dispatch(setSelectedRaffleId(raffle._id));
    router.push(`/participant/raffles/${raffle._id}`);
  };

  const countDown = useCountDown(raffle.raffleDetails.endDate);

  return (
    <div className="grid items-center grid-cols-8 gap-4 py-2 md:grid-cols-6 bg-row-gradient bg-blend-multiply border-b-1 border-gray-600/40">
      <div className="relative max-h-12 isolate aspect-square">
        <div className="z-10 flex items-center justify-center w-4 h-4 mt-3 rounded md:mt-0 md:w-6 md:h-6 bg-participate-gradient">
          <FaEthereum className="text-xs md:text-sm" />
        </div>
        <img
          src={raffle.metadata.logoUrl}
          alt="Raffle Image"
          className="absolute inset-0 object-contain rounded-full max-h-12 aspect-square left-4 -z-10"
        />
      </div>
      <div className="col-span-5 py-2 md:col-span-4">
        <h4 className="text-sm font-bold md:text-base">{raffle.projectName}</h4>
        <div className="flex flex-col text-sm sm:items-center sm:flex-row sm:space-x-4">
          <div className="font-semibold">
            <span>{raffle.raffleDetails?.numberOfWinners || 0}</span> <span>Winners</span>
          </div>
          <div className="font-semibold">
            <span>{raffle.raffleDetails?.supply || 0}</span> <span>Supply</span>
          </div>
          <div>
            Ends in:{" "}
            <span className="text-sm md:text-base">
              <strong className="font-bold">{countDown.days}</strong>d :
            </span>{" "}
            <span className="text-sm md:text-base">
              <strong className="font-bold"> {countDown.hours}</strong>h :
            </span>{" "}
            <span className="text-sm md:text-base">
              <strong className="font-bold"> {countDown.minutes}</strong>m :
            </span>{" "}
            <span className="text-sm md:text-base">
              <strong className="font-bold"> {countDown.seconds}</strong>s
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center py-2">
        <button
          onClick={handleSelectRaffle}
          type="button"
          className="px-4 py-1 font-semibold rounded bg-participate-gradient"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default RafflesTableRow;
