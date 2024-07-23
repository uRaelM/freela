import { db } from "../context/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const VagaDelete = async (vagaId) => {
  try {
    // Cria uma referência ao documento da vaga que você deseja excluir
    const vagaRef = doc(db, "vagas", vagaId);
    // Remove o documento
    await deleteDoc(vagaRef);
  } catch (error) {
    return error;
  }
};
