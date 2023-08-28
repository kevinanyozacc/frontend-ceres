import { Route } from "react-router-dom";
import AnimalIndexPage from "../../../pages/processing/animal/animal-index";
import AnimalShowPage from "../../../pages/processing/animal/animal-show";
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
  // info
  <Route path="/procesamiento-primario">
    <Route path="animal" element={<AnimalIndexPage />} />
    <Route path="animal/:id" element={<AnimalShowPage />} />
  </Route>,
];

export default ProcesamientoPrimarioRoute;
