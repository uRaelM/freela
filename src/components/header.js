import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário desconectado com sucesso!");
    } catch (error) {
      console.error("Erro ao desconectar: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está autenticado
        setUser(user);
      } else {
        // Usuário não está autenticado
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header>
      <div className="header-content">
        <span className="logo" onClick={() => navigate("/")}>
          Freela
          <span style={{ color: "var(--default-green)", fontSize: "3rem" }}>
            .
          </span>
        </span>
        {user ? (
          <>
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
                  <li
                    onClick={() => {
                      navigate(`/perfil/${user.uid}`);
                    }}
                  >
                    <a href={`/perfil/${user.uid}`}>Perfil</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate("/criar-vaga");
                    }}
                  >
                    <a href="/criar-vaga">Torne-se um prestador</a>
                  </li>
                  <li
                    style={{ color: "#ef476f", borderBottom: "none" }}
                    onClick={handleLogout}
                  >
                    Sair
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <span
            className="profile"
            onClick={() => navigate("/entrar")}
            style={{ marginLeft: "auto", userSelect: "none" }}
          >
            Entrar
          </span>
        )}
      </div>
    </header>
  );
}
