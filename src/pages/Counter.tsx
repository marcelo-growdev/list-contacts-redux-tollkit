import React, { useMemo, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import {
  aumentar,
  aumentarComValor,
  diminuir,
} from "../store/modules/CounterSlice";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const counterRedux = useAppSelector((state) => state.counter);
  const [value, setValue] = useState<string>("");

  const handleAdd = () => {
    dispatch(aumentar());
  };

  const handleRemove = () => {
    dispatch(diminuir());
  };

  const handleValue = () => {
    dispatch(aumentarComValor(Number(value)));
    setValue("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Contador:{counterRedux.value}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAdd}>
          Aumentar
        </Button>
        <Button
          disabled={counterRedux.value ? false : true}
          variant="outlined"
          onClick={handleRemove}
        >
          Diminuir
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              type="number"
              fullWidth
              value={value}
              label="Digite um valor"
              variant="outlined"
              onChange={(ev) => setValue(ev.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleValue}>
              Aumentar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Counter;
