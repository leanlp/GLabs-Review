import SortButton from "components/shared/SortButton";
import { FaEthereum, FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "store";
import { Fragment } from "react";
import {
  filterRaffles,
  sortRaffles,
  SORT_RAFFLES,
  TFilterRaffles,
  TSortRaffles,
} from "store/features/raffles.slice";
import { useGetUserRafflesMutation } from "store/features/api.slice";
import { toast } from "react-hot-toast";

const RafflesTableHeader = () => {
  const [executeGetUserRaffles, getUserRafflesQuery] =
    useGetUserRafflesMutation();

  const raffles = useAppSelector((state) => state.raffles.raffles);
  const filterType = useAppSelector((state) => state.raffles.filter.type);
  const sort = useAppSelector((state) => state.raffles.sort);
  const primaryWallet = useAppSelector(
    (state) => state.user.user?.primaryWallet
  );
  const dispatch = useAppDispatch();

  const handleSortClick = (type: TSortRaffles) => {
    dispatch(
      sortRaffles({
        sortType: type,
      })
    );
  };

  const handleGetUserRaffles = (type: TFilterRaffles) => {
    if (!primaryWallet) {
      toast.error("Please connect your wallet first");
      return;
    }
    executeGetUserRaffles(primaryWallet)
      .unwrap()
      .then((res) => {
        dispatch(filterRaffles({ type }));
      });
  };
  return (
    <div className="mb-2 space-y-4">
      <div className="space-x-4">
        <span className="text-3xl font-extrabold">Raffles</span>{" "}
        <span>
          There are{" "}
          <span className="font-bold text-participant-light">
            {raffles.length}
          </span>{" "}
          active raffles
        </span>
      </div>
      <div className="flex flex-col md:flex-row space-x-3">
        <span>Sort by:</span>
        {Object.entries(SORT_RAFFLES).map(([key, value], i) => (
          <Fragment key={i}>
            <SortButton
              key={key}
              onClick={() => handleSortClick(value.type)}
              showArrow
              active={sort.type === value.type}
              direction={value.type === sort.type ? sort.order : "asc"}
            >
              {value.label}
            </SortButton>
            {i !== Object.entries(SORT_RAFFLES).length - 1 && (
              <span className="hidden md:inline">|</span>
            )}
          </Fragment>
        ))}
        <span className="hidden md:inline">|</span>
        <div className="flex items-center space-x-1">
          <span>Chain:</span>
          <div className=" h-6 flex items-center">
            <FaEthereum />
          </div>
        </div>
        <button type="button" title="menu" className=" h-6 flex items-center">
          <FaBars />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <div>Filter:</div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className={`text-sm ${filterType === "active" ? "font-bold" : ""}`}
            onClick={() => handleGetUserRaffles("active")}
          >
            Active Raffles
          </button>
          <span>|</span>
          <button
            onClick={() => handleGetUserRaffles("entered")}
            type="button"
            className={`text-sm ${filterType === "entered" ? "font-bold" : ""}`}
          >
            Only Raffles Entered
          </button>
        </div>
      </div>
    </div>
  );
};

export default RafflesTableHeader;
