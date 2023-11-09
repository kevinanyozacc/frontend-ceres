/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { CultivoSearchResult } from "../../../modules/cultivo/components/cultivo-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function CultivoIndexPage() {
  const [searchParams] = useSearchParams();

  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["production:cultivo"].title}
        options={[productionRoute]}
      />
      <CultivoSearchResult
        autoselect={!!searchParams.get("selected")}
        predioId={searchParams.get("selected")}
        productorId={searchParams.get("q")}
      />
    </SearchResults>
  );
}

export default CultivoIndexPage;
