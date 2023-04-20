import { FaDiscord, FaHeart, FaTwitter } from "react-icons/fa";
import { FC, memo, useEffect, useId } from "react";
import {
  useEnterRaffleMutation,
  useGetRaffleByIdQuery,
} from "store/features/api.slice";
import { useAppSelector } from "store";
import LoadingSpinner from "components/shared/loading-spinner";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { ERROR_CODES } from "utils/constants";
import LinkChip from "components/shared/LinkChip";
import getTotalLoyalty from "utils/loyalty";
const { DATA } = require("../../config").default;

interface EnterRaffleFormProps {
  onClose: () => void;
}

const EnterRaffleForm: FC<EnterRaffleFormProps> = ({ onClose }) => {
  const { address } = useAccount();
  const id = useId();
  const selectedRaffleId = useAppSelector(
    (state) => state.raffles.selectedRaffleId
  );

  const [executedEnterRaffle, enterRaffleQuery] = useEnterRaffleMutation();

  const getRaffleState = useGetRaffleByIdQuery({
    raffleId: selectedRaffleId ?? "",
  });

  const selectedRaffle = useAppSelector(
    (state) => state.raffles.selectedRaffle
  );
  const user = useAppSelector((state) => state.user.user);
  const userRaffleEntry = user?.raffleEntries.find(
    (entry) => entry.raffleId === selectedRaffleId
  );
  const raffleEntered = userRaffleEntry?.entered;

  const handleEnterRaffle = async () => {
    if (!address) return;
    if (!selectedRaffleId) return;

    executedEnterRaffle({
      raffleId: selectedRaffleId,
      primaryWallet: address,
    });

    toast.loading("Entering raffle...", {
      id,
    });
  };

  useEffect(() => {
    if (enterRaffleQuery.isSuccess) {
      if (enterRaffleQuery.data.status === "success") {
        if (
          enterRaffleQuery.data.result.entered === false &&
          enterRaffleQuery.data.result.remainingTasks
        ) {
          toast.error("You must complete Raffle Tasks", {
            id,
          });
        }

        if (enterRaffleQuery.data.result.entered === true) {
          toast.success("You have entered the raffle!", {
            id,
          });
        }
      }

      if (enterRaffleQuery.data.status === "error") {
        toast.error(
          ERROR_CODES[enterRaffleQuery.data.code as keyof typeof ERROR_CODES] ??
            "",
          {
            id,
          }
        );
      }
    }

    if (enterRaffleQuery.isError) {
      toast.error("An error has occurred", {
        id,
      });
    }
  }, [enterRaffleQuery, id]);

  return (
    <div className="flex gap-2 px-4 py-3 rounded-md bg-participate-gradient">
      {getRaffleState.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex-1 underline-offset-1">
            <h2 className="mb-2 text-lg ">To enter you must:</h2>
            <div className="flex py-2 my-1 text-sm border-b-1 border-white/50">
              <FaTwitter className="self-center mr-2" />
              <span className="flex items-center mr-4">Like </span>
              <span className="flex flex-wrap items-center gap-2">
                {selectedRaffle?.entryTasks?.twitterLike?.map((task) => (
                  <LinkChip
                    key={task}
                    href={task}
                    label={"@" + task.split("/")[3] + " tweet"}
                    error={
                      enterRaffleQuery.data?.status === "success" &&
                      enterRaffleQuery.data?.result?.remainingTasks?.twitterLike?.includes(
                        task
                      )
                    }
                  />
                ))}
              </span>
            </div>
            <div className="flex py-2 my-1 text-sm border-b-1 border-white/50">
              <FaTwitter className="self-center mr-2" />
              <span className="flex items-center mr-4">Retweet</span>
              <span className="flex flex-wrap items-center gap-2 p-1 rounded ring-white/50">
                {selectedRaffle?.entryTasks?.twitterRetweet?.map((task) => (
                  <LinkChip
                    key={task}
                    href={task}
                    label={"@" + task.split("/")[3] + " tweet"}
                    error={
                      enterRaffleQuery.data?.status === "success" &&
                      enterRaffleQuery.data?.result?.remainingTasks?.twitterRetweet?.includes(
                        task
                      )
                    }
                  />
                ))}
              </span>
            </div>
            <div className="flex py-2 my-1 text-sm border-b-1 border-white/50">
              <FaTwitter className="self-center mr-2" />
              <span className="flex items-center self-center space-x-4">
                <span>Follow </span>
                <span className="flex flex-wrap items-center gap-2 p-1 rounded ring-white/50">
                  {selectedRaffle?.entryTasks?.twitterFollow?.map((task) => (
                    <LinkChip
                      key={task}
                      href={task}
                      label={"@" + task.split("com/")[1]}
                      error={
                        enterRaffleQuery.data?.status === "success" &&
                        enterRaffleQuery.data?.result?.remainingTasks?.twitterFollow?.includes(
                          task
                        )
                      }
                    />
                  ))}
                </span>
              </span>
            </div>
            <div className="flex py-2 my-1 text-sm">
              <FaDiscord className="self-center mr-2" />
              <span className="flex items-center self-center space-x-4">
                <span>Enter </span>
                <span className="flex flex-wrap items-center gap-2">
                  {selectedRaffle?.entryTasks?.discordServerFollow?.map(
                    (task) => (
                      <LinkChip
                        label="Discord Server"
                        href={`https://discord.gg/${task}`}
                        error={
                          enterRaffleQuery.data?.status === "success" &&
                          enterRaffleQuery.data?.result?.remainingTasks?.discordServerFollow?.includes(
                            task
                          )
                        }
                        key={task}
                      />
                    )
                  )}
                </span>
              </span>
            </div>
            <div className="mt-6">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-1 font-semibold text-gray-600 bg-white rounded "
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-1 ml-3 font-semibold rounded bg-participant-secondary"
              >
                Leave
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1 space-y-2">
            <div>
              <h2 className="mb-2 text-lg ">Your entry details:</h2>
              <div>
                <span className="text-2xl font-bold ">
                 {getTotalLoyalty(user?.nfts || [])}<span className="ml-2 font-normal">Loyalty Points</span>
                </span>
              </div>
              <div>
                <span>
                  Powered by{" "}
                  <span className="font-bold text-participant-secondary">
                    {" "}
                    <FaHeart className="inline-block " /> {user?.nfts?.length || 0 }{" "}
                  </span>{" "}
                  <span className="font-bold">Delisted NFTs</span>{" "}
                </span>
                <div>
                  Your entry is{" "}
                  <span className="font-bold text-participant-secondary">
                      { raffleEntered ? "registered" : "in progress" }
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 ml-auto w-fit">
              <button
                onClick={handleEnterRaffle}
                disabled={enterRaffleQuery.isLoading}
                type="button"
                className=" px-4 py-1 mt-auto min-w-[5rem] font-semibold rounded bg-white text-gray-600"
              >
                {enterRaffleQuery.isLoading ? (
                  <LoadingSpinner color="black" size={12} />
                ) : (
                  "Enter"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(EnterRaffleForm);
