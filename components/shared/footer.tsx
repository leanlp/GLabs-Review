import { TUserType } from "types";
import { FC } from "react";
import { SOCIAL_LINKS } from "data/social_links";
import ExternalLink from "./ExternalLink";

const Footer: FC = ({}) => {
  return (
    <footer className="h-12 bg-nfts-gradient">
      <div className="h-full page-container page-spacing">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex items-center space-x-6">
            {SOCIAL_LINKS.map((socialLink) => (
              <ExternalLink
                name={socialLink.name}
                key={socialLink.name}
                href={socialLink.url}
              >
                <socialLink.Icon className="text-2xl" />
              </ExternalLink>
            ))}
          </div>
          <div>
            <p className="text-center">
              © 2022 Stable
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#5349CB] to-[#4A91DA]">
                Strategies
              </span>{" "}
              | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
