import { doc, updateDoc } from "firebase/firestore";
import { VagaUpdate } from "./VagaUpdate";

// Mock das funções do Firebase
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe("VagaUpdate", () => {
  it("deve atualizar uma vaga com sucesso", async () => {
    // Mock do retorno da função updateDoc
    const mockDocRef = { id: "12345" };
    updateDoc.mockResolvedValueOnce();

    const vagaData = {
      titulo: "Desenvolvedor Fullstack",
      capa: "url_da_imagem",
      descricao: "Descrição atualizada da vaga",
      tipo: "Full-time",
      preco: 7000,
      vagaId: "vaga123",
    };

    const result = await VagaUpdate(
      vagaData.titulo,
      vagaData.capa,
      vagaData.descricao,
      vagaData.tipo,
      vagaData.preco,
      vagaData.vagaId
    );

    expect(doc).toHaveBeenCalledWith(expect.any(Object), "vagas", vagaData.vagaId);
    expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
      titulo: vagaData.titulo,
      capa: vagaData.capa,
      descricao: vagaData.descricao,
      tipo: vagaData.tipo,
      preco: vagaData.preco,
    });
    expect(result).toEqual(mockDocRef);
  });

  it("deve retornar um erro se a atualização da vaga falhar", async () => {
    const mockError = new Error("Erro ao atualizar vaga");
    updateDoc.mockRejectedValueOnce(mockError);

    const vagaData = {
      titulo: "Desenvolvedor Backend",
      capa: "url_da_imagem",
      descricao: "Descrição da vaga",
      tipo: "Part-time",
      preco: 3000,
      vagaId: "vaga456",
    };

    const result = await VagaUpdate(
      vagaData.titulo,
      vagaData.capa,
      vagaData.descricao,
      vagaData.tipo,
      vagaData.preco,
      vagaData.vagaId
    );

    expect(result).toEqual(mockError);
  });
});
