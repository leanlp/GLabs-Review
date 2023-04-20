import { useState } from "react";
import useContract from "./useContract";

export default function useContractExecution(
  contractName,
  methodName,
  methodArgs,
  options = {}
) {
  const { contract, signer } = useContract(contractName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = async () => {
    console.log(
      `Executing ${methodName} on ${contract?.address} with args ${methodArgs} and options ${JSON.stringify(options)}`
    );
    if (!contract) return;
    let hasUndefinedArg = methodArgs.some((arg) => arg === undefined);
    if (hasUndefinedArg)
      return;

    setLoading(true);
    setError(null);
    setTxHash(null);
    setReceipt(null);

    try {
      const tx = await contract.connect(signer)[methodName](...methodArgs, options);
      setTxHash(tx.transactionHash);
      let receipt = await tx.wait();
      setReceipt(receipt);

      await tx.wait();
      setSuccess(true);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    txHash,
    receipt,
    execute,
  };
}
