/* eslint-disable react-hooks/exhaustive-deps */
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { CultivoSearchResult } from "../../../modules/cultivo/components/cultivo-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function CultivoIndexPage() {
  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["production:cultivo"].title}
        options={[productionRoute]}
      />
      <CultivoSearchResult />
    </SearchResults>
  );
}

export default CultivoIndexPage;
