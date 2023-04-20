import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProvider, selectAddress } from '../../../store/features/walletconnection';

export const useUserBalance = () => {
    const provider = useSelector(selectProvider);
    const address = useSelector(selectAddress);
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        if (provider && address) {
        provider.getBalance(address).then((balance) => {
            setBalance(balance);
        });
        }
    }, [provider, address]);
    
    return balance;
}

