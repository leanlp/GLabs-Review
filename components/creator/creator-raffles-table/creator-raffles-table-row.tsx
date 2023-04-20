import Image from "next/image";
import { TRaffle } from "types";
import { FC } from "react";
import moment from "moment";
import {
  FaEthereum,
  FaTrash,
  FaCopy,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import VerificationLink from "./verification-link";
import { weiToEth } from "utils/weiToEth";

interface ICreatorRafflesTableRowProps {
  raffle: TRaffle;
}

const CreatorRafflesTableRow: FC<ICreatorRafflesTableRowProps> = ({
  raffle,
}) => {
  return (
    <div className="min-w-[1100px] grid grid-cols-12 gap-y-3 gap-x-0 py-2 bg-row-gradient bg-blend-multiply border-b-1 border-gray-600/40">
      <div className="relative isolate aspect-square max-h-16">
        <div className="z-20 absolute top-0 flex items-center justify-center w-6 h-6 rounded bg-creator-gradient">
          <FaEthereum className="text-sm" />
        </div>
        <img
          src={raffle.metadata.logoUrl}
          alt="Raffle Image"
          className="object-contain rounded-full -z-10 col-span-1"
        />
      </div>
      <div className="col-span-3 py-2">
        <h4 className="font-bold">{raffle.projectName}</h4>
        <div className="flex flex-col text-sm sm:items-center sm:flex-row sm:space-x-4">
          <div className="">
            <span className=" text-xs">
              Started on{" "}
              {moment(raffle.raffleDetails.startDate).format("MMMM DD")} and
              ends on {moment(raffle.raffleDetails.endDate).format("MMMM DD")}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-2 py-2 px-4">
        <span className="block">
          WL Price:
          <span className=" font-semibold">
            {" "}
            {weiToEth(raffle.mintDetails.whitelistMintPrice) || 0} ETH
          </span>
        </span>
        <span className="block">
          Public Price:
          <span className=" font-semibold">
            {" "}
            {weiToEth(raffle.mintDetails.publicMintPrice) || 0} ETH
          </span>
        </span>
      </div>
      <div className="col-span-2 py-2 px-4">
        <span className="block">
          Participants:
          <span className=" font-semibold">
            {" "}
            {raffle.participants?.length || 0}
          </span>
        </span>
        <span className="block">
          Winners:
          <span className=" font-semibold">
            {" "}
            {raffle.raffleDetails?.numberOfWinners || 0}
          </span>
        </span>
        <span className="block">
          Supply:
          <span className="font-semibold">
            {" "}
            {raffle.raffleDetails?.supply || 0}
          </span>
        </span>
      </div>
      <div className="col-span-2 py-2 px-4">
        <span className="block font-semibold">Verification:</span>
        <span className="flex gap-2 flex-wrap">
          {raffle.entryTasks?.twitterFollow?.map((twitterFollow) => (
            <VerificationLink
              key={twitterFollow}
              site="twitter"
              link={twitterFollow}
            />
          ))}
          {raffle.entryTasks?.twitterLike?.map((twitterLike) => (
            <VerificationLink
              key={twitterLike}
              site="twitter"
              link={twitterLike}
            />
          ))}
          {raffle.entryTasks?.twitterRetweet?.map((twitterRetweet) => (
            <VerificationLink
              key={twitterRetweet}
              site="twitter"
              link={twitterRetweet}
            />
          ))}
          {raffle.entryTasks?.discordServerFollow?.map(
            (discordServerFollow) => (
              <VerificationLink
                key={discordServerFollow}
                site="discord"
                link={discordServerFollow}
              />
            )
          )}
        </span>
      </div>
      <div className="flex items-center justify-end col-span-2">
        <button
          type="button"
          className="px-4 py-1 font-semibold rounded bg-creator-gradient h-8"
        >
          View
        </button>
        <button
          title="Delete"
          type="button"
          className="px-4 py-1 font-semibold rounded bg-creator-gradient h-8 mx-2"
        >
          <FaTrash />
        </button>
        <button
          title="Copy"
          type="button"
          className="px-4 py-1 font-semibold rounded bg-creator-gradient h-8"
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default CreatorRafflesTableRow;
