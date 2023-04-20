import SelectRaffle from "./SelectRaffle";
import { useEffect } from "react";
import CreatorParticipantTableHeader from "./creator-participant-table-header";
import CreatorParticipantRow from "./creator-participant-table-row";
import {
  useGetAllRafflesQuery,
  usePickWinnersMutation,
} from "store/features/api.slice";
import { useAppSelector } from "store";
import LoadingSpinner from "components/shared/loading-spinner";
import { toast } from "react-hot-toast";

const CreatorParticipantTable = () => {
  const getRafflesQuery = useGetAllRafflesQuery();
  const participants = useAppSelector((state) => state.creator.participants);
  const selectedRaffleId = useAppSelector(
    (state) => state.raffles.selectedRaffleId
  );
  const raffles = useAppSelector((state) => state.raffles.raffles);
  const [executePickWinner, pickWinnerQuery] = usePickWinnersMutation();

  useEffect(() => {
    if (pickWinnerQuery.isSuccess) {
        if (pickWinnerQuery.data.status === "success") {
          toast.success("Winner picked!")
            setTimeout(() => window.location.reload(), 1000);
        }
        
        if (pickWinnerQuery.data.status === "error") {
          toast.success(pickWinnerQuery.data.message)
        }
    }

    if (pickWinnerQuery.isError) {
      toast.error("An error has occurred");
    }
  }, [pickWinnerQuery]);


  const handlePickWinner = () => {
    if (!selectedRaffleId) {
      toast.error("Please select a raffle");
      return;
    }
    executePickWinner({
      raffleId: selectedRaffleId,
    });
  };

  return (
    <section className="space-y-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:space-x-4 pb-4 border-b-1 border-white">
        <h3 className="font-semibold text-3xl">Raffles Participants</h3>
        <p className="flex items-center min-w-max">
          You have
          <span className="text-creator-light mx-2 font-extrabold">
            {participants.length}
          </span>
          participant{participants.length > 1 ? "s" : ""} on your raffles
        </p>
      </div>
      <div className="flex items-center w-full">
        <SelectRaffle />
        {selectedRaffleId && (
          <button
            disabled={pickWinnerQuery.isLoading}
            onClick={handlePickWinner}
            type="button"
            className="ml-4 px-4 py-2 hover:bg-creator-dark duration-150 font-bold bg-creator-light text-white rounded-md h-full"
          >
            {pickWinnerQuery.isLoading ? (
              <LoadingSpinner size={24} />
            ) : (
              "Pick Winner"
            )}
          </button>
        )}
      </div>
      <div className="scrollable">
        <div className="max-h-[80vh] min-w-[1000px] pr-4">
          <CreatorParticipantTableHeader 
                selectedRaffleId={selectedRaffleId}
          />
          {getRafflesQuery.isFetching && <LoadingSpinner />}
          {selectedRaffleId !== ""
            ? raffles
                .filter((raffle) => raffle._id === selectedRaffleId)
                .map((raffle) =>
                  raffle.participants.map((participant) => (
                    <CreatorParticipantRow
                      raffleId={raffle._id}
                      key={participant._id}
                      win={
                          raffle.winners.map((w: any) => w._id).includes(participant._id) ? true : false
                      }
                      participant={participant}
                      winnerChosen={raffle.winners.length > 0}
                      selectedRaffleId={selectedRaffleId}
                    />
                  ))
                )
            : participants.map((participant) => (
                <CreatorParticipantRow
                  raffleId={selectedRaffleId}
                  key={participant._id}
                  win={false}
                  participant={participant}
                  winnerChosen={false}
                  selectedRaffleId={selectedRaffleId}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorParticipantTable;
