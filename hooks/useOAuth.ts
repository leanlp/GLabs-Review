import { useCallback } from "react";
import config from "config";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const { providers } = config;

export const useOAuth = () => {
  const { address } = useAccount();
  const router = useRouter();

  const login = useCallback(
    (provider: keyof typeof providers) => {
      const { clientId } = providers[provider];
      const url = `api/auth/login?provider=${provider}&clientId=${clientId}&primaryWallet=${address}&redirect_url=${router.pathname}`;
      window.location.href = url;
    },
    [router.pathname, address]
  );

  return { login };
};
