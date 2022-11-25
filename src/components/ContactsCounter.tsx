import React from "react";
import Badge from "@mui/material/Badge";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import { useAppSelector } from "../store/hooks";
import { selectContacts } from "../store/modules/ContactsSlice";

const ContactsCounter: React.FC = () => {
  const contactsRedux = useAppSelector(selectContacts);

  return (
    <Badge badgeContent={contactsRedux.length} color="secondary">
      <PhoneIcon />
    </Badge>
  );
};

export default ContactsCounter;
