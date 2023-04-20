import { useEffect, useState } from "react";
import useContract from "./useContract";

function getArgsFromEvent(contract, receipt, eventName, targetArg) {
    const requestIds = [];
    const logs = receipt.logs;
    const contractInterface = contract.interface
    
    for (const log_key in logs)
    {
        try {
            const parsed = contractInterface.parseLog(logs[log_key]);
            const name = parsed.name;
            console.log(parsed);

            if (name === eventName) {
                requestIds.push(parsed.args[targetArg]);
            }
        } catch (e) {
            console.log(e);
            continue;
        }
        
    }

    return requestIds;
}

export default function useLogsFromTransaction(
    contractName,
    receipt,
    eventName,
    targetArg
) {
    const { contract, contractsLoaded } = useContract(contractName);
    const [result, setResult] = useState();
    const [error, setError] = useState();

    const fetch = async () => {
        if (!contract) return;
        if (!receipt) return;

        setError(null);
        
        try {
            const result = getArgsFromEvent(contract, receipt, eventName, targetArg);
            if (result) {
                setResult(result);
            }
        } catch (e) {
            console.log(e)
            setError(true);
        } 
    };  

    useEffect(() => {
        fetch();
    }, [contract?.address, receipt]);

    return {
        result,
        error,
        fetch
    };
}
