/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import AnimalSearchResults from "../../../modules/animal/components/animal-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { processingRoute } from "../config";

function AnimalIndexPage() {
  const navigate = useNavigate();

  const toLink = (item) => {
    navigate(`${processingRoute.url}/animal/${item.REGISTRO_MONITOREO}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Animal" options={[processingRoute]} />
      <AnimalSearchResults onClickItem={toLink} />
    </SearchResults>
  );
}

export default AnimalIndexPage;
