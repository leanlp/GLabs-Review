import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../config";
// import {
//   getHardhatContractConfig,
//   getCustomContractConfig,
//   loadAbi,
// } from "utils/contracts";
// import { ethers } from "ethers";

interface WalletConnectionState {
  showWalletPopup: boolean;
  provider?: any;
  signer?: any;
  address?: string;
  chainId?: keyof typeof config.NETWORK.chainIdToName;
  network?: string;
  contracts: any;
}

const initialState: WalletConnectionState = {
  showWalletPopup: false,
  contracts: {},
};

export const walletConnectionSlice = createSlice({
  name: "walletconnection",
  initialState,
  reducers: {
    setShowWalletPopup: (state, action) => {
      state.showWalletPopup = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setChainId: (
      state,
      action: PayloadAction<keyof typeof config.NETWORK.chainIdToName>
    ) => {
      let chainId = action.payload;
      state.chainId = chainId;
      state.network = config.NETWORK.chainIdToName[chainId];
    },
    setContracts: (state, action) => {
      let provider = action.payload;

      // let hardhatContractConfigs = config.NETWORK.hardhatContracts.map(
      //   (contract) => {
      //     return {
      //       name: contract,
      //       config: getHardhatContractConfig(state.chainId, contract),
      //     };
      //   }
      // );
      // let customContractConfigs = config.NETWORK.customContracts.map(
      //   (contract) => {
      //     return {
      //       name: contract,
      //       config: getCustomContractConfig(state.chainId, contract),
      //     };
      //   }
      // );

      // let hardhatContracts = hardhatContractConfigs.map((contractConfig) => {
      //   return {
      //     name: contractConfig.name,
      //     contract: new ethers.Contract(
      //       contractConfig.config.address,
      //       contractConfig.config.abi,
      //       provider
      //     ),
      //   };
      // });
      // let customContracts = customContractConfigs.map((contractConfig) => {
      //   return {
      //     name: contractConfig.name,
      //     contract: new ethers.Contract(
      //       contractConfig.config.address,
      //       contractConfig.config.abi,
      //       provider
      //     ),
      //   };
      // });

      // let contractObject = hardhatContracts
      //   .concat(customContracts)
      //   .reduce((obj: any, item) => {
      //     obj[item.name] = item.contract;
      //     return obj;
      //   }, {});

      // state.contracts = contractObject;
    },
    loadContract: (state, action) => {
      // let { address, abi } = action.payload;
      // let abiJson = loadAbi(abi);
      // let contract = new ethers.Contract(address, abiJson, state.provider);
      // state.contracts[address] = contract;
    },
  },
});

export const {
  setShowWalletPopup,
  setProvider,
  setSigner,
  setAddress,
  setChainId,
  setContracts,
  loadContract,
} = walletConnectionSlice.actions;

export default walletConnectionSlice.reducer;
