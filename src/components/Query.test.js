import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Query from "./Query";

// Mock das funções do Firebase
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("../context/firebase", () => ({
  db: {},
}));

describe("Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o número de vagas corretamente", async () => {
    const mockVagas = [
      { id: "1", tipo: "tecnologia", titulo: "Vaga 1", capa: "url1", descricao: "Descrição 1", preco: 1000, nomeUsuario: "Usuário 1" },
      { id: "2", tipo: "tecnologia", titulo: "Vaga 2", capa: "url2", descricao: "Descrição 2", preco: 2000, nomeUsuario: "Usuário 2" },
    ];

    getDocs.mockResolvedValueOnce({
      docs: mockVagas.map((vaga) => ({
        id: vaga.id,
        data: () => vaga,
      })),
    });

    render(
      <Router>
        <Query tipo="tecnologia" />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("2 resultados encontrados")).toBeInTheDocument();
    });
  });

  it("deve exibir as vagas corretamente", async () => {
    const mockVagas = [
      { id: "1", tipo: "tecnologia", titulo: "Vaga 1", capa: "url1", descricao: "Descrição 1", preco: 1000, nomeUsuario: "Usuário 1" },
      { id: "2", tipo: "tecnologia", titulo: "Vaga 2", capa: "url2", descricao: "Descrição 2", preco: 2000, nomeUsuario: "Usuário 2" },
    ];

    getDocs.mockResolvedValueOnce({
      docs: mockVagas.map((vaga) => ({
        id: vaga.id,
        data: () => vaga,
      })),
    });

    render(
      <Router>
        <Query tipo="tecnologia" />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Vaga 1")).toBeInTheDocument();
      expect(screen.getByText("Vaga 2")).toBeInTheDocument();
    });
  });
});
