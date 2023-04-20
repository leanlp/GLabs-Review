import { AiOutlineEye } from "react-icons/ai";
import { FC, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { Tooltip } from "@mui/material";

interface IWalletRowProps {
  walletAddress: string;
  selected?: boolean;
  onClick: (wallet: string) => void;
}

const WalletRow: FC<IWalletRowProps> = ({
  walletAddress,
  selected,
  onClick,
}) => {
  const [showAddress, setShowAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleShowAddress = () => {
    setShowAddress((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      className={`flex duration-150 items-center space-x-2 hover:bg-wallet-bg ${
        selected ? "bg-wallet-bg" : ""
      }`}
      onClick={() => onClick(walletAddress)}
    >
      <div className="w-6 h-6 bg-white rounded-full"></div>
      <div className="flex flex-col">
        <div className="space-x-2 flex items-center overflow-hidden">
          <span className="text-xs whitespace-pre-wrap w-full">
            {showAddress ? walletAddress : walletAddress.slice(0, 8) + "****"}
          </span>
          <Tooltip title={copied ? "copied" : "copy address"}>
            <span
              aria-label="copy address"
              onClick={copyToClipboard}
              role="button"
              className="text-sm hover:ring-1 hover:ring-white/50 hover:bg-white/10 hover:rounded-full p-1"
            >
              <BiCopy />
            </span>
          </Tooltip>
        </div>
      </div>
    </button>
  );
};

export default WalletRow;
