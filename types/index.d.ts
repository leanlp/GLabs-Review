export type TUserType = "Participant" | "Creator";

export type TNftStatus = "Listed" | "Delisted";

export type TNftAttribute = {
  trait_type: string;
  value: string;
  _id: string;
};

export type TTwitterOAuth = {
  data: {
    id: string;
    name: string;
    username: string;
  };
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
  lastUpdated: string;
};

export type TDiscordOAuth = {
  id: string;
  username: string;
  display_name: null;
  avatar: string;
  avatar_decoration: null;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  email: string;
  verified: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  lastUpdated: string;
};
export type TNftMetadata = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: TNftAttribute[];
  _id: string;
};

export type TNft = {
  tokenId: number;
  metadata: TNftMetadata;
  status: TNftStatus;
  lastDelistedDate: string;
  lastListedDate: string;
  _id: string;
  resizedImageUrl: string;
};

export type TEntryTask = {
  discordServerFollow: string[];
  twitterFollow: string[];
  twitterRetweet: string[];
  twitterLike: string[];
};

export type TRaffleEntry = {
  raffleId: string;
  entries: string[];
  weights: number[];
  completedTasks: TEntryTask;
  entered: boolean;
};

export type TUserDiscord = {
  oAuth: TDiscordOAuth;
  guilds: [
    {
      guildId: string;
      guildName: string;
      _id: string;
    }
  ];
  _id: string;
};

export type TUserTwitter = {
  oAuth: TTwitterOAuth;
  _id: string;
};

export type TERC721TokenMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    }
  ];
};

export type TERC721Token = {
  tokenId: number;
  status: TNftStatus;
  lastDelistedDate: string;
  lastListedDate: string;
  metadataUrl: string;
  resizedImageUrl: string;
  metadata: TERC721TokenMetadata;
};

export type TUser = {
  type: TUserType;
  primaryWallet: string;
  mintWallets: string[];
  preferredMintWallet: string;
  twitter: TUserTwitter;
  discord: TUserDiscord;
  nfts: TNft[];
  raffleEntries: TRaffleEntry[];
  id: string;
  _id: string;
};

export type TRaffleMaster = {
  collectionName: string;
  collectionAddress: string;
  totalNFTs: number;
  nftStartIndex: number;
  nftEndIndex: number;
};

export type TRaffleMetadata = {
  description: string;
  logoUrl: string;
  bannerUrl: string;
  links: {
    website: string;
    twitter: string;
    discord: string;
    instagram: string;
    youtube: string;
    telegram: string;
    github: string;
  };
};

export type TMintDetails = {
  whitelistMintPrice: string;
  whitelistMintDate: string;
  publicMintPrice: string;
  publicMintDate: string;
};

export type TRaffleDetails = {
  startDate: string;
  endDate: string;
  supply: number;
  numberOfWinners: number;
};

export type TRaffle = {
  projectName: string;
  metadata: TRaffleMetadata;
  raffleDetails: TRaffleDetails;
  mintDetails: TMintDetails;
  entryTasks: TEntryTask;
  participants: TUser[];
  winners: string[];
  _id: string;
};

export type TGetRaffleResponseStatus = "error" | "success";

export type TGetRaffleResponseResult = {
  entered: boolean;
  entries?: string[];
  weights?: number[];
  remainingTasks?: Partial<TEntryTask>;
};

export type TGetEnterRaffleResponse =
  | {
      status: "error";
      code: number;
    }
  | {
      status: "success";
      result: TGetRaffleResponseResult;
    };

export type TBasicAnalytics = {
  totalRaffles: number;
  totalParticipants: number;
  totalEntries: number;
  totalWinners: number;
  totalLoyaltyPoints: number;
};

export type TBasicAnalyticsKey = keyof TBasicAnalytics;

export type TLBStats = {
  totalLoyaltyPoints: number;
  totalLoyaltyPointsPerDay: number;
  loyaltyPerNftPerDay: number;
  totalLoyaltyPerUser: number;
  loyaltyPerUserPerDay: number;
  stakedNfts: number;
  totalLoyaltyPerNft: number;
};

export type TPopularRaffleStats = {
  topRaffles: TRaffle[];
  topWinners: TRaffle[];
};

export type TUserStats = {
  topUsers: TUser[];
  topWinnersUsers: TUser[];
};

export type TAdvancedAnalytics = {
  LPStats: TLBStats;
  PopularRaffleStats: TPopularRaffleStats;
  UserStats: TUserStats;
};
