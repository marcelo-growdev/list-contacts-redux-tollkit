import React, { useMemo, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import { aumentarComValor, diminuir } from "../store/modules/CounterSlice";
import {
  createTransaction,
  deleteTransaction,
  selectTransactions,
} from "../store/modules/TransactionsSlice";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactionsRedux = useAppSelector(selectTransactions);
  const [value, setValue] = useState<string>("");

  const handleIn = () => {
    const time = new Date().getTime();
    dispatch(createTransaction({ value: Number(value), type: "C", id: time }));
  };

  const handleOut = () => {
    const time = new Date().getTime();
    dispatch(createTransaction({ value: Number(value), type: "D", id: time }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Saldo: R$ 0</Typography>
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
            <Button variant="contained" onClick={handleIn}>
              Entrada
            </Button>
            <br />
            <br />
            <Button variant="outlined" onClick={handleOut}>
              Saída
            </Button>
          </Grid>
          {transactionsRedux.map((item) => (
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="button"
                onClick={() => handleDelete(item.id)}
              >
                R$ {item.value} - {item.type}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Transactions;
