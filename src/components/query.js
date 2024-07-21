import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../context/firebase";

export default function Query({ tipo }) {
  const [vagas, setVagas] = useState([]);
  const [numVagas, setNumVagas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vagasCollection = collection(db, "vagas");
        const vagasSnapshot = await getDocs(vagasCollection);
        const vagasData = vagasSnapshot.docs.map((doc) => doc.data());
        setVagas(vagasData);

        const consultoriaCount = vagasData.filter(
          (vaga) => vaga.tipo === tipo
        ).length;
        setNumVagas(consultoriaCount);
      } catch (error) {
        console.error("Error fetching vagas: ", error);
      }
    };

    fetchData();
  }, [tipo]);

  return (
    <>
      <section id="textresults">
        <h3>{numVagas} resultados encontrados</h3>
        <h4>
          Ordenado por:{" "}
          <span style={{ color: "#000000", marginInline: "10px" }}>
            Recomendados
          </span>
        </h4>
      </section>

      <main>
        <div id="proposals">
          {vagas.map((vaga, index) =>
            vaga.tipo === tipo ? (
              <div className="proposal" key={index}>
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
            ) : null
          )}
        </div>
      </main>
    </>
  );
}
