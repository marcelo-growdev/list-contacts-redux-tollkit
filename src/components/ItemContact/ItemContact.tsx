import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { ContactType } from "../../types";

interface ItemContactProps {
  contact: ContactType;
  actionDelete: (contact: ContactType) => void;
}

const ItemContact: React.FC<ItemContactProps> = ({ contact, actionDelete }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            onClick={() => actionDelete(contact)}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar alt={contact.name} />
        </ListItemAvatar>
        <ListItemText primary={contact.name} secondary={contact.phone} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ItemContact;
