import Link from "next/link";
import config from "config";
import InputField from "./input-field";
import { useCreateRaffleMutation } from "store/features/api.slice";
import { TRaffle } from "types";
import { FormProvider, useForm } from "react-hook-form";
import TextArea from "./text-area";
import LinkInput from "./link-input";
import { SiTwitter, SiDiscord } from "react-icons/si";
import { RiEarthLine } from "react-icons/ri";
import DatePicker from "./date-picker";
import ArrayInput from "./array-input";
import { createRaffleValidation } from "utils/create-raffle-validation";
import { useYupValidationResolver } from "hooks/useYepValidationResolver";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { APP_ROUTES } = config;

const initialValues: Partial<TRaffle> = {
  projectName: "",
  metadata: {
    logoUrl: "",
    description: "",
    bannerUrl: "",
    links: {
      website: "",
      twitter: "",
      // instagram: "",
      discord: "",
      // telegram: "",
      // youtube: "",
      // github: "",
    } as TRaffle["metadata"]["links"],
  },
  raffleDetails: {
    supply: "" as any,
    numberOfWinners: "" as any,
    startDate: "",
    endDate: "",
  },
  entryTasks: {
    discordServerFollow: [],
    twitterFollow: [],
    twitterRetweet: [],
    twitterLike: [],
  },
  mintDetails: {
    publicMintDate: "",
    publicMintPrice: "",
    whitelistMintPrice: "",
    whitelistMintDate: "",
  },
};

const NewRuffleForm = () => {
  const router = useRouter();
  const resolver = useYupValidationResolver(createRaffleValidation);

  const methods = useForm({
    defaultValues: initialValues,
    resolver,
  });
  const [executeCreateRaffle, createRaffleQuery] = useCreateRaffleMutation();

  const onSubmit = (data: Partial<TRaffle>) => {
    let modifiedData = { ...data };

    modifiedData = {
      ...modifiedData,
      mintDetails: modifiedData.mintDetails && {
        ...modifiedData.mintDetails,
        publicMintPrice: (
          +modifiedData.mintDetails.publicMintPrice *
          10 ** 18
        ).toString(),
        whitelistMintPrice: (
          +modifiedData.mintDetails.whitelistMintPrice *
          10 ** 18
        ).toString(),
      },
    };
    executeCreateRaffle(modifiedData);
  };

  useEffect(() => {
    if (createRaffleQuery.isSuccess) {
      router.push(APP_ROUTES.creator.raffles);
    }
  }, [createRaffleQuery.isSuccess, router]);

  return (
    <section>
      <div className="flex items-end justify-between pb-4 border-b-1 border-white/50">
        <h3 className="text-2xl font-bold">Create New Raffle</h3>
        <div className="space-x-2">
          <Link
            className="font-bold text-white"
            href={APP_ROUTES.creator.raffles}
          >
            Back To Home
          </Link>
        
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto my-6"
        >
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Basic Info</h4>
          </div>
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <InputField label="Project Name" name="projectName" />
            <InputField label="Image URL" name="metadata.logoUrl" />
            <InputField label="Banner URL" name="metadata.bannerUrl" />
            <div className="col-span-2">
              <TextArea
                fullWidth
                label="Description"
                name="metadata.description"
              />
            </div>
            <div className="col-span-2">
              <LinkInput
                label="Website"
                name="metadata.links.website"
                placeholder="https://yourwebsite.com"
                icon={<RiEarthLine />}
              />
            </div>
            <div className="col-span-2">
              <LinkInput
                label="Twitter"
                name="metadata.links.twitter"
                icon={<SiTwitter />}
              />
            </div>
            <div className="col-span-2">
              <LinkInput
                label="Discord"
                name="metadata.links.discord"
                icon={<SiDiscord />}
              />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Raffle Info</h4>
          </div>
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <InputField
              label="Number of Winners"
              name="raffleDetails.numberOfWinners"
              type="number"
            />

            <InputField
              label="Supply"
              name="raffleDetails.supply"
              type="number"
            />
            <DatePicker label="Start Date" name="raffleDetails.startDate" />
            <DatePicker label="End Date" name="raffleDetails.endDate" />
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Mint Details</h4>
          </div>
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <InputField
              label='Public Mint Price (in "ETH")'
              name="mintDetails.publicMintPrice"
              type="number"
            />
            <div className="grid items-end">
              <DatePicker
                label="Public Mint Date"
                name="mintDetails.publicMintDate"
              />
            </div>
            <InputField
              label='Whitelist Mint Price (in "ETH")'
              name="mintDetails.whitelistMintPrice"
              type="number"
            />
            <div className="grid items-end">
              <DatePicker
                label="Whitelist Mint Date"
                name="mintDetails.whitelistMintDate"
              />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Entry Tasks</h4>
          </div>
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <div className="col-span-2">
              <ArrayInput
                label="Discord Server Follow"
                name="entryTasks.discordServerFollow"
                placeholder="Your Server ID"
              />
            </div>
            <div className="col-span-2">
              <ArrayInput
                label="Twitter Follow"
                name="entryTasks.twitterFollow"
                placeholder="Your Twitter"
              />
            </div>
            <div className="col-span-2">
              <ArrayInput
                label="Twitter Retweet"
                name="entryTasks.twitterRetweet"
                placeholder="Your Tweet URL"
              />
            </div>

            <div className="col-span-2">
              <ArrayInput
                label="Twitter Like"
                name="entryTasks.twitterLike"
                placeholder="Your Tweet URL"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <Link
              href={APP_ROUTES.creator.raffles}
              className="p-1 px-4 font-semibold rounded outline-none bg-white/50 focus:outline-white/50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-1 font-semibold rounded outline-none bg-creator-light focus:outline-creator-light"
            >
              Create Raffle
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default NewRuffleForm;
