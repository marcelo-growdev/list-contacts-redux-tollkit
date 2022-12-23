import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateOne } from "../../store/modules/ProductsSlice";
import {
  createTransaction,
  selectTransactionById,
  Transaction,
  updateTransaction,
} from "../../store/modules/TransactionsSlice";

interface FormTransactionProps {
  actionType: "edit" | "create";
}

const labels = {
  edit: {
    label: "Editar",
  },
  create: {
    label: "Criar",
  },
};

const FormTransaction: React.FC<FormTransactionProps> = ({ actionType }) => {
  const [note, setNote] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("C");

  const transaction = useAppSelector((state) => state.transaction);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transaction.id !== 0) {
      setNote(transaction.note ? transaction.note : "");
      setValue(`${transaction.value}`);
      setType(transaction.type);
    }
  }, [transaction]);

  const handleSubmit = () => {
    switch (actionType) {
      case "edit":
        const dataEdit = {
          note,
          type,
          value: Number(value),
        } as Transaction;

        dispatch(
          updateTransaction({
            id: transaction.id,
            changes: dataEdit,
          })
        );
        break;

      default:
        const data = {
          id: new Date().getTime(),
          type,
          value: Number(value),
          note,
        } as Transaction;

        dispatch(createTransaction(data));
        clerData();
        break;
    }
  };

  const clerData = () => {
    setNote("");
    setType("C");
    setValue("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          type="text"
          fullWidth
          value={note}
          label="Descrição"
          variant="outlined"
          onChange={(ev) => setNote(ev.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Tipo"
            onChange={(ev) => setType(ev.target.value)}
          >
            <MenuItem value="C">Entrada</MenuItem>
            <MenuItem value="D">Saída </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <TextField
          type="number"
          fullWidth
          value={value}
          label="Digite um valor"
          variant="outlined"
          onChange={(ev) => setValue(ev.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={handleSubmit}>
          {labels[actionType].label}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormTransaction;
