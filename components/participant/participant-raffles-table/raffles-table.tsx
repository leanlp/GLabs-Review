import { BiLoaderCircle } from "react-icons/bi";
import { 
    useGetAllRafflesQuery,
    useGetActiveRafflesQuery
} from "store/features/api.slice";
import { useAppSelector } from "store";
import RafflesTableHeader from "./raffles-table-header";
import RafflesTableRow from "./raffles-table-row";

const RafflesTable = () => {
  const activeRaffles = useAppSelector((state) => state.raffles.raffles);
  const filterType = useAppSelector((state) => state.raffles.filter.type);
  const enteredRaffles = useAppSelector(
    (state) => state.raffles.enteredRaffles
  );
  const getRafflesQuery = useGetAllRafflesQuery();
  const getActiveRafflesQuery = useGetActiveRafflesQuery({ populate: false });

  return (
    <div>
      <RafflesTableHeader />
      <hr />
      <div className="max-h-[60vh] pr-4 scrollable">
        {getRafflesQuery.isLoading && (
          <div className="flex justify-center py-4">
            <BiLoaderCircle className="w-12 h-12 duration-500 animate-spin" />
          </div>
        )}
        {filterType === "active" &&
          activeRaffles.map((raffle) => (
            <RafflesTableRow key={raffle._id} raffle={raffle} />
          ))}
        {filterType === "entered" &&
          enteredRaffles.map((raffle) => (
            <RafflesTableRow key={raffle._id} raffle={raffle} />
          ))}
        { (getRafflesQuery.isError || getActiveRafflesQuery.isError) && (
          <div className="flex justify-center py-4">
            <p className="text-red-500">Something Went Wrong</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RafflesTable;
