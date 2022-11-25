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
import FormContact from "../components/FormContact/FormContact";
import { ContactType } from "../types";
import ItemContact from "../components/ItemContact/ItemContact";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  addContact,
  deleteContact,
  selectContacts,
  updateContact,
} from "../store/modules/ContactsSlice";
import Message from "../components/Message";
import { setMessage } from "../store/modules/MessageSlice";
import { AlternateEmail } from "@mui/icons-material";

const Home: React.FC = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const contactsRedux = useAppSelector(selectContacts);
  const loginRedux = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginRedux.logged) {
      navigate("/login");
    }
  }, [loginRedux, navigate]);

  const handleAddContact = useCallback((contact: ContactType) => {
    dispatch(addContact(contact));
  }, []);

  const handleDeleteContact = useCallback((contact: ContactType) => {
    dispatch(deleteContact(contact.phone));
  }, []);

  const openEditModal = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleEditContact = useCallback((contact: ContactType) => {
    dispatch(
      updateContact({
        id: contact.phone,
        changes: { name: `${contact.name} Editado` },
      })
    );
  }, []);

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormContact action={handleAddContact} />
        <Message />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {contactsRedux.map((item) => {
            return (
              <ItemContact
                key={item.phone}
                contact={item}
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

export default Home;
