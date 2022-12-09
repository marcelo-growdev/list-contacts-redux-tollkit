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
import { ProductType } from "../../types";

interface ItemProductProps {
  product: ProductType;
  actionDelete: (product: ProductType) => void;
  actionEdit: () => void;
}

const ItemProduct: React.FC<ItemProductProps> = ({
  product,
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
              onClick={() => actionDelete(product)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt={product.name} />
        </ListItemAvatar>
        <ListItemText primary={product.name} secondary={product.price} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ItemProduct;
