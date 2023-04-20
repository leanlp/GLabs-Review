import Link from "next/link";

const CreatorAnalyticsHeader = () => {
  return (
    <div className="flex gap-2 flex-col md:flex-row md:justify-between mb-2">
      <div className="w-full">
        <span className=" font-bold text-base">Analytics</span>
          {/*<span className="ml-4 space-x-2">
          <button type="button">Link 1</button>
          <span className="">|</span>
          <button type="button">Link 2</button>
          <span className="">|</span>
          <button type="button">Link 3</button>
        </span>*/}
      </div>
      <div className="w-full flex md:justify-end text-center">
        <Link
          href="/analytics"
          className="bg-white/20 px-4 py-1 rounded w-full md:w-auto"
        >
          Full Analytics
        </Link>
      </div>
    </div>
  );
};

export default CreatorAnalyticsHeader;
