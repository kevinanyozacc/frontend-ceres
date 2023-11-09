/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { EstablecimientoSearchResult } from "../../../modules/establecimiento/components/establecimiento-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { processingRoute } from "../config";

function EstablecimientoIndexPage() {
  const [searchParams] = useSearchParams();

  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["process:establecimiento"].title}
        options={[processingRoute]}
      />
      <EstablecimientoSearchResult
        autoselect={!!searchParams.get("selected")}
        productorId={searchParams.get("q")}
        type={searchParams.get("selected")}
      />
    </SearchResults>
  );
}

export default EstablecimientoIndexPage;
