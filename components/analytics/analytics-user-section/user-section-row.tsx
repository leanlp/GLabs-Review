import { ExternalLink } from "components/shared";
import { FC } from "react";
import { FaDiscord, FaHeart, FaHeartBroken, FaTwitter } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { TUser } from "types";
import getTotalLoyalty from "utils/loyalty";
const { DATA } = require("../../../config").default;

interface UserSectionRowProps {
  user: TUser;
  index: number;
}

const UserSectionRow: FC<UserSectionRowProps> = ({ user, index }) => {
    console.log(user)
  return (
    <div className="rounded-lg space-y-4 p-4 bg-nfts-gradient border-1 border-gray-600/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold p-1 bg-creator-light text-sm flex items-center justify-center w-6 h-6 rounded-lg">
              {index + 1}
            </span>
            <h6 className="text-xl font-extrabold pr-2">
              {user.discord?.oAuth?.username ??
                user.twitter?.oAuth.data.name ??
                user.primaryWallet.slice(0, 15) + " ..." }
            </h6>
          </div>
          <div className="flex items-center space-x-2">
            {user.discord?.oAuth && (
              <ExternalLink
                href={`https://discord.com/users/${user.discord.oAuth.id}`}
                name="discord"
              >
                <FaDiscord />
              </ExternalLink>
            )}
            {user.twitter?.oAuth && (
              <ExternalLink
                href={`https://twitter.com/${user.twitter.oAuth.data.username}`}
                name="twitter"
              >
                <FaTwitter />
              </ExternalLink>
            )}
          </div>
        </div>
        <div className="font-semibold text-sm flex space-x-3">
          {/* <div className="flex space-x-1 items-center">
            <span className="text-creator-light">
              <GiPodiumWinner />
            </span>
            <span className="text-creator-light">14</span>
            <span>victories</span>
          </div> */}
          <div className="flex space-x-1 items-center">
            <span className="text-creator-light">
              {user.raffleEntries.length}
            </span>
            <span>entries</span>
          </div>
          {/* <div className="flex space-x-1 items-center">
            <span className="text-creator-light">5678</span>
            <span>site visits</span>
          </div> */}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <strong className="font-semibold mr-1">{getTotalLoyalty(user.nfts)}</strong>
          LP ({user.nfts.length * 86400 / DATA.loyaltyPointSeconds } LP per day)
        </div>
        <div className="flex items-center">
          <strong className="font-semibold mr-1">{user.nfts.length}</strong> NFT
          {user.nfts.length > 1 && "s"}
          {user.nfts.length > 0 && (
            <>
              (
              <span>
                <FaHeart />
              </span>
              {user.nfts.filter((nft) => nft.status === "Listed").length}{" "}
              <span className="ml-2">
                <FaHeartBroken />
              </span>
              {user.nfts.filter((nft) => nft.status === "Delisted").length})
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSectionRow;
