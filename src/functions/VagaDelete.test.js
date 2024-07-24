import { doc, deleteDoc } from "firebase/firestore";
import { VagaDelete } from "./VagaDelete";

// Mock das funções do Firebase
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("VagaDelete", () => {
  it("deve excluir uma vaga com sucesso", async () => {
    // Mock do retorno da função deleteDoc
    deleteDoc.mockResolvedValueOnce();

    const vagaId = "vaga123";

    const result = await VagaDelete(vagaId);

    expect(doc).toHaveBeenCalledWith(expect.any(Object), "vagas", vagaId);
    expect(deleteDoc).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toBeUndefined();
  });

  it("deve retornar um erro se a exclusão da vaga falhar", async () => {
    const mockError = new Error("Erro ao excluir vaga");
    deleteDoc.mockRejectedValueOnce(mockError);

    const vagaId = "vaga456";

    const result = await VagaDelete(vagaId);

    expect(result).toEqual(mockError);
  });
});
