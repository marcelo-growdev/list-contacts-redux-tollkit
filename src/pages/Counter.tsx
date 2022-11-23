import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import FormContact from "../components/FormContact/FormContact";
import { ContactType } from "../types";
import ItemContact from "../components/ItemContact/ItemContact";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { aumentar, diminuir, somarValor } from "../store/modules/CounterSlice";
import { Link } from "react-router-dom";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const counterRedux = useAppSelector((state) => state.counter);

  const handleAdd = () => {
    dispatch(aumentar());
  };

  const handleD = () => {
    dispatch(diminuir());
  };

  const handle10 = () => {
    dispatch(somarValor(10));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          Contador com Redux <Link to={"/"}>Voltar pra Home</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAdd}>
          Aumentar
        </Button>
        <Button variant="contained" onClick={handle10}>
          Aumentar 10x
        </Button>
        <Button variant="outlined" onClick={handleD}>
          Diminuir
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h1">{counterRedux.value}</Typography>
      </Grid>
    </Grid>
  );
};

export default Counter;
