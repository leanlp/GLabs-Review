import { useWeb3Modal } from "@web3modal/react";
import { ExternalLink } from "components/shared";
import { SOCIAL_LINKS } from "data/social_links";
import { useAccount } from "wagmi";
import { useUser } from "hooks/useUser";

const WelcomePage = () => {
  const { open, isOpen } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { loading } = useUser(address || "");
  const handleConnectButtonClick = () => {
    open();
  };

  return (
    <div className="page items-center justify-center space-y-10">
      <div className="mt-16">
        <h1 className="text-5xl font-bold">
          Raffle<span className="font-light">master</span>
        </h1>
        <p className="text-end">
          by <strong>stable</strong>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5349CB] to-[#4A91DA]">
            strategies
          </span>
        </p>
      </div>
      <p className="text-xl max-w-md text-center">
        To participate in or create a Raffle please connect your wallet to get
        started.
      </p>
      <div className="space-y-4 p-8 text-xl bg-black/60 rounded text-center">
        {/* <div>Select Mode</div>
        <div>
          <button
            onClick={() => handleUserTypeChange("Creator")}
            type="button"
            className={`${
              userType === "Creator"
                ? "font-bold"
                : "hover:underline font-extralight"
            }`}
          >
            Creator
          </button>{" "}
          /{" "}
          <button
            type="button"
            className={`${
              userType === "Participant"
                ? "font-bold"
                : "hover:underline font-extralight"
            }`}
            onClick={() => handleUserTypeChange("Participant")}
          >
            Participant
          </button>
        </div> */}
        <button
          onClick={handleConnectButtonClick}
          type="button"
          className="bg-gradient-to-r from-[#5349CB] to-[#4A91DA] text-white font-normal py-2 px-4 rounded hover:opacity-80 transition-opacity focus:outline-none focus:outline-[#5349CB]"
        >
          {isOpen || loading || isConnected
            ? "Connecting..."
            : "Connect Wallet"}
        </button>
      </div>

      <footer className="space-y-4">
        <div className="text-3xl flex justify-center space-x-4 mt-24">
          {SOCIAL_LINKS.map(({ name, url, Icon }) => (
            <ExternalLink key={name} name={name} href={url}>
              <Icon />
            </ExternalLink>
          ))}
        </div>
        <p className="text-center">
          © 2022 Stable Strategies | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
