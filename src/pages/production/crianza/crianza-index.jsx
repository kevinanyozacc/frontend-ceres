/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import data from "../../../data/tabs.json";
import { CrianzaSearchResult } from "../../../modules/crianza/components/crianza-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function CrianzaIndexPage() {
  const navigate = useNavigate();

  const toLink = (item) => {
    navigate(`${productionRoute.url}/crianza/${item.CODI_PRED_PRE}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple
        title={data["production:crianza"].title}
        options={[productionRoute]}
      />
      <CrianzaSearchResult onClickItem={toLink} />
    </SearchResults>
  );
}

export default CrianzaIndexPage;
