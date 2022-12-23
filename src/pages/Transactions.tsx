import React, { useCallback, useMemo, useState } from "react";
import { Fab, Grid, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  deleteTransaction,
  selectTransactions,
  Transaction,
} from "../store/modules/TransactionsSlice";

import ItemGeneric from "../components/ItemGeneric/ItemGeneric";
import { Box } from "@mui/system";
import ModalTransaction from "../components/ModalTransaction/ModalTransaction";
import {
  clearTransaction,
  setTransaction,
} from "../store/modules/TransactionSlice";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactionsRedux = useAppSelector(selectTransactions);
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"edit" | "create">("create");

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteTransaction(id));
  }, []);

  const handleEdit = useCallback((item: Transaction) => {
    dispatch(setTransaction(item));
    setActionType("edit");
    setOpen(true);
  }, []);

  const calculateTotal = useMemo(() => {
    let total: number = 0;

    transactionsRedux.forEach((item) => {
      if (item.type === "C") {
        total += item.value;
      } else {
        total -= item.value;
      }
    });

    return total;
  }, [transactionsRedux]);

  const closeModal = () => setOpen(false);

  const openModal = () => {
    setOpen(true);
    dispatch(clearTransaction());
    setActionType("create");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Saldo: R$ {calculateTotal}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ padding: "5px" }}>
            {transactionsRedux.map((item) => (
              <ItemGeneric
                key={item.id}
                actionDelete={() => handleDelete(item.id)}
                actionEdit={() => handleEdit(item)}
                transaction={item}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ position: "fixed", bottom: "50px", right: "50px" }}>
        <Fab color="primary" aria-label="add" onClick={openModal}>
          <AddIcon />
        </Fab>
      </Box>
      <ModalTransaction
        actionCancel={closeModal}
        open={open}
        actionType={actionType}
      />
    </>
  );
};

export default Transactions;
