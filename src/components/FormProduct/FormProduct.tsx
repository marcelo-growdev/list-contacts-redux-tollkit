import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { ProductType } from "../../types";
import { ProductSaveType } from "../../types/ProductType";

interface FormProductProps {
  action: (product: ProductSaveType) => void;
}

const FormProduct: React.FC<FormProductProps> = ({ action }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const inputName = useRef<HTMLInputElement | undefined>();
  const inputPrice = useRef<HTMLInputElement | undefined>();

  const handleClear = () => {
    setName("");
    setPrice(0);
  };

  const handleSubmit = () => {
    if (name.length < 3) {
      alert("Preencha o nome do produto, min. 3 caractéres.");
      inputName.current?.focus();
      return;
    }

    if (price < 0) {
      alert("Preencha o preço do produto.");
      inputPrice.current?.focus();
      return;
    }

    action({ name, price });
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
          onChange={(ev) => setPrice(Number(ev.target.value))}
          label="Preço"
          value={price || ""}
          type="number"
          variant="outlined"
          inputRef={inputPrice}
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

export default FormProduct;
