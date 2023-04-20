import { configureChains, createClient } from "wagmi";
import {
  modalConnectors,
  walletConnectProvider,
  EthereumClient,
} from "@web3modal/ethereum";
import {
  arbitrum,
  mainnet,
  polygon,
  optimism,
  avalanche,
  fantom,
  bsc,
  goerli,
} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WEB3_WALLET_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_WEB3_WALLET_PROJECT_ID env variable"
  );
}

// 2. Configure wagmi client
const chains = [process.env.NODE_ENV === "development" ? goerli : mainnet];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
