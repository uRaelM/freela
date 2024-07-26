import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../context/firebase";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "../components/header";

export default function Vaga() {
  const emailServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const emailTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const emailUserId = process.env.REACT_APP_EMAILJS_USER_ID;

  const navigate = useNavigate();
  const auth = getAuth();

  const [user, setUser] = useState("");

  const { vagaId } = useParams();
  const [vaga, setVaga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [usuarioNome, setUsuarioNome] = useState("");
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [prestadorEmail, setPrestadorEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioNome(user.displayName);
        setUsuarioEmail(user.email);
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const vagaDoc = doc(db, "vagas", vagaId);
        const vagaSnapshot = await getDoc(vagaDoc);
        if (vagaSnapshot.exists()) {
          setPrestadorEmail(vagaSnapshot.data().email);
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

  const enviarEmail = async () => {
    if (!mensagem) {
      toast.error(`Mensagem não pode ser vazia`, {
        duration: 4000,
        position: "top-center",
      });
    } else if (user) {
      const templateParams = {
        assunto: vaga.titulo,
        mensagem: mensagem,
        nome_usuario: usuarioNome,
        prestador_email: prestadorEmail,
        usuario_email: usuarioEmail,
      };

      console.log(templateParams);

      try {
        emailjs
          .send(emailServiceId, emailTemplateId, templateParams, emailUserId)
          .then(
            (response) => {
              toast.success(
                "Email enviado para o Prestador de Serviço com sucesso!!!",
                {
                  duration: 4000,
                  position: "top-center",
                }
              );
            },
            (error) => {
              toast.error(`${error} ao enviar o Email`, {
                duration: 4000,
                position: "top-center",
              });
            }
          );
      } catch (error) {
        toast.error("Erro ao enviar o Email", {
          duration: 4000,
          position: "top-center",
        });
      }
    } else {
      toast.error(`Entre em uma conta para poder enviar uma proposta`, {
        duration: 4000,
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/entrar");
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <section style={{ height: "60vh" }}>
        <div
          style={{
            height: "100%",
            marginTop: "3rem",
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
            <input type="submit" value="Enviar" onClick={enviarEmail} />
          </div>
        </div>
      </section>
    </>
  );
}
