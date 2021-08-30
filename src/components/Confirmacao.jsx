import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

function Confirmacao({ open, onClose, onConfirm, title, content }) {
    return <Dialog
        open={open}
        onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={onConfirm} color="primary" autoFocus>
                Confirmar
            </Button>
        </DialogActions>
    </Dialog>
}

export default Confirmacao;