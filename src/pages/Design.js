import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import Query from "../components/query";

export default function DesignQuery() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Header />

      <section style={{ marginTop: "3rem" }}>
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
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "100",
            letterSpacing: "-.15rem",
          }}
        >
          Design
        </h1>
        <h2>
          Destaque-se da multidão com um logotipo que expresse a personalidade
          da sua marca.
        </h2>
      </section>

      <Query tipo={"design"} />

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
    </div>
  );
}
