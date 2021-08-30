import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext, useEffect } from 'react';
import MensagemContext from '../contexts/MensagemContext';

export default function Message() {
    const [open, setOpen] = React.useState(false);

    const { mensagem, setMensagem } = useContext(MensagemContext);

    useEffect(() => {
        if (mensagem) {
            setOpen(true);
        }
    }, [mensagem]);

    const handleClose = () => {
        setMensagem(null);
        setOpen(false);
    };

    let msgSnack;

    if (mensagem) {
        if (Array.isArray(mensagem)) {
            msgSnack = mensagem.reduce((res, msg) => `${res ? res + ' / ' : ''}${msg.parametro}: ${msg.mensagem}`, '');
        } else {
            msgSnack = mensagem + '';
        }
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={msgSnack}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}