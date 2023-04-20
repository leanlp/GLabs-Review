import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import {
  FaDiscord,
  FaEthereum,
  FaMedal,
  FaTwitter,
  FaUserCheck,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import moment from "moment";
import { ExternalLink } from "components/shared";
import { useAppDispatch, useAppSelector } from "store";
import { setSelectedRaffleId } from "store/features/raffles.slice";
import EnterRaffleForm from "./enter-raffle-form";
import RafflesCountdown from "./raffles-countdown";
import { TRaffle } from "types";

interface RaffleDetailsProps {
  raffle: TRaffle;
}

const RaffleDetails: FC<RaffleDetailsProps> = ({ raffle }) => {
  const [isEnterDialogOpen, setIsEnterDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isNextRaffleExist = useAppSelector(
    (state) => state.raffles.isNextRaffleExist
  );
  const isPreviousRaffleExist = useAppSelector(
    (state) => state.raffles.isPrevRaffleExist
  );

  const allRaffles = useAppSelector((state) => state.raffles.raffles);
  // console.log(allRaffles);
  const router = useRouter();
  const handleBackClick = () => {
    dispatch(setSelectedRaffleId(undefined));
    router.push("/participant");
  };

  const handleRaffleNavigationClick = (type: "next" | "prev") => {
    const raffleIndex = allRaffles.findIndex((raffle) => raffle._id);
    let raffleId = "";
    if (type === "prev") {
      raffleId = allRaffles[raffleIndex - 1]?._id;

      if (raffleId && raffleIndex > 0) {
        dispatch(setSelectedRaffleId(raffleId));
        router.push(`/participant/raffles/${raffleId}`);
      }
    }
    if (type === "next") {
      raffleId = allRaffles[raffleIndex + 1]?._id;
      if (raffleId && raffleIndex < allRaffles.length - 1) {
        dispatch(setSelectedRaffleId(raffleId));
        router.push(`/participant/raffles/${raffleId}`);
      }
    }
  };

  const toggleOpenEnterDialog = () => {
    setIsEnterDialogOpen((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <button
        title="back to raffles"
        type="button"
        className="flex items-center space-x-2"
        onClick={handleBackClick}
      >
        <span>
          <IoArrowBackOutline className="text-2xl" />
        </span>
        <span className="font-bold">Back to Raffles</span>
      </button>
      {raffle.metadata.bannerUrl && (
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          <img
            src={raffle.metadata.bannerUrl}
            className="object-cover w-full h-full"
            alt="raffle background"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="p-2 rounded bg-participant-light">
            <FaEthereum className="text-xl" />
          </span>
          <h3 className="font-bold">Ethereum Network</h3>
        </div>
        <ul className="flex items-center space-x-4">
          <li className="flex items-center justify-center h-8 p-2 duration-150 rounded bg-gray-500/60 hover:bg-gray-400/70">
            <ExternalLink
              name={raffle.metadata.links.website || ""}
              href={raffle.metadata.links.website || "#"}
            >
              {raffle.metadata.links.website.split("https://") || ""}
            </ExternalLink>
          </li>
          {/* <li className="h-8 p-2 rounded bg-gray-500/60">
            <ExternalLink
              name="bayc.io"
              href="https://etherscan.io/address/0x0"
            >
              <FaDiscord />
            </ExternalLink>
          </li> */}
          <li className="h-8 p-2 duration-150 rounded bg-gray-500/60 hover:bg-gray-400/70">
            <ExternalLink
              name={raffle.metadata.links.twitter || ""}
              href={raffle.metadata.links.twitter || ""}
            >
              <FaTwitter />
            </ExternalLink>
          </li>
          <li className="h-8 p-2 duration-150 rounded bg-gray-500/60 hover:bg-gray-400/70">
            <ExternalLink
              name={raffle.metadata.links.discord || ""}
              href={raffle.metadata.links.discord || ""}
            >
              <FaDiscord />
            </ExternalLink>
          </li>
          {/* <li className="h-8 p-2 rounded bg-gray-500/60">
            <ExternalLink name="by.io" href="https://etherscan.io/address/0x0">
              <FaTelegramPlane />
            </ExternalLink>
          </li> */}
        </ul>
      </div>
      <div>
        <p>{raffle.metadata.description}</p>
      </div>

      <div className="py-6 bg-row-gradient border-y-1 border-gray-500/50">
        {raffle?.raffleDetails?.endDate &&
        moment(raffle.raffleDetails.endDate).isSameOrAfter(moment()) ? (
          <RafflesCountdown date={raffle.raffleDetails.endDate || ""} />
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold">Raffle Ended</h3>
          </div>
        )}
        <div className="flex justify-between w-full mt-5">
          <div className="flex align-baseline">
            <FaMedal className="self-center mr-2 text-2xl text-participant-light" />
            <span className="self-center text-base font-bold ">
              {raffle.raffleDetails.numberOfWinners} Winners
            </span>
          </div>
          {/* <div className="flex">
            <FaUserCheck className="self-center mr-2 text-2xl text-participant-light" />
            <span className="self-center text-base font-bold ">
              {raffle.participants.length} Participants
            </span>
          </div> */}
          <div className="flex">
            <button
              onClick={toggleOpenEnterDialog}
              type="button"
              className="px-4 py-1 font-semibold rounded bg-participate-gradient"
            >
              {isEnterDialogOpen ? "Close" : "Enter"}
            </button>
          </div>
        </div>
      </div>
      {isEnterDialogOpen && <EnterRaffleForm onClose={toggleOpenEnterDialog} />}
      {allRaffles.length > 1 && (
        <div className="flex items-center justify-between space-x-8">
          <button
            onClick={() => handleRaffleNavigationClick("prev")}
            title="Previous Raffle"
            type="button"
            className="flex items-center space-x-2 min-w-max disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!isPreviousRaffleExist}
          >
            <span>
              <IoArrowBackOutline className="text-2xl" />
            </span>
            <span className="font-bold">Previous Raffle</span>
          </button>
          <button
            onClick={() => handleRaffleNavigationClick("next")}
            title="Next Raffle"
            type="button"
            className="flex items-center space-x-2 min-w-max disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!isNextRaffleExist}
          >
            <span className="font-bold">Next Raffle</span>
            <span>
              <IoArrowForwardOutline className="text-2xl" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RaffleDetails;
