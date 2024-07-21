import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../context/firebase";
import toast from "react-hot-toast";

export default function EditarVaga() {
  const navigate = useNavigate();
  const auth = getAuth();

  const { vagaId } = useParams();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titulo, setTitulo] = useState(null);
  const [capa, setCapa] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [preco, setPreco] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        toast.error("Sessao inválida", {
          duration: 4000,
          position: "top-center",
        });
        navigate("/entrar"); // Redireciona para a página de login se não houver usuário autenticado
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const vagaDoc = doc(db, "vagas", vagaId);
        const vagaSnapshot = await getDoc(vagaDoc);
        if (vagaSnapshot.exists()) {
          setVaga(vagaSnapshot.data());
          setTitulo(vagaSnapshot.data().titulo);
          setCapa(vagaSnapshot.data().capa);
          setDescricao(vagaSnapshot.data().descricao);
          setPreco(vagaSnapshot.data().preco);
          setTipo(vagaSnapshot.data().tipo);
        } else {
          console.error("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaga();
  }, [vagaId]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    navigate("/");
    return toast.error(`Erro ${error}`, {
      duration: 4000,
      position: "top-center",
    });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const vagaDocRef = doc(db, "vagas", vagaId);
      await updateDoc(vagaDocRef, {
        titulo,
        capa,
        descricao,
        tipo,
        preco,
      });

      toast.success("Vaga atualizada com sucesso!", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao atualizar vaga", {
        duration: 4000,
        position: "top-center",
      });
      console.error("Erro ao atualizar a vaga:", error);
    }
  };

  return (
    <div>
      {vaga ? (
        <div className="container-criar-vaga">
          <main className="container-main">
            <form onSubmit={handleUpdate}>
              <h2>Título</h2>
              <input
                type="text"
                placeholder="Digite o título aqui..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <h2>Foto de capa</h2>
              <input
                type="text"
                placeholder="Coloque o link de uma imagem aqui..."
                value={capa}
                onChange={(e) => setCapa(e.target.value)}
              />
              <h2>Descrição</h2>
              <textarea
                rows="10"
                placeholder="Digite sua descrição aqui..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <h2>Tipo</h2>
              <select
                className="select-input"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="tecnologia">Tecnologia</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="edicao-video">Edição de vídeo</option>
                <option value="consultoria">Consultoria</option>
              </select>
              <h2>Preço</h2>
              <input
                placeholder="Digite o preço do seu serviço"
                type="text"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
              <input type="submit" value="Confirmar" />
            </form>
          </main>
        </div>
      ) : (
        <p>Vaga não encontrada</p>
      )}
    </div>
  );
}
