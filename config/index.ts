const config = {
  NETWORK: {
    chainId: 5,
    chainIdToName: {
      1: "mainnet",
      5: "goerli",
      1337: "localhost",
    },
    hardhatContracts: [],
    customContracts: [],
    rpcEndpoint: "",
    infuraId: "",
  },
  API: {
    ENDPOINTS: {
      CREATE_RAFFLE: {
        url: "/raffles/create",
        method: "POST",
      },
      CREATE_USER: {
        url: "/user/create",
        method: "POST",
      },
      UPDATE_USER: {
        url: "/user/update",
        method: "POST",
      },
      GET_USER: {
        url: "/user/getByAddress",
        method: "GET",
      },
      SET_USER_WALLETS: {
        url: "/user/setwallets",
        method: "POST",
      },
      UPDATE_USER_WALLETS: {
        url: "/user/updatewallets",
        method: "POST",
      },
      GET_USER_RAFFLES: {
        url: "/user/raffles",
        method: "GET",
      },
      GET_ALL_RAFFLES: {
        url: "/raffles/all",
        method: "GET",
      },
      GET_ACTIVE_RAFFLES: {
        url: "/raffles/getActive",
        method: "GET",
      },
      GET_RAFFLE_BY_ID: {
        url: "/raffles/getById",
        method: "GET",
      },
      ENTER_RAFFLE: {
        url: "/raffles/enter",
        method: "GET",
      },
      PICK_WINNERS: {
        url: "/raffles/pickwinners",
        method: "GET",
      },
      DISCORD_AUTH: {
        url: "/auth/discord",
        method: "GET",
      },
      TWITTER_AUTH: {
        url: "/auth/twitter",
        method: "GET",
      },
      GET_BASIC_ANALYTICS: {
        url: "/raffles/analytics/basic",
        method: "GET",
      },
      GET_ADVANCED_ANALYTICS: {
        url: "/raffles/analytics/advanced",
        method: "GET",
      },
    },
    ETHERSCAN_URLS: {
      1337: "https://etherscan.io",
      1: "https://etherscan.io",
    },
  },
  DATA: {
    nftImageBaseUrl: "https://ipfs.io/ipfs/",
    loyaltyPointSeconds: 60 * 60 * 24 / 10,
  },
  APP_ROUTES: {
    creator: {
      raffles: "/creator/raffles",
      create_raffle: "/creator/ruffle/create",
      participants: "/creator/participants",
      analytics: "/analytics",
      dashboard: "/creator",
    },
    participant: "/participant",
    faqs: "/faqs",
    home: "/",
  },

  providers: {
    discord: {
      name: "discord",
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      url: `https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=identify%20guilds.join&prompt=consent`,
    },
    twitter: {
      name: "twitter",
      clientId: process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID,
      url: ` https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID}&redirect_uri=https://raffle-masters-ui.vercel.app/api/auth/callback/twitter&scope=tweet.read%20users.read%20follows.read%20like.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`,
    },
  },
};

export default config;
