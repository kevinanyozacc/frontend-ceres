import { Route } from "react-router-dom";
import AlimentoIndexPage from "../../../pages/processing/alimento/alimento-index";
import AlimentoShowPage from "../../../pages/processing/alimento/alimento-show";
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
        <SearchResults
          parent="procesamiento-primario"
          name="process:establishment"
        />
      }
    />
    <Route
      path="vegetal"
      element={
        <SearchResults parent="procesamiento-primario" name="process:vegetal" />
      }
    />
    <Route
      path="consulta"
      element={
        <SearchResults
          parent="procesamiento-primario"
          name="process:consulta"
        />
      }
    />
  </Route>,
  // info
  <Route path="/procesamiento-primario">
    <Route path="animal" element={<AnimalIndexPage />} />
    <Route path="animal/:id" element={<AnimalShowPage />} />
    <Route path="alimento" element={<AlimentoIndexPage />} />
    <Route path="alimento/:id" element={<AlimentoShowPage />} />
  </Route>,
];

export default ProcesamientoPrimarioRoute;
