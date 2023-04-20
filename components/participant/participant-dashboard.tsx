import { AccountCard, AccountTokenCard } from "components/shared";
import NFTsGrid from "./participant-nfts";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const ParticipantDashboard: FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-8 mx-auto mt-24 w-fit">
      <div className="flex items-center col-span-2 lg:col-span-1">
        <h1 className="text-3xl font-extrabold">
          Raffle<span className="font-light">master</span>
        </h1>
      </div>
      <div className="grid col-span-2 lg:col-span-1 md:grid-cols-2 gap-7">
        <AccountTokenCard />
        <AccountCard />
      </div>
      <div className="col-span-2 space-y-8 overflow-hidden mb-12">
        {children}
      </div>

      {/* <div className="col-span-2 mt-12 mb-32 text-xs text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        vitae mi eget nisi placerat commodo. In viverra orci eu eleifend
        feugiat. Vivamus est nibh, pulvinar a diam eu, fringilla commodo turpis.{" "}
      </div> */}
    </div>
  );
};

export default ParticipantDashboard;
