import Link from "next/link";
import { useAppSelector } from "store";
import config from "config";

const { APP_ROUTES } = config;

const AccountTokenCard = () => {
  const userType = useAppSelector((state) => state.user.userType);
  const basicAnalytics = useAppSelector(
    (state) => state.creator.basicAnalytics
  );

  if (userType === "Participant") return <div />;
  return (
    <div className="bg-nfts-gradient px-5 py-4 border-gray-500/40 rounded-md border-1 text-left flex flex-col justify-between">
      <div>
        <span className="text-3xl font-bold">
          {basicAnalytics?.totalLoyaltyPoints}
        </span>
        <span className="uppercase ml-2 text-3xl">LP</span>
      </div>
      {/* <div className="mt-2">
        <span
          className={`${
            userType === "Creator"
              ? "text-creator-light"
              : "text-participant-light"
          } font-semibold`}
        >
          25.65 LP
        </span>
        /day
      </div> */}
      <div className="text-sm">
        <Link
          href={APP_ROUTES.creator.analytics}
          type="button"
          className="underline"
        >
          Full Analytics
        </Link>
        {/* <span className="ml-3 mr-3">|</span>
        <button type="button" className="underline">
          Settings
        </button> */}
      </div>
    </div>
  );
};

export default AccountTokenCard;
