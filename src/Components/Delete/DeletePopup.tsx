import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { appColor } from "../../theme/appColor";
import CloseIcon from "@mui/icons-material/Close";

interface IDeletePopup {
  open: boolean;
  handleCloseDelete: (close: boolean) => void;
  onConfirm: () => Promise<void>;
  title: string;
  content: string;
}

const DeletePopup = ({
  open,
  handleCloseDelete,
  onConfirm,
  title,
  content,
}: IDeletePopup) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    handleCloseDelete(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error while deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ padding: 5,minWidth: 450 }}>
      <DialogTitle
        sx={{
          // paddingRight: "24px",
          // p: 4,
          // py: 3,
          // gap: 2,
          borderBottom: 1,
          borderColor: appColor.greenSmoke[20],
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ pt: 3 }}>{content}</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ paddingRight: "24px", p: 4, py: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<CloseIcon />}
          sx={{
            backgroundColor: "#b71c1c",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#b71c1c",
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: "#b71c1c",
              boxShadow: "none",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          variant="contained"
          startIcon={<Delete />}
          sx={{
            backgroundColor: "green",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "green",
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: "green",
              boxShadow: "none",
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
