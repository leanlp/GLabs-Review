import { Dialog } from "@mui/material";
import { FC, useRef, useId, useEffect } from "react";
import { useUpdateUserWalletsMutation } from "store/features/api.slice";
import { useAppSelector } from "store";
import { toast } from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import { IoClose } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface AddWalletDialogProps {
  open: boolean;
  onClose: () => void;
}
const AddWalletDialog: FC<AddWalletDialogProps> = ({ open, onClose }) => {
  const user = useAppSelector((state) => state.user.user);
  const toastId = useId();
  const [updateUserWallets, updateUserWalletsQuery] =
    useUpdateUserWalletsMutation();
  const methods = useForm({
    defaultValues: {
      wallet: "",
      useAsPreferred: false,
    },
  });

  const handleConfirm = (data: { wallet: string; useAsPreferred: boolean }) => {
    const { wallet, useAsPreferred } = data;
    const modifiedWallet = wallet.trim().toLowerCase();
    if (!user) {
      toast.error("please connect your wallet", {
        id: toastId,
      });
      return;
    }
    updateUserWallets({
      primaryWallet: user.primaryWallet,
      mintWallets: [...user.mintWallets, modifiedWallet],
      preferredMintWallet: useAsPreferred
        ? modifiedWallet
        : user.preferredMintWallet || user.primaryWallet,
    });
    toast.loading("adding wallet...", {
      id: toastId,
    });
  };

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  useEffect(() => {
    if (updateUserWalletsQuery.data) {
      toast.success("wallet added!", {
        id: toastId,
      });
      onClose();
    }

    if (updateUserWalletsQuery.error) {
      toast.error("something went wrong", {
        id: toastId,
      });
    }
  }, [
    updateUserWalletsQuery.data,
    updateUserWalletsQuery.error,
    onClose,
    toastId,
  ]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form
        onSubmit={methods.handleSubmit(handleConfirm)}
        className={`p-4 flex flex-col space-y-4 min-w-[450px] ${
          user?.type === "Participant"
            ? "bg-participate-gradient"
            : "bg-creator-gradient"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-3xl">Add Wallet</h3>
          <button
            className="p-1 hover:bg-white/20 duration-200 outline-none border-none rounded-full"
            title="close"
            type="button"
            onClick={handleClose}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <TextField
          variant="filled"
          InputProps={{
            className: "bg-black/50 rounded-md",
          }}
          label="Wallet Address"
          size="small"
          type="text"
          error={!!methods.formState.errors.wallet}
          helperText={methods.formState.errors.wallet?.message}
          {...methods.register("wallet", {
            required: true,
            validate: (value) => {
              if (
                user?.primaryWallet === value.toLowerCase() ||
                user?.mintWallets?.includes(value.toLowerCase())
              ) {
                return "Wallet already added";
              }
              if (!/^(0x)?[0-9a-f]{40}$/i.test(value)) {
                return "Invalid wallet address";
              }
              return true;
            },
          })}
        />
        <div>
          <Controller
            name="useAsPreferred"
            control={methods.control}
            render={({ field }) => <Checkbox {...field} color="default" />}
          />
          <span className="text-sm">Use as your Preferred Wallet</span>
        </div>
        <button
          className="p-2 rounded border-2 border-white/20 hover:bg-white/20 duration-200 outline-none ml-auto"
          type="submit"
          disabled={updateUserWalletsQuery.isLoading}
        >
          {updateUserWalletsQuery.isLoading ? "Adding..." : "Add Wallet"}
        </button>
      </form>
    </Dialog>
  );
};

export default AddWalletDialog;
