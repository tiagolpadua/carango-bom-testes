import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import MensagemContext from "../contexts/MensagemContext";
import Message from "./Message";


describe("Validar componente message", () => {
    it("deve renderizar o message com texto", () => {
        const setMensagem = jest.fn()
        const mensagem = 'Testando context'
        render(
            <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                <Message />
            </MensagemContext.Provider>
        );

        expect(screen.getByText('Testando context')).toBeInTheDocument();
    });

    it("não deve renderizar o message sem texto", () => {
        const setMensagem = jest.fn()
        const mensagem = null;
        // const { debug } =
        render(
            <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                <Message />
            </MensagemContext.Provider>
        );
        expect(screen.queryByTestId('iconClose')).not.toBeInTheDocument();
    });

    it("deve renderizar uma lista de mensagens", () => {
        const setMensagem = jest.fn()
        const mensagem = [{ parametro: 'param1', mensagem: 'msg1' }, { parametro: 'param2', mensagem: 'msg2' }]
        // const { debug } =
        render(
            <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                <Message />
            </MensagemContext.Provider>
        );
        // debug();

        expect(screen.getByText('param1: msg1 / param2: msg2')).toBeInTheDocument();
    });

    it("deve renderizar uma lista de mensagens vazia (?)", () => {
        const setMensagem = jest.fn()
        const mensagem = []
        // const { debug } =
        render(
            <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                <Message />
            </MensagemContext.Provider>

        );

        // debug();

        expect(screen.queryByTestId('iconClose')).toBeInTheDocument();
    });

    it("deve fechar a mensagem quando close for clicado", async () => {
        const setMensagem = jest.fn()
        let mensagem = 'Testando fechar mensagem'
        render(
            <MensagemContext.Provider value={{ mensagem, setMensagem }}>
                <Message />
            </MensagemContext.Provider>

        );

        expect(screen.getByText('Testando fechar mensagem')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('iconClose'))
        await waitForElementToBeRemoved(() => screen.getByText('Testando fechar mensagem'));
    });


});
