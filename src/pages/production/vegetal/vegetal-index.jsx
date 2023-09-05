/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import VegetalSearchResults from "../../../modules/vegetal/components/vegetal-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function VegetalIndexPage() {
  const navigate = useNavigate();

  const toLink = (item) => {
    navigate(`${productionRoute.url}/vegetal/${item.REGISTRO_MONITOREO}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Vegetal" options={[productionRoute]} />
      <VegetalSearchResults onClickItem={toLink} />
    </SearchResults>
  );
}

export default VegetalIndexPage;
