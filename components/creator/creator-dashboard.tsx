import { AccountCard, AccountTokenCard } from "components/shared";

import CreatorAnalytics from "./creator-analytics/index";
import { FC, ReactNode } from "react";
import Link from "next/link";

interface CreatorDashboardProps {
  children?: ReactNode;
  showBottomSection?: boolean;
}

const CreatorDashboard: FC<CreatorDashboardProps> = ({
  children,
  showBottomSection,
}) => {
  return (
    <div className="grid grid-cols-2 gap-8 w-fit mx-auto mt-24">
      <div className="col-span-2 lg:col-span-1 flex items-center">
        <h1 className="text-3xl font-extrabold">
          Raffle<span className="font-light">master</span>
        </h1>
      </div>
      <div className="col-span-2 lg:col-span-1 grid md:grid-cols-2 gap-7">
        <AccountTokenCard />
        <AccountCard />
      </div>
      <div className="col-span-2">{children}</div>
      {showBottomSection && (
        <>
          <div className="col-span-2">
            <div className="flex flex-col md:flex-row gap-2">
              <h3 className="font-bold flex items-center">
                Want to add another Raffle?
              </h3>
              <Link
                href="/creator/raffles/create"
                className=" bg-creator-gradient px-5 rounded py-1 font-bold"
              >
                Add New Raffle
              </Link>
            </div>
          </div>
          <div className="col-span-2 mb-12 lg:mb-0">
            <CreatorAnalytics />
          </div>
          <div className="col-span-2 text-center text-xs mt-12 mb-32">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            vitae mi eget nisi placerat commodo. In viverra orci eu eleifend
            feugiat. Vivamus est nibh, pulvinar a diam eu, fringilla commodo
            turpis.{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorDashboard;
