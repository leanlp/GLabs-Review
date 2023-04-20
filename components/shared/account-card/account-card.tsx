import { FC, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import AccountSettings from "./account-settings";
import { Fade } from "components/shared/transitions";
import { useAppSelector } from "../../../store/index";
import { useAccount } from "wagmi";
import AddWalletDialog from "../add-wallet-dialog";

interface IAccountCardProps {}

const AccountCard: FC<IAccountCardProps> = () => {
  const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
  const userType = useAppSelector((state) => state.user.userType);
  const user = useAppSelector((state) => state.user.user);
  const { address, isConnected } = useAccount();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen((current) => !current);
  };

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden px-5 py-4 border-gray-500/40 rounded-md border-1 text-right
          ${
            userType === "Participant"
              ? "bg-participate-gradient"
              : "bg-creator-gradient"
          }`}
      >
        <div
          className={`absolute pointer-events-none w-full h-full 
            ${userType === "Creator" ? "-top-4 -left-16" : " top-8 -left-12"}
            `}
        >
          {userType === "Participant" ? (
            <RiUserFollowFill className="text-black/5 w-full h-full" />
          ) : (
            <MdModeEdit className="text-black/5 w-full h-full" />
          )}
        </div>
        <div>
          <span className=" text-3xl font-bold">
            {userType === "Participant" ? "Participant" : "Creator"}
          </span>
        </div>
        <div className="mt-2 flex justify-end">
          <div className=" h-6 flex items-center mr-1">
            <FaWallet />
          </div>
          {user?.primaryWallet && `${user?.primaryWallet?.slice(0, 8)}***`}
        </div>
        <div className="text-sm">
          <button
            onClick={() => setAddWalletDialogOpen(true)}
            type="button"
            className="underline"
          >
            Add Wallet(s)
          </button>
          <span className="mx-3">|</span>
          <button onClick={toggleSettings} type="button" className="underline">
            Manage
          </button>
        </div>
      </div>
      <div className="absolute w-full z-30 mt-2 left-0">
        <Fade show={isSettingsOpen}>
          <AccountSettings onClose={toggleSettings} />
        </Fade>
      </div>
      <AddWalletDialog
        open={addWalletDialogOpen}
        onClose={() => setAddWalletDialogOpen(false)}
      />
    </div>
  );
};

export default AccountCard;
