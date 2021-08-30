import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MensagemContext from '../contexts/MensagemContext';
import CarregandoContext from '../contexts/CarregandoContext';
import useErros from '../hooks/useErros';
import MarcaService from '../services/MarcaService';

function CadastroMarca() {

    const [marca, setMarca] = useState("");

    const history = useHistory();

    const { id } = useParams();

    const { setMensagem } = useContext(MensagemContext);
    const { setCarregando } = useContext(CarregandoContext);

    const validacoes = {
        marca: dado => {
            if (dado && dado.length >= 3) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Marca deve ter ao menos 3 letras." }
            }
        }
    }

    const [erros, validarCampos, possoEnviar] = useErros(validacoes);

    function cancelar() {
        history.goBack();
    }

    // TODO: Avaliar remover disable na próxima linha
    useEffect(() => {
        if (id) {
            setCarregando(true);
            MarcaService.consultar(id)
                .then(m => setMarca(m.nome))
                .catch(() => history.push('/404'))
                .finally(() => setCarregando(false));
        }
    }, [id]); // eslint-disable-line

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (possoEnviar()) {
                setCarregando(true);
                if (id) {
                    MarcaService.alterar({ id, nome: marca })
                        .then(res => {
                            setMensagem('Marca alterada com sucesso: ' + res.nome);
                            history.goBack();
                        })
                        .catch(error => setMensagem(error))
                        .finally(() => setCarregando(false));
                } else {
                    MarcaService.cadastrar({ nome: marca })
                        .then(res => {
                            setMensagem('Marca cadastrada com sucesso: ' + res.nome);
                            setMarca("");
                            history.goBack();
                        })
                        .catch(error => setMensagem(error))
                        .finally(() => setCarregando(false));
                }
            } else {
                setMensagem('Formulário com erros...');
            }
        }}>
            <TextField
                value={marca}
                onChange={evt => setMarca(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.marca.texto}
                error={!erros.marca.valido}
                name="marca"
                id="marca"
                label="Marca"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!possoEnviar()}>
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={cancelar}>
                Cancelar
            </Button>
        </form>
    );
}

export default CadastroMarca;