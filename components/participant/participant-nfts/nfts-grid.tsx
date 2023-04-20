import { useAppSelector } from "store";
import NFTCard from "./nft-card";
import NFTsGridHeader from "./nfts-grid-header";

const NFTsGrid = () => {
  const filteredNFTs = useAppSelector((state) => state.nfts.filteredNFTs);
  return (
    <div>
      <NFTsGridHeader />
      <div className="max-h-[60vh] bg-nfts-gradient scrollable p-4 border-gray-500/40 rounded border-1">
        <div className="grid grid-cols-3 gap-8">
          {filteredNFTs.map((nft) => (
            <NFTCard key={nft._id} nft={nft} />
          ))}
          {filteredNFTs.length === 0 && (
            <div className="w-full col-span-3">
              <p className="text-center text-gray-300">No NFTs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTsGrid;
