import React, { FC } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  name: string;
}

const ExternalLink: FC<Props> = ({ href, children, name }) => {
  return (
    <a
      title={name}
      rel="noreferrer noopener"
      href={href}
      target="_blank"
      key={name}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
