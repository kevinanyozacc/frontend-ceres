import { Route } from "react-router-dom";
import ConsultaShowPage from "../../../pages/production/consulta/consulta-show";
import CrianzaIndexPage from "../../../pages/production/crianza/crianza-index";
import PredioIndexPage from "../../../pages/production/predio/predio-index";
import PredioShowPage from "../../../pages/production/predio/predio-show";
import SearchResults from "../../SearchResults";
import Searcher from "../../Searcher";
import CultivoIndexPage from "../../../pages/production/cultivo/cultivo-index";

const ProductionPrimariaRoute = [
  <Route
    path="/produccion-primaria"
    element={
      <Searcher title="Producción Primaria" name="produccion-primaria" />
    }
  />,
  // info
  <Route path="/produccion-primaria">
    <Route
      path="establishment"
      element={
        <SearchResults
          parent="produccion-primaria"
          name="production:establishment"
        />
      }
    />
    <Route path="crianza" element={<CrianzaIndexPage />} />
    <Route path="cultivo" element={<CultivoIndexPage />} />
    <Route path="predio" element={<PredioIndexPage />} />
    <Route path="predio/:id" element={<PredioShowPage />} />
    <Route path="consulta/:id" element={<ConsultaShowPage />} />
  </Route>,
];

export default ProductionPrimariaRoute;
