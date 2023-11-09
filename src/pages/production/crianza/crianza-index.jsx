/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { CrianzaSearchResult } from "../../../modules/crianza/components/crianza-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function CrianzaIndexPage() {
  const [searchParams] = useSearchParams();

  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["production:crianza"].title}
        options={[productionRoute]}
      />
      <CrianzaSearchResult
        autoselect={!!searchParams.get("selected")}
        predioId={searchParams.get("selected")}
        productorId={searchParams.get("q")}
      />
    </SearchResults>
  );
}

export default CrianzaIndexPage;
