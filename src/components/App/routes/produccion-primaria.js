import { Route } from "react-router-dom";
import ConsultaShowPage from "../../../pages/production/consulta/consulta-show";
import PredioIndexPage from "../../../pages/production/predio/predio-index";
import PredioShowPage from "../../../pages/production/predio/predio-show";
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
        <SearchResults
          parent="produccion-primaria"
          name="production:establishment"
        />
      }
    />
    <Route
      path="predio2"
      element={
        <SearchResults parent="produccion-primaria" name="production:predio" />
      }
    />
  </Route>,
  // info
  <Route path="/produccion-primaria">
    <Route path="predio" element={<PredioIndexPage />} />
    <Route path="predio/:id" element={<PredioShowPage />} />
    <Route path="consulta/:id" element={<ConsultaShowPage />} />
  </Route>,
];

export default ProductionPrimariaRoute;
