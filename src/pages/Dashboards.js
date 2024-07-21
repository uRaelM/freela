import React, { useEffect, useState } from "react";
import "./css/global.css";
import "./css/dashboards.css";

import Programacao from "./icons/Programacao";
import Design from "./icons/Design";
import Marketing from "./icons/Marketing";
import Edicao from "./icons/Edicao";
import Consultoria from "./icons/Consultoria";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../context/firebase";

import Header from "../components/header";

export default function Dashboards() {
  const navigate = useNavigate();

  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vagasCollection = collection(db, "vagas");
        const vagasSnapshot = await getDocs(vagasCollection);
        const vagasArray = vagasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVagas(vagasArray);
      } catch (error) {
        console.error("Error fetching vagas: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <section id="banner">
        <div className="banner">
          <h1>
            Encontre o
            <span style={{ color: "var(--default-green)" }}>
              {" "}
              serviço de freelance
            </span>{" "}
            que você precisa agora mesmo
          </h1>
          <input
            type="text"
            name="search"
            placeholder="Pesquise por qualquer serviço"
          />
        </div>
      </section>

      <h1 className="cardstext">Os mais procurados</h1>

      <section id="cards">
        <div
          className="card"
          style={{ backgroundColor: "var(--default-red)" }}
          onClick={() => navigate("/tecnologia")}
        >
          <div className="white-svg">
            <Programacao />
          </div>
          <h2>Tecnologia</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-yellow)" }}
          onClick={() => navigate("/design")}
        >
          <div className="white-svg">
            <Design />
          </div>
          <h2>Design</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-green)" }}
          onClick={() => navigate("/marketing")}
        >
          <div className="white-svg">
            <Marketing />
          </div>
          <h2>Marketing</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-blue)" }}
          onClick={() => navigate("/edicao")}
        >
          <div className="white-svg">
            <Edicao />
          </div>
          <h2>Edição de Vídeo</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-dark-green)" }}
          onClick={() => navigate("/consultoria")}
        >
          <div className="white-svg">
            <Consultoria />
          </div>
          <h2>Consultoria</h2>
        </div>
      </section>

      <section id="textresults">
        <h3>{vagas.length} resultados encontrados</h3>
        <h4>
          Ordenado por:{" "}
          <span style={{ color: "#000000", marginInline: "10px" }}>
            Recomendados
          </span>
        </h4>
      </section>

      <main>
        <div id="proposals">
          {vagas.map((vaga, index) => (
            <div
              className="proposal"
              key={index}
              onClick={() => {
                navigate(`/vaga/${vaga.id}`);
              }}
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
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <div>
            <span className="logo" style={{ color: "var(--white)" }}>
              Freela
              <span style={{ color: "var(--default-green)", fontSize: "3rem" }}>
                .
              </span>
            </span>
          </div>
          <div>
            <span style={{ color: "var(--light-gray)" }}>
              Copyright © 2024 Freela
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
