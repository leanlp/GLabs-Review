import { ExternalLink } from "components/shared";
import { FC, useState } from "react";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { TUser } from "types";
import { Tooltip } from "@mui/material";
import { GiPodiumWinner } from "react-icons/gi";

interface CreatorParticipantRowProps {
  win: boolean;
  participant: TUser;
  raffleId: string;
  winnerChosen: boolean;
  selectedRaffleId: string;
}

const CreatorParticipantRow: FC<CreatorParticipantRowProps> = ({
  win,
  participant,
  winnerChosen,
  selectedRaffleId,
}) => {
  const [discordCopy, setDiscordCopy] = useState(false);
  const [walletCopy, setWalletCopy] = useState(false);
  const copyToClipboard = (text: string, type: "wallet" | "discord") => {
    navigator.clipboard.writeText(text);

    if (type === "wallet") {
      setWalletCopy(true);
      setTimeout(() => {
        setWalletCopy(false);
      }, 2000);
    } else {
      setDiscordCopy(true);
      setTimeout(() => {
        setDiscordCopy(false);
      }, 2000);
    }
  };

  const isRaffleSelected = selectedRaffleId !== "";
  const participantRaffle = participant?.raffleEntries.find(
      (raffle: any) => raffle.raffleId === selectedRaffleId
  );

  return (
    <div
      className={`grid grid-cols-9 py-3 gap-2 font-bold border-b-1 border-b-creator-light ${
        !win && "text-white/50 border-b-white/20"
      }`}
    >
      <div className="col-span-2 font-bold">
        {participant.discord.oAuth.username ||
          participant.twitter.oAuth.data.username}
      </div>
      {
        isRaffleSelected && (
          <div>{win ? "Won" : winnerChosen ? "Lost": "-"}</div>
        )
      }
      <div className="flex items-center space-x-2 text-lg">
        <Tooltip
          title={discordCopy ? "Copied!" : "Copy Discord ID"}
          placement="top"
          arrow
          onClick={() =>
            copyToClipboard(
              `${participant.discord.oAuth.username}#${participant.discord.oAuth.discriminator}`,
              "discord"
            )
          }
        >
          <button type="button" aria-label="copy">
            <SiDiscord />
          </button>
        </Tooltip>
        <ExternalLink
          href={`https://twitter.com/${participant.twitter.oAuth.data.username}`}
          name="Twitter"
        >
          <SiTwitter />
        </ExternalLink>
      </div>
      <div className="col-span-2">
        <Tooltip
          title={walletCopy ? "Copied!" : "Copy Wallet"}
          placement="top"
          arrow
          onClick={() => copyToClipboard(participant.primaryWallet, "wallet")}
        >
          <button type="button" aria-label="copy">
            <p className="text-creator-light font-light w-2/3 text-ellipsis overflow-hidden">
              {participant.primaryWallet.slice(0, 20) + "..."}
            </p>
          </button>
        </Tooltip>
      </div>
      <div>
        {
            isRaffleSelected ? (
                participantRaffle ? (
                    participantRaffle?.entries?.length
                ) : (
                    0
                )
            ) : (
                participant?.raffleEntries?.length
            )
        }
      </div>
        {
            isRaffleSelected && (
                <div>
                    {
                        participantRaffle ? (
                            participantRaffle?.weights.reduce((a: number, b: number) => a + b, 0)
                        ) : (
                            0
                        )
                    }
                </div>
            )
        }
    </div>
  );
};

export default CreatorParticipantRow;
