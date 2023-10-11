/* eslint-disable react-hooks/exhaustive-deps */
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { EstablecimientoSearchResult } from "../../../modules/establecimiento/components/establecimiento-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { processingRoute } from "../config";

function EstablecimientoIndexPage() {
  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["process:establecimiento"].title}
        options={[processingRoute]}
      />
      <EstablecimientoSearchResult />
    </SearchResults>
  );
}

export default EstablecimientoIndexPage;
