// react import
import React from "react";
import toast from "react-hot-toast";
// components import
import Iconify from "@core/components/iconify";
// @mui import
import { IconButton } from "@mui/material";
import useClipboard from "react-use-clipboard";

export const CopiedBtn = ({ title, text, icon }) => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 2000,
  });

  React.useEffect(() => {
    if(isCopied) {
      toast.success(`${title} copied!`)
    }
  }, [isCopied]);

  return (
    <IconButton sx={{ color: "text.secondary", display: icon ? "contents" : "flex" }} onClick={setCopied}>
      <Iconify
        icon={`${isCopied ? "mdi:check" : icon ? icon : "mdi:content-copy"}`}
      />
    </IconButton>
  )
};
