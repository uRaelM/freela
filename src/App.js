import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Entrar from "./pages/Entrar";
import Cadastro from "./pages/Cadastro";
import Dashboards from "./pages/Dashboards";
import CriarVaga from "./pages/CriarVaga";
import TecnologiaQuery from "./pages/Tecnologia";
import DesignQuery from "./pages/Design";
import MarketingQuery from "./pages/Marketing";
import EdicaoQuery from "./pages/Edicao";
import ConsultoriaQuery from "./pages/Consultoria";
import Perfil from "./pages/Perfil";
import EditarVaga from "./pages/EditarVaga";
import Vaga from "./pages/Vaga";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboards />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/criar-vaga" element={<CriarVaga />} />
        <Route path="/tecnologia" element={<TecnologiaQuery />} />
        <Route path="/design" element={<DesignQuery />} />
        <Route path="/marketing" element={<MarketingQuery />} />
        <Route path="/edicao" element={<EdicaoQuery />} />
        <Route path="/consultoria" element={<ConsultoriaQuery />} />
        <Route path="/perfil/:userId" element={<Perfil />} />
        <Route
          path="/perfil/:userId/editar-vaga/:vagaId"
          element={<EditarVaga />}
        />
        <Route path="/vaga/:vagaId" element={<Vaga />} />
      </Routes>
    </Router>
  );
}

export default App;
