import { useAccount } from "wagmi";
import {
  useCreateUserMutation,
  useGetBasicAnalyticsQuery,
  useGetUserQuery,
} from "store/features/api.slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import config from "config";
import { isCreatorRoute } from "utils/isCreatorRoute";
import { useAppDispatch } from "store";
import { setUser, setUserType } from "store/features/user.slice";

const { APP_ROUTES } = config;

export const useUser = (walletAddress: string) => {
  const router = useRouter();
  const { address, isDisconnected, isConnecting } = useAccount({
    onConnect({ address }) {
      document.cookie = `address=${address?.toLowerCase()}`;
    },
  });
  const dispatch = useAppDispatch();

  const userQuery = useGetUserQuery(
    {
      primaryWallet: walletAddress ?? address ?? "",
    },
    {
      skip: !walletAddress && !address,
    }
  );

  const [executeCreateUser, createUserQuery] = useCreateUserMutation();

  useGetBasicAnalyticsQuery(undefined, {
    skip:
      !userQuery.isSuccess ||
      !userQuery.data ||
      userQuery.data?.type !== "Creator",
  });

  useEffect(() => {
    if (isDisconnected && router.pathname !== "/") {
      router.push("/");
    }
  }, [isDisconnected, router]);

  useEffect(() => {
    if (address && userQuery.isError && !userQuery.data) {
      executeCreateUser({
        primaryWallet: address,
      });
    }
  }, [address, userQuery.data, userQuery.isError, executeCreateUser]);

  useEffect(() => {
    if ((userQuery.data || createUserQuery.data) && router.pathname === "/") {
      router.push(
        userQuery.data?.type === "Creator" ||
          createUserQuery.data?.type === "Creator"
          ? APP_ROUTES.creator.raffles
          : APP_ROUTES.participant
      );
    }
  }, [userQuery.data, createUserQuery.data, router]);

  useEffect(() => {
    if (isCreatorRoute(router.pathname)) {
      dispatch(setUserType("Creator"));
    } else {
      dispatch(setUserType("Participant"));
    }
  }, [router.pathname, dispatch]);

  useEffect(() => {
    if (
      userQuery.data?.type === "Participant" &&
      isCreatorRoute(router.pathname)
    ) {
      router.push(APP_ROUTES.participant);
    }
  }, [userQuery.data?.type, router]);

  useEffect(() => {
    if (userQuery.data) {
      dispatch(setUser(userQuery.data));
    }
  }, [userQuery.data, dispatch]);

  // console.log({
  //   userQuery,
  //   createUserQuery,
  // });

  return {
    userQuery,
    createUserQuery,
    loading: userQuery.isLoading || createUserQuery.isLoading || isConnecting,
    error: userQuery.error || createUserQuery.error,
  };
};
