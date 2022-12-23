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
import { Transaction } from "../../store/modules/TransactionsSlice";

interface ItemGenericProps {
  contact?: ContactType;
  transaction?: Transaction;
  actionDelete: (data: ContactType | Transaction | undefined) => void;
  actionEdit: () => void;
}

const ItemGeneric: React.FC<ItemGenericProps> = ({
  contact,
  transaction,
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
              onClick={() => actionDelete(contact ? contact : transaction)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar>{contact ? contact.name[0] : transaction?.type}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={contact ? contact.name : `R$ ${transaction?.value}`}
          secondary={contact ? contact.name : transaction?.note}
        />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ItemGeneric;
