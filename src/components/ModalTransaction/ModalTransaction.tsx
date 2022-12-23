import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import FormTransaction from "../FormTransaction";

interface ModalTransactionProps {
  actionType: "edit" | "create";
  open: boolean;
  actionCancel: () => void;
}

const ModalTransaction: React.FC<ModalTransactionProps> = ({
  actionType,
  open,
  actionCancel,
}) => {
  return (
    <Dialog open={open} onClose={actionCancel}>
      <DialogTitle>
        {actionType === "create" ? "Criar transação" : "Editar transação"}
        <IconButton
          aria-label="close"
          onClick={actionCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Utilize o formulário abaixo para salvar sua transação.
        </DialogContentText>
        <FormTransaction actionType={actionType} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalTransaction;
