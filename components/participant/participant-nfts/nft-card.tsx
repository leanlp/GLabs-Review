import Image from "next/image"
import { FC } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { TNft } from "types";

const NFTCard: FC<{
  nft: TNft;
}> = ({ nft }) => {
  // get random number between 1 and 3 - only for demo purposes
  // const random = Math.floor(Math.random() * 3) + 1;
  return (
    <div className="space-y-2 font-semibold isolate">
      <p>{nft.metadata.name}</p>
      <div className="relative w-full aspect-square">
        <img
          src={nft.resizedImageUrl}
          alt="NFT Image"
          className="object-contain -z-10"
        />
        <button
          type="button"
          className="absolute p-2 rounded-lg bg-participate-gradient -bottom-5 right-2"
          title={nft.status}
        >
          {nft.status === "Delisted" ? (
            <FaHeart className="text-lg" />
          ) : (
            <FaHeartBroken className="text-lg" />
          )}
        </button>
      </div>
      <div className="uppercase">
        <div>
          {nft.status === "Listed" ? (
            <span>Listed</span>
          ) : (
            <span className="text-participant-light">Delisted</span>
          )}
        </div>
        <div className="relative w-fit">
          10 LP{" "}
          <span className="font-extralight">
            {nft.status === "Delisted" ? "/day" : ""}
          </span>
            {nft.status === "Listed" && (
            <Image
              src="/images/line-through.svg"
              alt="Line Through"
              fill={true}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
