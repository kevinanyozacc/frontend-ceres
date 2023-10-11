import { Route } from "react-router-dom";
import SearchResults from "../../SearchResults";
import Searcher from "../../Searcher";
import EstablecimientoIndexPage from "../../../pages/processing/establecimiento/establecimiento-index";

const ProcesamientoPrimarioRoute = [
  <Route
    path="/procesamiento-primario"
    element={
      <Searcher title="Procesamiento Primario" name="procesamiento-primario" />
    }
  />,
  <Route path="/procesamiento-primario">
    <Route
      path="establishment"
      element={
        <SearchResults
          parent="procesamiento-primario"
          name="process:establishment"
        />
      }
    />
    <Route path="establecimiento" element={<EstablecimientoIndexPage />} />
  </Route>,
];

export default ProcesamientoPrimarioRoute;
