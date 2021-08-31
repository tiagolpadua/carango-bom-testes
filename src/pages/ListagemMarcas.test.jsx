import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { MemoryRouter, useLocation } from "react-router-dom";
import CarregandoContext from "../contexts/CarregandoContext";
import MensagemContext from "../contexts/MensagemContext";
import MarcaService from '../services/MarcaService';
import ListagemMarcas from "./ListagemMarcas";

jest.mock('../services/MarcaService', () => jest.fn());

describe("Validar a tela de listagem de marcas", () => {
    it("deve a listagem de marcas", async () => {

        MarcaService.listar = jest.fn(() => Promise.resolve([{ "id": 74, "nome": "CHEVROLET" }, { "id": 34, "nome": "FORD" }]));

        const setMensagem = jest.fn()
        const mensagem = null;

        const setCarregando = jest.fn()
        const carregando = false;

        render(
            <CarregandoContext.Provider value={{ carregando, setCarregando }}>
                <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                    <ListagemMarcas />
                </MensagemContext.Provider>
            </CarregandoContext.Provider >
        );

        const chevrolet = await waitFor(() => screen.getByText('CHEVROLET'));
        const ford = await waitFor(() => screen.getByText('FORD'));

        expect(chevrolet).toBeInTheDocument();
        expect(ford).toBeInTheDocument();
    });

    it("deve navegar ao clicar em alterar a marca", async () => {
        const history = createMemoryHistory();

        MarcaService.listar = jest.fn(() => Promise.resolve([{ "id": 74, "nome": "CHEVROLET" }, { "id": 34, "nome": "FORD" }]));

        const setMensagem = jest.fn();
        const mensagem = null;

        const setCarregando = jest.fn();
        const carregando = false;

        // const { debug } =
        render(
            <MemoryRouter history={history}>
                <CarregandoContext.Provider value={{ carregando, setCarregando }}>
                    <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                        <ListagemMarcas />
                    </MensagemContext.Provider>
                </CarregandoContext.Provider >
                <LocationDisplay />
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText('CHEVROLET'));
        await waitFor(() => screen.getByText('FORD'));

        userEvent.click(screen.getByText('FORD'));

        await waitFor(() => screen.getByText("1 row selected"));

        userEvent.click(screen.queryByTestId('btnAlterarMarca'));

        expect(screen.getByTestId('location-display')).toHaveTextContent('/alteracao-marca/34');
    });

    it("deve navegar ao clicar em adicionar", async () => {
        const history = createMemoryHistory();

        MarcaService.listar = jest.fn(() => Promise.resolve([{ "id": 74, "nome": "CHEVROLET" }, { "id": 34, "nome": "FORD" }]));

        const setMensagem = jest.fn();
        const mensagem = null;

        const setCarregando = jest.fn();
        const carregando = false;

        // const { debug } =
        render(
            <MemoryRouter history={history}>
                <CarregandoContext.Provider value={{ carregando, setCarregando }}>
                    <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                        <ListagemMarcas />
                    </MensagemContext.Provider>
                </CarregandoContext.Provider >
                <LocationDisplay />
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText('CHEVROLET'));
        await waitFor(() => screen.getByText('FORD'));

        userEvent.click(screen.queryByTestId('btnAdicionar'));

        expect(screen.getByTestId('location-display')).toHaveTextContent('/cadastro-marca');
    });

    it("deve excluir ao clicar em excluir", async () => {
        const history = createMemoryHistory();

        MarcaService.listar = jest.fn(() => Promise.resolve([{ "id": 74, "nome": "CHEVROLET" }, { "id": 34, "nome": "FORD" }]));
        MarcaService.excluir = jest.fn(() => Promise.resolve());

        const setMensagem = jest.fn();
        const mensagem = null;

        const setCarregando = jest.fn();
        const carregando = false;

        // const { debug } =
        render(
            <MemoryRouter history={history}>
                <CarregandoContext.Provider value={{ carregando, setCarregando }}>
                    <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                        <ListagemMarcas />
                    </MensagemContext.Provider>
                </CarregandoContext.Provider >
                <LocationDisplay />
            </MemoryRouter>
        );

        // debug();

        await waitFor(() => screen.getByText('CHEVROLET'));
        await waitFor(() => screen.getByText('FORD'));

        userEvent.click(screen.getByText('FORD'));

        await waitFor(() => screen.getByText("1 row selected"));

        // Abre a modal e cancela

        userEvent.click(screen.queryByTestId('btnExcluirMarca'));

        await waitFor(() => screen.getByText("Excluir Marca"));

        userEvent.click(screen.queryByTestId('btnDialogCancelar'));

        await waitForElementToBeRemoved(() => screen.getByText('Excluir Marca'));

        // Abre a modal e confirma

        userEvent.click(screen.queryByTestId('btnExcluirMarca'));

        await waitFor(() => screen.getByText("Excluir Marca"));

        userEvent.click(screen.queryByTestId('btnDialogConfirmar'));

        await waitForElementToBeRemoved(() => screen.getByText('Excluir Marca'));

        expect(MarcaService.excluir).toHaveBeenCalledWith({ "id": 34, "nome": "FORD" });
    });
});

export const LocationDisplay = () => {
    const location = useLocation();

    return <div data-testid="location-display">{location.pathname}</div>
}