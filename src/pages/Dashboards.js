import React, { useEffect, useState } from "react";
import "./css/global.css";
import "./css/dashboards.css";

import Programacao from "./icons/Programacao";
import Design from "./icons/Design";
import Marketing from "./icons/Marketing";
import Edicao from "./icons/Edicao";
import Consultoria from "./icons/Consultoria";
import { useNavigate } from "react-router-dom";

export default function Dashboards() {
  const navigate = useNavigate();

  const [films, setFilms] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Substitua a URL pela sua API
    fetch("/api/films")
      .then((response) => response.json())
      .then((data) => {
        setFilms(data);
        setResultsCount(data.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <header>
        <div className="header-content">
          <span className="logo">
            Freela
            <span style={{ color: "var(--default-green)", fontSize: "3rem" }}>
              .
            </span>
          </span>
          <span
            className="profile"
            onClick={toggleDropdown}
            style={{ marginLeft: "auto", userSelect: "none" }}
          >
            Perfil
          </span>
          <div className="wrapper">
            <div
              id="DropDown"
              className={`dropdown ${isVisible ? "" : "hidden"}`}
            >
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/criar-vaga");
                    }}
                  >
                    Tornece um prestador
                  </a>
                </li>
                <li style={{ color: "#ef476f", borderBottom: "none" }}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
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
        <div className="card" style={{ backgroundColor: "var(--default-red)" }}>
          <div className="white-svg">
            <Programacao />
          </div>
          <h2>Programação</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-yellow)" }}
        >
          <div className="white-svg">
            <Design />
          </div>
          <h2>Design</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-green)" }}
        >
          <div className="white-svg">
            <Marketing />
          </div>
          <h2>Marketing</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-blue)" }}
        >
          <div className="white-svg">
            <Edicao />
          </div>
          <h2>Edição de Vídeo</h2>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "var(--default-dark-green)" }}
        >
          <div className="white-svg">
            <Consultoria />
          </div>
          <h2>Consultoria</h2>
        </div>
      </section>

      <section id="textresults">
        <h3>{resultsCount} resultados encontrados</h3>
        <h4>
          Ordenado por:{" "}
          <span style={{ color: "#000000", marginInline: "10px" }}>
            Recomendados
          </span>
        </h4>
      </section>

      <main>
        <div id="proposals">
          {films.map((film, index) => (
            <div className="proposal" key={index}>
              <img src={film.thumbnail} alt="Thumbnail" />
              <h3>{film.title}</h3>
              <p>Year: {film.year}</p>
              <p>Rating: {film.rating}</p>
              <a href={`edit.php?id=${film.id}`}>EDIT</a>
              <a href={`delete.php?id=${film.id}`}>DELETE</a>
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
