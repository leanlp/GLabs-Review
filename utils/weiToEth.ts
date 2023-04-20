import { ethers } from "ethers";

export const weiToEth = (wei: string) => {
  return parseFloat(ethers.utils.formatUnits(wei, "ether"));
};
