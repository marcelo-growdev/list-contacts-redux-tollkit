import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { ProductType } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import FormProduct from "../components/FormProduct/FormProduct";
import {
  productAdd,
  productDelete,
  productsGetAll,
  selectProducts,
} from "../store/modules/ProductsSlice";
import { ProductSaveType } from "../types/ProductType";
import ItemProduct from "../components/ItemProduct/ItemProduct";

const Products: React.FC = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const productsRedux = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsGetAll());
  }, []);

  const handleAddProduct = useCallback((product: ProductSaveType) => {
    dispatch(productAdd(product));
  }, []);

  const handleDeleteContact = useCallback((product: ProductType) => {
    console.log("entrou aqiui");
    dispatch(productDelete(product.id));
  }, []);

  const openEditModal = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleEditContact = useCallback((product: ProductType) => {
    // dispatch(
    //   updateContact({
    //     id: contact.phone,
    //     changes: { name: `${contact.name} Editado` },
    //   })
    // );
  }, []);

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Produtos</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormProduct action={handleAddProduct} />
        <Message />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {productsRedux.map((item) => {
            return (
              <ItemProduct
                key={item.id}
                product={item}
                actionDelete={() => handleDeleteContact(item)}
                actionEdit={openEditModal}
              />
            );
          })}
        </Paper>
      </Grid>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Products;
