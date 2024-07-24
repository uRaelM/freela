import { addDoc, collection } from "firebase/firestore";
import { VagaCreate } from "./VagaCreate";

// Mock das funções do Firebase
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

describe("VagaCreate", () => {
  it("deve criar uma nova vaga com sucesso", async () => {
    // Mock do retorno da função addDoc
    const mockDocRef = { id: "12345" };
    addDoc.mockResolvedValueOnce(mockDocRef);

    const vagaData = {
      titulo: "Desenvolvedor Frontend",
      capa: "url_da_imagem",
      descricao: "Descrição da vaga",
      tipo: "Full-time",
      preco: 5000,
      userId: "user123",
      user: { displayName: "João" },
    };

    const result = await VagaCreate(
      vagaData.titulo,
      vagaData.capa,
      vagaData.descricao,
      vagaData.tipo,
      vagaData.preco,
      vagaData.userId,
      vagaData.user
    );

    expect(collection).toHaveBeenCalledWith(expect.any(Object), "vagas");
    expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
      titulo: vagaData.titulo,
      capa: vagaData.capa,
      descricao: vagaData.descricao,
      tipo: vagaData.tipo,
      preco: vagaData.preco,
      IdUsuario: vagaData.userId,
      nomeUsuario: vagaData.user.displayName,
    });
    expect(result).toEqual(mockDocRef);
  });

  it("deve retornar um erro se a criação da vaga falhar", async () => {
    const mockError = new Error("Erro ao criar vaga");
    addDoc.mockRejectedValueOnce(mockError);

    const vagaData = {
      titulo: "Desenvolvedor Backend",
      capa: "url_da_imagem",
      descricao: "Descrição da vaga",
      tipo: "Part-time",
      preco: 3000,
      userId: "user456",
      user: { displayName: "Maria" },
    };

    const result = await VagaCreate(
      vagaData.titulo,
      vagaData.capa,
      vagaData.descricao,
      vagaData.tipo,
      vagaData.preco,
      vagaData.userId,
      vagaData.user
    );

    expect(result).toEqual(mockError);
  });
});
