import { Button, Fab, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useContext, useEffect, useState } from 'react';
import MarcaService from '../services/MarcaService';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import Confirmacao from '../components/Confirmacao';
import MensagemContext from '../contexts/MensagemContext';
import CarregandoContext from '../contexts/CarregandoContext';

const colunas = [
    { field: 'nome', headerName: 'Marca', width: 200 }
];

const useStyles = makeStyles(() => ({
    fab: {
        position: 'absolute',
        bottom: '100px',
        right: '100px',
    },
    actionsToolbar: {
        float: 'right'
    },
    actions: {
        top: '10px',
        marginLeft: '10px',
    }
}));

function ListagemMarcas() {
    const [marcas, setMarcas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState();
    const classes = useStyles();
    const history = useHistory();
    const [openDialog, setOpenDialog] = useState(false);
    const { setMensagem } = useContext(MensagemContext);
    const { setCarregando } = useContext(CarregandoContext);

    function alterar() {
        history.push('/alteracao-marca/' + marcaSelecionada.id);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function excluir() {
        setOpenDialog(true);
    }

    function handleConfirmDialog() {
        setOpenDialog(false);
        setCarregando(true);
        MarcaService.excluir(marcaSelecionada)
            .then(() => {
                setMarcaSelecionada(null);
                carregarMarcas();
                setMensagem("Marca excluída com sucesso!");
            })
            .finally(() => setCarregando(false));
    }

    // TODO: Avaliar remover disable na próxima linha
    // eslint-disable-next-line
    useEffect(() => carregarMarcas(), []);

    function carregarMarcas() {
        setCarregando(true);
        MarcaService.listar()
            .then(dados => setMarcas(dados))
            .finally(() => setCarregando(false));
    }

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={marcas} columns={colunas}
                onRowSelected={gridSelection => setMarcaSelecionada(gridSelection.data)}
            />

            <div className={classes.actionsToolbar}>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    disabled={!marcaSelecionada}
                    onClick={() => excluir()}>
                    Excluir
                        </Button>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="primary"
                    disabled={!marcaSelecionada}
                    onClick={() => alterar()}>
                    Alterar
                </Button>
            </div>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-marca')}>
                <AddIcon />
            </Fab>

            <Confirmacao
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDialog}
                title='Excluir Veículo'
                content='Confirma a exclusão?'
            />
        </div>
    );
}

export default ListagemMarcas;