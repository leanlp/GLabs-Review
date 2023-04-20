import { FC } from "react";
import Footer from "./footer";
import Header from "./header";
import { useAppSelector } from "store";
import { useAccount } from "wagmi";
import { useUser } from "hooks/useUser";

interface ILayoutProps {
  children: React.ReactNode;
  hideHeaderAndFooter?: boolean;
}

const Layout: FC<ILayoutProps> = ({ children, hideHeaderAndFooter }) => {
  const userType =
    useAppSelector((state) => state.user.userType) || "Participant";
  const { address } = useAccount();

  useUser(address || "");

  return (
    <div>
      {hideHeaderAndFooter ? (
        children
      ) : (
        <>
          {userType && <Header accountType={userType} />}
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
