import { FaHeart, FaHeartBroken } from "react-icons/fa";
import SortButton from "components/shared/SortButton";
import { useAppDispatch, useAppSelector } from "store";
import { filterNFTs } from "store/features/nfts.slice";
import getTotalLoyalty from "utils/loyalty";

const NFTsGridHeader = () => {
  const nfts = useAppSelector((state) => state.nfts.nfts);
  const listedCount = nfts.filter((nft) => nft.status === "Listed").length;
  const delistedCount = nfts.filter((nft) => nft.status === "Delisted").length;
  const filterName = useAppSelector((state) => state.nfts.filter);

  const dispatch = useAppDispatch();
  console.log(nfts)

  const handleFilterClick = (type: "all" | "listed" | "delisted") => {
    dispatch(filterNFTs(type));
  };
  
  const totalLoyaltyPoints = getTotalLoyalty(nfts);

  return (
    <div className="mt-2 mb-3 space-y-4">
      <div className="flex items-end space-x-4">
        <h3 className="text-3xl font-extrabold">NFTs</h3>
        <div className="">
          You Own{" "}
          <span className="font-bold text-participant-light">
            {nfts.length}
          </span>{" "}
          NFT
        </div>
        {delistedCount > 0 && (
          <div className="flex items-center space-x-1 font-semibold">
            <FaHeart className="text-participant-light" />
            <span className="text-participant-light">{delistedCount}</span>
            <span>Delisted</span>
          </div>
        )}
        {listedCount > 0 && (
          <div className="flex items-center space-x-1 font-semibold">
            <FaHeartBroken className="text-participant-light" />
            <span className="text-participant-light">{listedCount}</span>
            <span>Listed</span>
          </div>
        )}
        {totalLoyaltyPoints > 0 && (
          <div className="flex items-center space-x-1 font-semibold">
            <FaHeart className="text-participant-light" />
            <span className="text-participant-light">{totalLoyaltyPoints}</span>
            <span>Loyalty Points</span>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-x-3">
        <div className="flex space-x-2">
          <span>Show</span>
          <SortButton
            active={filterName === "all"}
            onClick={() => handleFilterClick("all")}
          >
            All
          </SortButton>
          <span>|</span>
          <SortButton
            active={filterName === "listed"}
            onClick={() => handleFilterClick("listed")}
          >
            Only Listed
          </SortButton>
          <span>|</span>
          <SortButton
            active={filterName === "delisted"}
            onClick={() => handleFilterClick("delisted")}
          >
            Only Delisted
          </SortButton>
        </div>
        <div className="flex space-x-2">
          <span>Sort by:</span>
          <SortButton
            showArrow
            active={false}
            direction="desc"
            onClick={() => {}}
          >
            Date
          </SortButton>
          <span>|</span>
          <SortButton
            showArrow
            active={true}
            direction="asc"
            onClick={() => {}}
          >
            Yield
          </SortButton>
        </div>
      </div>
    </div>
  );
};

export default NFTsGridHeader;
