import { useNavigate } from "react-router-dom";
import "./css/global.css";
import "./css/sign.css";
import LoginVideo from "../public/loginvideo.mp4";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <div class="container">
      <div class="leftContainer">
        <video autoPlay loop muted>
          <source src={LoginVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="rightContainer">
        <div class="rightContent">
          <button class="backButton">
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
          <form method="post" action="login_action.php">
            <h1>Cadastro</h1>
            <h2>
              Porfavor preencha com seu nome completo, email e senha para criar
              a sua conta.
            </h2>
            <label>Email</label>
            <input type="text" name="email" />
            <label>Senha</label>
            <input type="password" name="password" />
            <input type="submit" value="Cadastrar" />
            <span> Já tem uma conta? </span>
            <a
              onClick={() => navigate("/entrar")}
              style={{ color: "#118ab2", cursor: "pointer" }}
            >
              Entrar
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
