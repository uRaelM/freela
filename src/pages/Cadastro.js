import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginVideo from "../public/loginvideo.mp4";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../context/firebase";
import toast, { Toaster } from "react-hot-toast";

import "./css/global.css";
import "./css/sign.css";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(email, password, name);
  };

  const registerUser = async (email, password, name) => {
    setCarregando(true);
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Adiciona informações do usuário no Firestore
      const userRef = doc(db, "usuarios", user.uid);
      await setDoc(userRef, {
        email: user.email,
        name: name,
      });

      toast.success("Usuário criado e adicionado com sucesso!", {
        duration: 3000,
        position: "top-center",
      });

      console.log("Usuário criado e adicionado com sucesso:", user.uid);

      setTimeout(() => {
        navigate("/");
      }, 1000);

      return user;
    } catch (error) {
      setCarregando(false);
      toast.error("Erro ao criar usuário", {
        duration: 4000,
        position: "top-center",
      });
      console.error("Erro ao criar usuário:", error.message);
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
          <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <h2>
              Porfavor preencha com seu nome completo, email e senha para criar
              a sua conta.
            </h2>
            <label>Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              required
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            {carregando ? (
              <input
                type="submit"
                value="Carregando..."
                style={{ background: "var(--default-green-with-overlay)" }}
                disabled={carregando}
              />
            ) : (
              <input type="submit" value="Cadastrar" disabled={carregando} />
            )}
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
