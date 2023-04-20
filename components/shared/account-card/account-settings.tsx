import { HiFire, HiX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "store";
import WalletRow from "./wallet-row";
import { SiTwitter, SiDiscord } from "react-icons/si";
import { FC, useState, useEffect, useId } from "react";
import { useOAuth } from "hooks/useOAuth";
import AddWalletDialog from "../add-wallet-dialog";
import { setUser } from "store/features/user.slice";
import { useUpdateUserWalletsMutation } from "store/features/api.slice";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../loading-spinner";

interface IAccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: FC<IAccountSettingsProps> = ({ onClose }) => {
  const toastId = useId();
  const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { login } = useOAuth();
  const userType = useAppSelector((state) => state.user.userType);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const closeSettings = () => {
    onClose();
  };
  const [updateUser, updateUserQuery] = useUpdateUserWalletsMutation();

  const toggleAddWalletDialog = () => {
    setAddWalletDialogOpen((prev) => !prev);
  };

  const handleConfirmPreferredWallet = () => {
    if (!user) {
      toast.error("please connect your wallet", {
        id: toastId,
      });
      return;
    }
    if (selectedWallet) {
      updateUser({
        primaryWallet: user.primaryWallet,
        mintWallets: user.mintWallets,
        preferredMintWallet: selectedWallet,
      });
    }
  };

  const handleSelectWallet = (wallet: string) => {
    if (wallet === user?.preferredMintWallet) {
      setSelectedWallet(null);
    } else {
      setSelectedWallet(wallet);
    }
  };

  useEffect(() => {
    if (updateUserQuery.isSuccess && selectedWallet) {
      dispatch(
        setUser({
          preferredMintWallet: selectedWallet,
        })
      );
      setSelectedWallet(null);
    }
  }, [updateUserQuery.isSuccess, selectedWallet, dispatch, toastId]);

  useEffect(() => {
    return () => {
      setSelectedWallet(null);
    };
  }, []);

  return (
    <div
      className={`relative z-30 px-5 py-4 rounded isolate space-y-4 ${
        userType === "Participant"
          ? "bg-participate-gradient"
          : "bg-creator-gradient"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <button
          onClick={closeSettings}
          title="close"
          type="button"
          className="text-white"
        >
          <HiX className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-extrabold">Manage</h2>
      </div>

      <div className="flex items-center justify-end space-x-2 text-sm">
        <button type="button" className="">
          Hot Wallet
        </button>
        <span>|</span>
        <button
          onClick={toggleAddWalletDialog}
          type="button"
          className="underline"
        >
          Add Wallet
        </button>
      </div>

      <p className="text-xs">Select your preferred “Hot Wallet”</p>

      <div className="flex flex-col space-y-2">
        <WalletRow
          onClick={handleSelectWallet}
          selected={
            selectedWallet
              ? selectedWallet === user?.primaryWallet
              : user?.primaryWallet === user?.preferredMintWallet
          }
          walletAddress={user?.primaryWallet || ""}
        />
        {user?.mintWallets && (
          <>
            {user?.mintWallets.map((wallet) => (
              <WalletRow
                onClick={handleSelectWallet}
                selected={
                  selectedWallet
                    ? selectedWallet === wallet
                    : wallet === user?.preferredMintWallet
                }
                walletAddress={wallet}
                key={wallet}
              />
            ))}
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selectedWallet || updateUserQuery.isLoading}
          type="button"
          className="font-bold border-2 border-white/20 px-2 py-1 duration-150 rounded hover:bg-white/20 bg-white/10 disabled:bg-white/0 disabled:hover:bg-white/0 disabled:text-white/50"
          onClick={handleConfirmPreferredWallet}
        >
          {updateUserQuery.isLoading ? "loading..." : "Confirm"}
        </button>
      </div>

      <div className="flex flex-col space-y-2 text-xs">
        <button
          disabled={Object.keys(user?.twitter || {}).length > 0}
          onClick={() => login("twitter")}
          type="button"
          className={`flex items-center space-x-2
          ${
            Object.keys(user?.twitter || {}).length > 0
              ? "no-underline"
              : "text-white"
          }
          `}
        >
          <SiTwitter />
          <span className="font-light">
            {Object.keys(user?.twitter || {}).length > 0
              ? user?.twitter?.oAuth.data.username
              : "Connect Twitter"}
          </span>
        </button>

        <button
          disabled={Object.keys(user?.discord || {}).length > 0}
          onClick={() => login("discord")}
          type="button"
          className="flex items-center space-x-2"
        >
          <SiDiscord />
          <span className="font-light">
            {Object.keys(user?.discord || {}).length > 0
              ? user?.discord?.oAuth?.username!
              : "Connect Discord"}
          </span>
        </button>
      </div>

      <div className="absolute w-full -z-10 -left-16 -bottom-8">
        <HiFire className="w-full h-full text-black/5" />
      </div>
      <AddWalletDialog
        open={addWalletDialogOpen}
        onClose={() => setAddWalletDialogOpen(false)}
      />
    </div>
  );
};

export default AccountSettings;
