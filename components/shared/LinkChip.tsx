import { Chip } from "@mui/material";
import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";

interface ILinkChipProps {
  href: string;
  label: string;
  error?: boolean;
}

const LinkChip: FC<ILinkChipProps> = ({ href, label, error = false }) => {
  return (
    <Chip
      sx={(theme) => ({
        padding: "0.25rem 0.5rem",
        backgroundColor: error ? theme.palette.error.dark : undefined,
        cursor: "pointer",
        fontSize: "0.75rem",
        fontWeight: error ? 700 : 500,
        "&:hover": {
          backgroundColor: error
            ? theme.palette.error.main
            : theme.palette.action.hover,
        },
      })}
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      label={label}
      variant="filled"
      icon={<BiLinkExternal className="w-4 h-4" />}
    />
  );
};

export default LinkChip;
