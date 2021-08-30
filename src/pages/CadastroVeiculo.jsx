import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MensagemContext from '../contexts/MensagemContext';
import useErros from '../hooks/useErros';
import MarcaService from '../services/MarcaService';
import VeiculoService from '../services/VeiculoService';
import CarregandoContext from '../contexts/CarregandoContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function CadastroVeiculo() {
    const classes = useStyles();
    const [marcas, setMarcas] = useState([]);
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState("");
    const [modelo, setModelo] = useState("");
    const [valor, setValor] = useState("");
    const { setCarregando } = useContext(CarregandoContext);

    const history = useHistory();

    const { id } = useParams();

    const { setMensagem } = useContext(MensagemContext);

    const validacoes = {
        marca: dado => {
            if (dado) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Marca deve ser informada." }
            }
        },
        modelo: dado => {
            if (dado && dado.length >= 5) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Modelo deve ter ao menos 5 letras." }
            }
        },
        ano: dado => {
            const maxAno = (new Date().getFullYear() + 1);
            if (dado && dado >= 1900 && dado <= maxAno) {
                return { valido: true };
            } else {
                return { valido: false, texto: `Ano deve ser entre 1900 e ${maxAno}.` }
            }
        },
        valor: dado => {
            if (dado && dado > 0) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Valor deve ser maior que zero." }
            }
        }
    }

    // TODO: Avaliar remover disable na próxima linha
    useEffect(() => {
        if (id) {
            setCarregando(true);
            VeiculoService.consultar(id)
                .then(v => {
                    setMarca(v.marcaId);
                    setAno(v.ano);
                    setModelo(v.modelo);
                    setValor(v.valor);
                })
                .catch(() => history.push('/404'))
                .finally(() => setCarregando(false));
        }

        setCarregando(true);
        MarcaService.listar()
            .then(dados => setMarcas(dados))
            .finally(() => setCarregando(false));
    }, [id]); // eslint-disable-line

    const [erros, validarCampos, possoEnviar] = useErros(validacoes);

    function cancelar() {
        history.goBack();
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (possoEnviar()) {
                setCarregando(true);
                if (id) {
                    VeiculoService.alterar({ id: parseInt(id), marcaId: parseInt(marca), modelo, ano, valor })
                        .then(res => {
                            setMensagem('Veículo alterada com sucesso!');
                            history.goBack();
                        })
                        .catch(error => setMensagem(error))
                        .finally(() => setCarregando(false));
                } else {
                    VeiculoService.cadastrar({ marcaId: marca, modelo, ano, valor })
                        .then(() => {
                            setMensagem('Veículo cadastrado com sucesso');
                            setMarca("");
                            setModelo("");
                            setAno("");
                            setValor("");
                            history.goBack();
                        })
                        .catch(error => setMensagem(error))
                        .finally(() => setCarregando(false));
                }
            } else {
                setMensagem('Formulário com erros...');
            }
        }}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Marca</InputLabel>
                <Select
                    required
                    autoWidth
                    value={marca}
                    onChange={evt => setMarca(evt.target.value)}
                >
                    {marcas && marcas.map(m => <MenuItem key={m.id} value={m.id}>{m.nome}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField
                value={modelo}
                onChange={evt => setModelo(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.modelo.texto}
                error={!erros.modelo.valido}
                name="modelo"
                id="modelo"
                label="Modelo"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <TextField
                value={ano}
                onChange={evt => setAno(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.ano.texto}
                error={!erros.ano.valido}
                name="ano"
                id="ano"
                label="Ano"
                type="number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <TextField
                value={valor}
                onChange={evt => setValor(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.valor.texto}
                error={!erros.valor.valido}
                name="valor"
                id="valor"
                label="Valor"
                type="number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!possoEnviar()}
            >
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

export default CadastroVeiculo;