import * as yup from "yup";

const twitterRegex =
  /^(http\:\/\/|https\:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\?#]*)(?:[?#].*)?$/;

const discordRegex =
  /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm;

export const createRaffleValidation = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  metadata: yup.object().shape({
    logoUrl: yup.string().required("Logo URL is required"),
    description: yup.string().required("Description is required"),
    links: yup.object().shape({
      website: yup.string().required("Website is required"),
      twitter: yup
        .string()
        .trim()
        .matches(twitterRegex, "Invalid Twitter URL")
        .required("Twitter is required"),
      discord: yup
        .string()
        .trim()
        .matches(discordRegex, "Invalid Discord URL")
        .required("Discord is required"),
    }),
  }),
  raffleDetails: yup.object().shape({
    supply: yup.number().required("Supply is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    numberOfWinners: yup.number().required("Number of winners is required"),
  }),
  entryTasks: yup.object().shape({
    twitterFollow: yup
      .array()
      .of(yup.string().trim().matches(twitterRegex, "Invalid Twitter handle"))
      .length(1, "You must add at least one Twitter follow task"),
    twitterRetweet: yup
      .array()
      .of(yup.string().trim().matches(twitterRegex, "Invalid Twitter URL"))
      .length(1, "You must add at least one Twitter retweet task"),
    twitterLike: yup
      .array()
      .of(yup.string().trim().matches(twitterRegex, "Invalid Twitter URL"))
      .length(1, "You must add at least one Twitter like task"),
    discordServerFollow: yup
      .array()
      .of(yup.string().trim())
      .length(1, "You must add at least one Discord server follow task"),
  }),
  mintDetails: yup.object().shape({
    publicMintPrice: yup.number().required("Public mint price is required"),
    publicMintDate: yup.string().required("Public mint date is required"),
    whitelistMintPrice: yup
      .number()
      .required("Whitelist mint price is required"),
    whitelistMintDate: yup.string().required("Whitelist mint date is required"),
  }),
});
