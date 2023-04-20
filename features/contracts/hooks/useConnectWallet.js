import { useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { NETWORK } from "../../../config";
import { useDispatch } from "react-redux";
import { 
    setProvider,
    setSigner,
    setContracts,
    setAddress,
    setChainId,
} from "../../../store/features/walletconnection";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: NETWORK.infuraId,
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
  disableInjectedProvider: false,
});

export default function useConnectWallet(autoConnect=false) {
  const dispatch = useDispatch();

  async function initiateWeb3(proxy) {
    const _provider = new ethers.providers.Web3Provider(proxy);

    const _signer = _provider.getSigner();
    const _address = await _signer.getAddress();
    let { chainId } = await _provider.getNetwork();

    dispatch(setProvider(_provider));
    dispatch(setSigner(_signer));
    dispatch(setAddress(_address));
    dispatch(setChainId(chainId));
    dispatch(setContracts(_provider));
  }

  async function connect() {
    try {
      let _proxy = await web3Modal.connect();
      await initiateWeb3(_proxy);
    } catch (e) {
      if (e && e.message) alert(e.message);
    }
  }

  useEffect(() => {
    if (autoConnect) {
        connect();
    }
  }, [autoConnect]);

  return [
    connect,
  ];
}
