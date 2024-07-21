import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../context/firebase";
import toast from "react-hot-toast";

import Header from "../components/header";

export default function Vaga() {
  const navigate = useNavigate();

  const { vagaId } = useParams();
  const [vaga, setVaga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const vagaDoc = doc(db, "vagas", vagaId);
        const vagaSnapshot = await getDoc(vagaDoc);
        if (vagaSnapshot.exists()) {
          setVaga(vagaSnapshot.data());
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

  console.log(vaga);

  return (
    <>
      <Header />
      <section style={{ height: "60vh" }}>
        <div
          style={{
            height: "100%",
            marginTop: "6rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "400px", height: "auto" }}
              src={vaga.capa}
              alt="Thumbnail"
            />
          </div>
          <div>
            <h1
              style={{ color: "black", userSelect: "auto", fontSize: "2.5rem" }}
            >
              {vaga.titulo}
            </h1>
            <h2>{vaga.descricao}</h2>
            <h3>Apartir de R${vaga.preco}</h3>

            <h1
              style={{
                color: "var(--default-green)",
                fontSize: "2.5rem",
                marginTop: "40px",
              }}
            >
              Interessado?
            </h1>

            <h2>
              Preencha o campo a baixo com uma mensagem que será enviada para o
              email do profissional
            </h2>
            <textarea
              rows="6"
              placeholder="Digite sua proposta aqui..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <input type="submit" value="Enviar" />
          </div>
        </div>
      </section>
    </>
  );
}
