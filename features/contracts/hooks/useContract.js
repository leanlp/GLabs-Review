import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectContracts, selectSigner } from "../../../store/features/walletconnection";

export default function useContract(
  contractName,
) {
  const [contract, setContract] = useState(null);
  const [contractsLoaded, setContractsLoaded] = useState(false);
  const contracts = useSelector(selectContracts);
  const signer = useSelector(selectSigner);

  useEffect(() => {
    if (contracts) {
        setContractsLoaded(true);
        setContract(contracts[contractName]);
    }
  }, [contracts, contractName]);

  return {
    contract,
    signer,
    contractsLoaded,
  };
}
