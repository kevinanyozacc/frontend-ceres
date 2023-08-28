/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import PredioSearchResults from "../../../modules/predio/components/predio-search-result";
import usePredioPaginate from "../../../modules/predio/hooks/use-predio-paginate";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function PredioIndexPage() {
  const navigate = useNavigate();
  const hook = usePredioPaginate();

  const toLink = (item) => {
    navigate(`/predio/${item.ID}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Predio" options={[productionRoute]} />
      <PredioSearchResults onClickItem={toLink} isLoading={hook.isLoading} />
    </SearchResults>
  );
}

export default PredioIndexPage;
