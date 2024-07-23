import { db } from "../context/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const VagaUpdate = async (
  titulo,
  capa,
  descricao,
  tipo,
  preco,
  vagaId
) => {
  try {
    const vagaDocRef = doc(db, "vagas", vagaId);
    await updateDoc(vagaDocRef, {
      titulo,
      capa,
      descricao,
      tipo,
      preco,
    });
    return vagaDocRef;
  } catch (error) {
    return error;
  }
};
