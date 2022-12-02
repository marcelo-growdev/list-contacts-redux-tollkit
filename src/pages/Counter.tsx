import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import FormContact from "../components/FormContact/FormContact";
import { ContactType } from "../types";
import ItemContact from "../components/ItemContact/ItemContact";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { aumentar, diminuir, somarValor } from "../store/modules/CounterSlice";
import { Link } from "react-router-dom";
import {
  addOneTransaction,
  selectTransactions,
} from "../store/modules/TransactionsSlice";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactionsRedux = useAppSelector(selectTransactions);

  const handleAdd = () => {
    const temId = new Date().getTime();
    dispatch(addOneTransaction({ id: temId, type: "C", value: 500 }));
  };

  const handleD = () => {
    const temId = new Date().getTime();
    dispatch(addOneTransaction({ id: temId, type: "D", value: 500 }));
  };

  const balance = useMemo(() => {
    const inTransaction = transactionsRedux.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === "C") {
          return accumulator + currentValue.value;
        } else {
          return accumulator;
        }
      },
      0
    );

    const outTransaction = transactionsRedux.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === "D") {
          return accumulator + currentValue.value;
        } else {
          return accumulator;
        }
      },
      0
    );

    return inTransaction - outTransaction;
  }, [transactionsRedux]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Saldo:{balance}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAdd}>
          Aumentar
        </Button>
        <Button variant="outlined" onClick={handleD}>
          Diminuir
        </Button>
      </Grid>
      <Grid item xs={12}>
        {transactionsRedux.map((item) => {
          return (
            <div key={item.id}>
              <Typography>{item.id}</Typography>
              <Typography>{item.type}</Typography>
              <Typography>{item.value}</Typography>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Counter;
