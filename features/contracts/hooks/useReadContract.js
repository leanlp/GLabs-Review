import { useState, useEffect } from "react";
import useContract from "./useContract";

export default function useReadContract(
  contractName,
  methodName,
  methodArgs,
) {
  const { contract, contractsLoaded } = useContract(contractName);
 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetch = async () => {
    if (!contract) return;
    let hasUndefinedArg = methodArgs.some((arg) => arg === undefined);
    if (hasUndefinedArg)
      return;

    setLoading(true);
    setSuccess(false);
    setError(null);
    
    try {
        const result = await contract[methodName](...methodArgs);
        if (result) {
            console.log(`Setting result for ${methodName} to ${result}`);
            setResult(result);
            setSuccess(true);
        }
    } catch (e) {
        console.log(e)
        setError(true);
    } finally {
        setLoading(false);
    }
  };  

  useEffect(() => {
    fetch();
  }, [contract?.address, methodName, JSON.stringify(methodArgs)]);

  return {
      result,
      loading,
      error,
      success,
      fetch
  };
}
