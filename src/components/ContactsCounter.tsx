import React from "react";
import Badge from "@mui/material/Badge";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import { useAppSelector } from "../store/hooks";

const ContactsCounter: React.FC = () => {
  const contatcsRedux = useAppSelector((state) => state.contacts);

  return (
    <Badge badgeContent={contatcsRedux.length} color="secondary">
      <PhoneIcon />
    </Badge>
  );
};

export default ContactsCounter;
