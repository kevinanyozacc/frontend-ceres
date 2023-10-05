import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import AnimalProfile from "../AnimalProfile";
import BreadCrumb from "../BreadCrumb";
import CenteredContainer from "../CenteredContainer";
import Drawer from "../Drawer";
import FarmProfile from "../FarmProfile";
import Footer from "../Footer";
import Landing from "../Landing";
import Login from "../Login";
import NavBar from "../NavBar";
import PlaceProfile from "../PlaceProfile";
import ReadCode from "../ReadCode";
import Register from "../Register";
import UsersManagement from "../UsersManagement";
import "./App.css";
import ProcesamientoPrimarioRoute from "./routes/procesamiento-primario";
import ProductionPrimariaRoute from "./routes/produccion-primaria";

const App = () => {
  return (
    <div className="App">
      <Drawer />
      <NavBar />
      <BreadCrumb />
      <Routes>
        <Route path="/acceso" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/usuarios/*" element={<UsersManagement />} />
        <Route path="/establecimiento/:type/:id" element={<PlaceProfile />} />
        <Route path="/animal/:id" element={<AnimalProfile />} />
        <Route path="/predio/:id" element={<FarmProfile />} />
        <Route path="/" element={<Landing />} />
        {/* rutas de producción primaria */}
        {ProductionPrimariaRoute?.map((component, index) => (
          <Fragment key={`primaria-${index}`}>{component}</Fragment>
        ))}
        {/* rutas de procesamiento primario */}
        {ProcesamientoPrimarioRoute?.map((component, index) => (
          <Fragment key={`primaria-${index}`}>{component}</Fragment>
        ))}
        <Route path="/leer-codigo" element={<ReadCode />}>
          <Route path="confirmacion/:code" />
        </Route>
        <Route
          path="*"
          element={
            <CenteredContainer>
              <h1>Página no encontrada</h1>
            </CenteredContainer>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
