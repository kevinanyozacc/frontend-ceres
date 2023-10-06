/* eslint-disable react-hooks/exhaustive-deps */
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { CrianzaSearchResult } from "../../../modules/crianza/components/crianza-search-result";
import { CrianzaVigilanciaContainer } from "../../../modules/crianza/components/crianza-vigilancia-container";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function CrianzaIndexPage() {
  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["production:crianza"].title}
        options={[productionRoute]}
      />
      <CrianzaSearchResult />
      <CrianzaVigilanciaContainer />
    </SearchResults>
  );
}

export default CrianzaIndexPage;
