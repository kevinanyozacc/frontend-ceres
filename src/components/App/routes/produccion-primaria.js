import { Route } from "react-router-dom";
import CrianzaIndexPage from "../../../pages/production/crianza/crianza-index";
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
  </Route>,
];

export default ProductionPrimariaRoute;
