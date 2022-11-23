import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import FormContact from "../components/FormContact/FormContact";
import { ContactType } from "../types";
import ItemContact from "../components/ItemContact/ItemContact";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { addContact, deleteContact } from "../store/modules/ContactsSlice";

const Home: React.FC = () => {
  const [saveStorage, setSaveStorage] = useState<boolean>(false);
  const contactsRedux = useAppSelector((state) => state.contacts);
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
    dispatch(deleteContact(contact));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormContact action={handleAddContact} />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {contactsRedux.map((item) => {
            return (
              <ItemContact
                key={item.name}
                contact={item}
                actionDelete={() => handleDeleteContact(item)}
              />
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
