import { FC } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { Tooltip } from "@mui/material";

interface IVerificationLinkProps {
  site: "twitter" | "discord";
  link: string;
}

const Icon: FC<{
  site: "twitter" | "discord";
}> = ({ site }) => {
  if (site === "twitter") {
    return <FaTwitter />;
  } else if (site === "discord") {
    return <FaDiscord />;
  } else {
    return null;
  }
};

const VerificationLink: FC<IVerificationLinkProps> = ({ site, link }) => {
  return (
    <Tooltip title={link}>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`View on ${site}`}
        className="flex items-center text-sm font-semibold"
      >
        <Icon site={site} />
      </a>
    </Tooltip>
  );
};

export default VerificationLink;
