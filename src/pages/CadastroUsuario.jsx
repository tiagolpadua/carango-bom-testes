import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import MensagemContext from '../contexts/MensagemContext';
import CarregandoContext from '../contexts/CarregandoContext';
import useErros from '../hooks/useErros';
import UsuarioService from '../services/UsuarioService';

function CadastroUsuario() {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const { setCarregando } = useContext(CarregandoContext);

    const { setMensagem } = useContext(MensagemContext);

    const validacoes = {
        usuario: dado => {
            if (dado && dado.length >= 5) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Usuário deve ter ao menos 5 letras." }
            }
        },
        senha: dado => {
            if (dado && dado.length >= 6) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Senha deve ter ao menos 5 letras." }
            }
        },
        senhaConfirmacao: dado => {
            if (dado && dado === senha) {
                return { valido: true };
            } else {
                return { valido: false, texto: "Senha deve ser igual à confirmação." }
            }
        }
    }

    const [erros, validarCampos, possoEnviar] = useErros(validacoes);

    const history = useHistory();

    function cancelar() {
        history.goBack();
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (possoEnviar()) {
                setCarregando(true);
                UsuarioService.cadastrar({ usuario, senha })
                    .then(() => {
                        setMensagem('Usuário cadastrado com sucesso!');
                        history.push('/usuarios');
                    })
                    .catch(error => setMensagem(error))
                    .finally(() => setCarregando(false));
            } else {
                setMensagem('Formulário com erros...');
            }
        }}>
            <TextField
                value={usuario}
                onChange={evt => setUsuario(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.usuario.texto}
                error={!erros.usuario.valido}
                name="usuario"
                id="usuario"
                label="Usuário"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <TextField
                value={senha}
                onChange={evt => setSenha(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.senha.texto}
                error={!erros.senha.valido}
                name="senha"
                id="senha"
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <TextField
                value={senhaConfirmacao}
                onChange={evt => setSenhaConfirmacao(evt.target.value)}
                onBlur={validarCampos}
                helperText={erros.senhaConfirmacao.texto}
                error={!erros.senhaConfirmacao.valido}
                name="senhaConfirmacao"
                id="senhaConfirmacao"
                label="Confirmação da Senha"
                type="password"
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
                Cadastrar
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

export default CadastroUsuario;