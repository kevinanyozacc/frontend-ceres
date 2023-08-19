import { Route } from "react-router-dom";
import SearchResults from "../../SearchResults";
import Searcher from "../../Searcher";

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
        <SearchResults parent="procesamiento-primario" name="establishment" />
      }
    />
    <Route
      path="vegetal"
      element={<SearchResults parent="procesamiento-primario" name="vegetal" />}
    />
    <Route
      path="animal"
      element={<SearchResults parent="procesamiento-primario" name="animal" />}
    />
    <Route
      path="predio"
      element={<SearchResults parent="procesamiento-primario" name="predio" />}
    />
    <Route
      path="alimento"
      element={
        <SearchResults parent="procesamiento-primario" name="alimento" />
      }
    />
    <Route
      path="consulta"
      element={
        <SearchResults parent="procesamiento-primario" name="consulta" />
      }
    />
  </Route>,
];

export default ProcesamientoPrimarioRoute;
