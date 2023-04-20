import { FC, useState } from "react";
import { TUserType } from "types";
import ActiveLink from "./ActiveLink";
import { getHeaderLinks } from "utils";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "store";
import { setUserType } from "store/features/user.slice";

interface IProps {
  accountType: TUserType;
}

const Header: FC<IProps> = ({ accountType }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const toggleDrawer = () => {
    setIsDrawerOpen((curr) => !curr);
  };

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  const handleUserTypeChange = (userType: TUserType) => {
    dispatch(setUserType(userType));
  };

  return (
    <header className="h-12 bg-nfts-gradient z-50 backdrop:blur-md">
      <div className="flex items-center w-full h-full page-container page-spacing">
        <h2 className="font-extrabold md:hidden">
          Raffle<span className="font-light">master</span>
        </h2>
        <button
          onClick={toggleDrawer}
          type="button"
          title="open drawer"
          className="p-2 ml-auto text-3xl text-white rounded-full md:hidden"
        >
          <FiMenu />
        </button>

        <nav
          className={`fixed duration-300 backdrop-blur-sm md:backdrop-blur-0 bg-black/90 md:bg-transparent md:relative flex flex-col md:flex-row md:items-center w-full justify-center md:justify-between h-full z-40 text-white left-0 top-0 md:clip-full ${
            isDrawerOpen ? "clip-full" : "clip-none"
          }`}
        >
          <div className="flex flex-col px-8 space-y-4 md:flex-row md:items-center md:px-0 md:space-y-0 md:space-x-4">
            {getHeaderLinks(accountType).map((link) => (
              <ActiveLink
                onClick={handleLinkClick}
                key={link.href}
                href={link.href}
              >
                {link.title}
              </ActiveLink>
            ))}
          </div>
          {/* <div className="flex flex-col items-center px-8 mt-4 space-y-4 md:flex-row md:ml-auto md:mr-4 md:space-x-4 md:px-0 md:space-y-0 md:mt-0 ">
            <ActiveLink onClick={handleLinkClick} href="/settings">
              Settings
            </ActiveLink>
            <span className="hidden md:inline">|</span>
            <ActiveLink onClick={handleLinkClick} href="/profile">
              Profile
            </ActiveLink>
          </div> */}
          <button
            onClick={() => setIsDrawerOpen((curr) => !curr)}
            type="button"
            title="close drawer"
            className="fixed z-50 p-2 text-4xl bg-white rounded-full md:hidden top-8 right-8 text-black/90"
          >
            <IoClose />
          </button>
        </nav>
        {user?.type === "Creator" && (
          <div className="fixed z-30 text-center md:relative bottom-4 right-8 left-8 md:left-0 md:right-0 md:bottom-1">
            <ActiveLink
              onClick={() =>
                handleUserTypeChange(
                  accountType === "Creator" ? "Participant" : "Creator"
                )
              }
              href={accountType === "Creator" ? "/participant" : "/creator"}
            >
              <div
                className={`flex flex-col h-16 pb-1 px-8 rounded ${
                  accountType === "Creator"
                    ? "bg-participate-gradient"
                    : "bg-creator-gradient"
                }`}
              >
                <span className="flex-1" />
                <span className="text-sm md:text-right">Switch to</span>
                <div className="block text-xl font-extrabold md:text-right">
                  {accountType === "Creator" ? "Participant" : "Creator"}
                </div>
              </div>
            </ActiveLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
