import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../context/firebase";
import toast, { Toaster } from "react-hot-toast";

import "./css/criarvaga.css";

export default function CriarVaga() {
  const navigate = useNavigate();
  const auth = getAuth();

  // Estados para os inputs
  const [titulo, setTitulo] = useState("");
  const [capa, setCapa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        toast.error("Não foi identificado sessão de usuário", {
          duration: 4000,
          position: "top-center",
        });
        navigate("/entrar"); // Redireciona para a página de login se não houver usuário autenticado
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    try {
      if (!userId) {
        console.error("Nenhum usuário autenticado");
        return;
      }

      // Cria um novo documento na coleção "vagas" com um ID gerado automaticamente
      const docRef = doc(db, "vagas", `${titulo}-${new Date().getTime()}`);
      await setDoc(docRef, {
        titulo,
        capa,
        descricao,
        tipo,
        preco,
        IdUsuario: userId,
      });

      toast.success("Vaga criada com sucesso!", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao criar vaga", {
        duration: 4000,
        position: "top-center",
      });
      console.error("Erro ao criar a vaga:", error);
    }
  };

  return (
    <div className="container">
      <main className="container-main">
        <form onSubmit={handleSubmit}>
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
            <option value="programacao">Programação</option>
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
  );
}
