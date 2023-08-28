import { Route } from "react-router-dom";
import AlimentoShowPage from "../../../pages/production/alimento/alimento-show";
import AnimalIndexPage from "../../../pages/production/animal/animal-index";
import AnimalShowPage from "../../../pages/production/animal/animal-show";
import ConsultaShowPage from "../../../pages/production/consulta/consulta-show";
import PredioShowPage from "../../../pages/production/predio/predio-show";
import VegetalIndexPage from "../../../pages/production/vegetal/vegetal-index";
import VegetalShowPage from "../../../pages/production/vegetal/vegetal-show";
import SearchResults from "../../SearchResults";
import Searcher from "../../Searcher";

const ProductionPrimariaRoute = [
  <Route
    path="/produccion-primaria"
    element={
      <Searcher title="Producción Primaria" name="produccion-primaria" />
    }
  />,
  // filter
  <Route path="/produccion-primaria">
    <Route
      path="establishment"
      element={
        <SearchResults parent="produccion-primaria" name="establishment" />
      }
    />
    <Route
      path="predio"
      element={<SearchResults parent="produccion-primaria" name="predio" />}
    />
    <Route
      path="alimento"
      element={<SearchResults parent="produccion-primaria" name="alimento" />}
    />
    <Route
      path="consulta"
      element={<SearchResults parent="produccion-primaria" name="consulta" />}
    />
  </Route>,
  // info
  <Route path="/produccion-primaria">
    <Route path="animal" element={<AnimalIndexPage />} />
    <Route path="animal/:id" element={<AnimalShowPage />} />
    <Route path="vegetal" element={<VegetalIndexPage />} />
    <Route path="vegetal/:id" element={<VegetalShowPage />} />
    <Route path="predio/:id" element={<PredioShowPage />} />
    <Route path="alimento/:id" element={<AlimentoShowPage />} />
    <Route path="consulta/:id" element={<ConsultaShowPage />} />
  </Route>,
];

export default ProductionPrimariaRoute;
