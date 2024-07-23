import { db } from "../context/firebase";
import { collection, addDoc } from "firebase/firestore";

export const VagaCreate = async (
  titulo,
  capa,
  descricao,
  tipo,
  preco,
  userId,
  user
) => {
  try {
    return await addDoc(collection(db, "vagas"), {
      titulo,
      capa,
      descricao,
      tipo,
      preco,
      IdUsuario: userId,
      nomeUsuario: user.displayName,
    });
  } catch (error) {
    return error;
  }
};
