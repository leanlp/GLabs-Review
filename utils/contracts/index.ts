// import config from "config";
// // import hardhatConfig from "data/contracts/hardhat_contracts.json";
// // import customConfig from "data/contracts/custom_contracts.json";
// // import abis from "data/contracts/abis.json";
// import { ethers } from "ethers";

// const { NETWORK } = config;

// function getContractAtConfig(
//   chainId: number,
//   contractName: typeof NETWORK.chainIdToName,
//   configObject: any
// ) {
//   return configObject[chainId.toString()][
//     NETWORK.chainIdToName[chainId as keyof typeof NETWORK.chainIdToName]
//   ]["contracts"][contractName];
// }

// export const getHardhatContractConfig = (chainId, contract) => {
//   return getContractAtConfig(chainId, contract, hardhatConfig);
// };

// export const getCustomContractConfig = (chainId, contract) => {
//   return getContractAtConfig(chainId, contract, customConfig);
// };

// export const loadAbi = (abi) => {
//   return abis[abi];
// };

// export const getTruncatedAddress = (address) => {
//   if (!address) {
//     return "";
//   }
//   return address.slice(0, 6) + "..." + address.slice(-4);
// };

// export const formatEtherBigNumber = (valueString) => {
//   if (!valueString) {
//     return "";
//   }
//   let valueBn = ethers.BigNumber.from(valueString);
//   return ethers.utils.formatEther(valueBn);
// };

export {};
