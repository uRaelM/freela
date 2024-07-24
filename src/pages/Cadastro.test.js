import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cadastro from "./Cadastro";
import { auth, db } from "../context/firebase";
import toast from "react-hot-toast";

// Mock das funções do Firebase e toast
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("../context/firebase", () => ({
  auth: {},
  db: {},
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Cadastro", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o formulário de cadastro corretamente", () => {
    render(
      <Router>
        <Cadastro />
      </Router>
    );

    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome de Exibição")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("deve criar um novo usuário com sucesso", async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "user123", email: "test@example.com" },
    });
    updateProfile.mockResolvedValueOnce();
    setDoc.mockResolvedValueOnce();

    render(
      <Router>
        <Cadastro />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Nome de Exibição"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(updateProfile).toHaveBeenCalledWith(
        { uid: "user123", email: "test@example.com" },
        { displayName: "Test User" }
      );
      expect(setDoc).toHaveBeenCalledWith(
        doc(db, "usuarios", "user123"),
        { email: "test@example.com", name: "Test User" }
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Usuário criado e adicionado com sucesso!",
        { duration: 3000, position: "top-center" }
      );
    });
  });

  it("deve mostrar um erro se o email já estiver cadastrado", async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      message: "Firebase: Error (auth/email-already-in-use).",
    });

    render(
      <Router>
        <Cadastro />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Nome de Exibição"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email já cadastrado", {
        duration: 4000,
        position: "top-center",
      });
    });
  });

  it("deve mostrar um erro genérico se a criação do usuário falhar", async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      message: "Firebase: Error