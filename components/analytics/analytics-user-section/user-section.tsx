import UserSectionRow from "./user-section-row";
import { useAppSelector } from "store";

const UserSection = () => {
  const advancedAnalytics = useAppSelector(
    (state) => state.creator.advancedAnalytics
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="font-bold">User Section</h3>
        {/* <div className="flex items-center space-x-2">
          <button type="button" className="text-sm">
            Activity
          </button>
          <span>|</span>
          <button type="button" className="text-sm">
            Entries
          </button>
          <span>|</span>
          <button type="button" className="text-sm font-semibold">
            Wins
          </button>
        </div> */}
      </div>
      <div className="space-y-4">
        {advancedAnalytics?.UserStats?.topUsers?.map((user, i) => (
          <UserSectionRow index={i} key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserSection;
