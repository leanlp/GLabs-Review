import SortButton from "components/shared/SortButton";
import Link from "next/link";
import { FaEthereum, FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "store";
import { Fragment } from "react";
import {
  sortRaffles,
  SORT_RAFFLES,
  TSortRaffles,
} from "store/features/raffles.slice";

const CreatorRafflesTableHeader = () => {
  const raffles = useAppSelector((state) => state.raffles.raffles);
  const sort = useAppSelector((state) => state.raffles.sort);
  const dispatch = useAppDispatch();

  const handleSortClick = (type: TSortRaffles) => {
    dispatch(
      sortRaffles({
        sortType: type,
      })
    );
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between border-b-1 border-b-white/80 pb-2 lg:space-x-3 space-y-3 lg:space-y-0">
      <div className="font-semibold flex flex-col md:flex-row md:space-x-2 md:items-end">
        <span className="text-3xl">Your Raffles</span>
        <div className="space-x-3">
          <span className="">
            You have{" "}
            <span className="text-creator-light">{raffles.length}</span> active
            raffles
          </span>
          <Link
            href="/creator/raffles/create"
            className="px-2 py-1 text-creator-light cursor-pointer"
          >
            Add New
          </Link>
        </div>
      </div>
      <div className="flex md:items-center flex-col md:flex-row md:space-x-3">
        <span>Sort by:</span>
        {Object.entries(SORT_RAFFLES).map(([key, value], i) => (
          <Fragment key={key}>
            <SortButton
              onClick={() => handleSortClick(value.type)}
              showArrow
              active={sort.type === value.type}
              direction={value.type === sort.type ? sort.order : "asc"}
            >
              {value.label}
            </SortButton>
            {i !== Object.entries(SORT_RAFFLES).length - 1 && (
              <span key={i} className="hidden md:inline">
                |
              </span>
            )}
          </Fragment>
        ))}
        <span className="hidden md:inline">|</span>
        <div className="flex space-x-1">
          <span>Chain:</span>
          <div className="h-6 flex items-center">
            <FaEthereum />
          </div>
        </div>
        <button type="button" title="menu" className=" h-6 flex items-center">
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default CreatorRafflesTableHeader;
