import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";
import Header from "./Header";

// Mock das funções do Firebase
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("../context/firebase", () => ({
  auth: {},
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o logo corretamente", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logoElement = screen.getByText(/Freela/i);
    expect(logoElement).toBeInTheDocument();
  });

  it("deve mostrar o link de 'Entrar' quando o usuário não está autenticado", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const entrarLink = screen.getByText(/Entrar/i);
    expect(entrarLink).toBeInTheDocument();
  });

  it("deve mostrar o dropdown de perfil quando o usuário está autenticado", () => {
    jest.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      callback({ uid: "user123", displayName: "João" });
      return jest.fn();
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const profileLink = screen.getByText(/Perfil/i);
    expect(profileLink).toBeInTheDocument();

    fireEvent.click(profileLink);
    const dropdown = screen.getByRole("list");
    expect(dropdown).toBeInTheDocument();
  });

  it("deve chamar signOut quando o usuário clica em 'Sair'", async () => {
    jest.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      callback({ uid: "user123", displayName: "João" });
      return jest.fn();
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const profileLink = screen.getByText(/Perfil/i);
    fireEvent.click(profileLink);

    const logoutButton = screen.getByText(/Sair/i);
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalledWith(auth);
  });
});
