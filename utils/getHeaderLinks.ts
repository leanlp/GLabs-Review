import { TUserType } from "types";
import config from "config";

export default function getHeaderLinks(userType: TUserType) {
  const { APP_ROUTES } = config;

  const creatorHeader = [
    {
      title: "Raffles",
      href: APP_ROUTES.creator.raffles,
    },
    {
      title: "Participants",
      href: APP_ROUTES.creator.participants,
    },
    {
      title: "Analytics",
      href: APP_ROUTES.creator.analytics,
    },

    {
      title: "FAQs",
      href: APP_ROUTES.faqs,
    },
  ];

  const participantHeader = [
    {
      title: "Raffles",
      href: APP_ROUTES.participant,
    },

    {
      title: "FAQs",
      href: APP_ROUTES.faqs,
    },
  ];

  return userType === "Creator" ? creatorHeader : participantHeader;
}
