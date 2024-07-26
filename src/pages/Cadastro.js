import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginVideo from "../public/loginvideo.mp4";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../context/firebase";
import toast from "react-hot-toast";

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

        if (email.includes("@gmail")) {
            try {
                // Cria o usuário no Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                // Atualiza o displayName do usuário
                await updateProfile(user, {
                    displayName: name,
                });
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
                console.log(
                    "Usuário criado e adicionado com sucesso:",
                    user.uid
                );
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                return user;
            } catch (error) {
                setCarregando(false);
                if (
                    error.message ===
                    "Firebase: Error (auth/email-already-in-use)."
                ) {
                    toast.error("Email já cadastrado", {
                        duration: 4000,
                        position: "top-center",
                    });
                } else {
                    toast.error("Erro ao criar usuário", {
                        duration: 4000,
                        position: "top-center",
                    });
                }
                console.error(error.message);
            }
        } else {
            setCarregando(false);
            toast.error("Utilize um email do Gmail", {
                duration: 3000,
                position: "top-center",
            });
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
                    <form onSubmit={handleSubmit}>
                        <h1>Cadastro</h1>
                        <h2>
                            Por favor preencha com seu nome completo, Gmail e
                            senha para criar a sua conta.
                        </h2>
                        <label>Nome de Exibição</label>
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
                            placeholder="Email do Gmail"
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
                                style={{
                                    background:
                                        "var(--default-green-with-overlay)",
                                }}
                                disabled={carregando}
                            />
                        ) : (
                            <input
                                type="submit"
                                value="Cadastrar"
                                disabled={carregando}
                            />
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
