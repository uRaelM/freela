import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Entrar from "./pages/Entrar";
import Cadastro from "./pages/Cadastro";
import Dashboards from "./pages/Dashboards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboards />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
