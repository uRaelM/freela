import LoginVideo from "../public/loginvideo.mp4";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  db,
  auth,
  collection,
  query,
  where,
  getDocs,
} from "../context/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

import { VagaDelete } from "../functions/VagaDelete";

export default function Perfil() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("Sessao inválida", {
          duration: 4000,
          position: "top-center",
        });
        navigate("/entrar");
      } else if (user.uid !== userId) {
        toast.error("Sessao inválida", {
          duration: 4000,
          position: "top-center",
        });
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vagasCollection = collection(db, "vagas");
        // Crie a consulta filtrada
        const q = query(vagasCollection, where("IdUsuario", "==", userId));
        const vagasSnapshot = await getDocs(q);
        // Inclua os IDs dos documentos nos dados retornados
        const vagasArray = vagasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVagas(vagasArray);
      } catch (error) {
        console.error("Error fetching vagas: ", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const excluirVaga = async (vagaId) => {
    const result = await VagaDelete(vagaId);

    if (result) {
      console.error("Erro ao excluir a vaga: ", result);
    } else {
      toast.success("Vaga excluida com sucesso!", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      window.location.reload();
    }
  };

  return (
    <div class="container">
      <div class="leftContainer">
        <video autoPlay loop muted>
          <source src={LoginVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="rightContainer" style={{ justifyContent: "flex-start" }}>
        <div class="rightContent">
          <button class="backButton" onClick={() => navigate("/")}>
            <svg
              class="icon"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="1" id="_1">
                <path d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
              </g>
            </svg>
            Voltar
          </button>
          <h1>Suas Vagas:</h1>
          <main>
            <div
              id="proposals"
              style={{
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "auto",
              }}
            >
              {vagas.map((vaga) =>
                vaga.IdUsuario === userId ? (
                  <div
                    className="proposal"
                    style={{ height: "420px" }}
                    key={vaga.id}
                  >
                    <img src={vaga.capa} alt="Thumbnail" />
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      <span
                        style={{
                          color: "var(--default-text-color)",
                          fontWeight: "400",
                        }}
                      >
                        Anúncio por:{" "}
                      </span>
                      {vaga.nomeUsuario}
                    </p>
                    <h3
                      style={{
                        color: "var(--default-text-color)",
                      }}
                    >
                      {vaga.titulo}
                    </h3>
                    <p
                      style={{
                        color: "var(--default-text-color)",
                        fontSize: ".9rem",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {vaga.descricao}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      A partir de R$ {vaga.preco}
                    </p>
                    <a
                      style={{
                        fontWeight: "bold",
                        color: "var(--default-dark-green)",
                      }}
                      href={`${location.pathname}/editar-vaga/${vaga.id}`}
                    >
                      Editar
                    </a>
                    <span
                      className="excluir"
                      style={{
                        fontWeight: "bold",
                        color: "var(--default-red)",
                      }}
                      onClick={() => excluirVaga(vaga.id)}
                    >
                      Excluir
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
