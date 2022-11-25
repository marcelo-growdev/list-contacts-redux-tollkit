import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { ContactType } from "../../types";

interface ItemContactProps {
  contact: ContactType;
  actionDelete: (contact: ContactType) => void;
  actionEdit: () => void;
}

const ItemContact: React.FC<ItemContactProps> = ({
  contact,
  actionDelete,
  actionEdit,
}) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton
              onClick={() => actionEdit()}
              edge="end"
              aria-label="edit"
              sx={{ paddingRight: "20px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => actionDelete(contact)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
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
