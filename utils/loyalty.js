const { DATA } = require("../config").default;

const getTotalLoyalty = (nfts) => {
    const totalLoyaltyPoints = nfts.filter(nft => nft.status === "Delisted").reduce((acc, nft) => {
        // @ts-ignore
        const { 
            lastDelistedDate
        } = nft;
        const lastDelistedDateNumber = new Date(lastDelistedDate).getTime();
        const now = Date.now();
        // @ts-ignore
        const dateDiff = Math.max(now - lastDelistedDateNumber, 0);
        const dateInSeconds = dateDiff / 1000;
        const loyaltyPoints = Math.floor(dateInSeconds / DATA.loyaltyPointSeconds);
        return acc + loyaltyPoints;
    }, 0);
    return totalLoyaltyPoints;
}

export default getTotalLoyalty;
