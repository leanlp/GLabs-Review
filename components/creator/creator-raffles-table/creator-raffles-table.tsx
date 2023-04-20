import CreatorRafflesTableHeader from "./creator-raffles-table-header";
import CreatorRafflesTableRow from "./creator-raffles-table-row";
import { useAppSelector } from "store";
import { useGetAllRafflesQuery } from "store/features/api.slice";
import LoadingSpinner from "components/shared/loading-spinner";

const CreatorRafflesTable = () => {
  const getRafflesQuery = useGetAllRafflesQuery();

  const raffles = useAppSelector((state) => state.raffles.raffles);
  // console.log(raffles);
  return (
    <div>
      <CreatorRafflesTableHeader />
      <hr />
      <div className="max-h-[60vh] pr-4 scrollable">
        {getRafflesQuery.isLoading && <LoadingSpinner />}
        {raffles.map((raffle) => (
          <CreatorRafflesTableRow key={raffle._id} raffle={raffle} />
        ))}
      </div>
    </div>
  );
};

export default CreatorRafflesTable;
