import { render, screen } from "@testing-library/react";

import Confirmacao from "./Confirmacao";

describe("Validar componente de confirmação", () => {
    it("deve renderizar o dialog de confirmação com os argumentos passados", () => {
        render(
            <Confirmacao
                open={true}
                onClose={() => { }}
                title="Dojo de React Test"
                content="Primeiro teste"
                onConfirm={() => { }}
            />
        );

        expect(screen.getByText("Dojo de React Test")).toBeInTheDocument();
        expect(screen.getByText("Primeiro teste")).toBeInTheDocument();
        expect(screen.getByText("Confirmar")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });
});