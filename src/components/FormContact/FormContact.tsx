import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { ContactType } from "../../types";

interface FormContactProps {
  action: (contact: ContactType) => void;
}

const FormContact: React.FC<FormContactProps> = ({ action }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const inputName = useRef<HTMLInputElement | undefined>();
  const inputPhone = useRef<HTMLInputElement | undefined>();

  const handleClear = () => {
    setName("");
    setPhone("");
  };

  const handleSubmit = () => {
    if (name.length < 3) {
      alert("Preencha o nome, min. 3 caractéres.");
      inputName.current?.focus();
      return;
    }

    if (phone.length < 11) {
      alert("Preencha o telefone, min. 11 caractéres.");
      inputPhone.current?.focus();
      return;
    }

    action({ name, phone });
    handleClear();
  };

  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) => setName(ev.target.value)}
          label="Nome"
          value={name || ""}
          variant="outlined"
          inputRef={inputName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) => setPhone(ev.target.value)}
          label="Telefone"
          value={phone || ""}
          variant="outlined"
          inputProps={{ maxLength: 11 }}
          inputRef={inputPhone}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={handleClear} variant="outlined">
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormContact;
