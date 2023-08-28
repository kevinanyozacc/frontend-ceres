/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import AnimalSearchResults from "../../../modules/animal/components/animal-search-result";
import useAnimalPaginate from "../../../modules/animal/hooks/use-animal-paginate";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { productionRoute } from "../config";

function AnimalIndexPage() {
  const navigate = useNavigate();
  const hook = useAnimalPaginate();

  const toLink = (item) => {
    navigate(`${productionRoute.url}/animal/${item.REGISTRO_MONITOREO}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Animal" options={[productionRoute]} />
      <AnimalSearchResults onClickItem={toLink} isLoading={hook.isLoading} />
    </SearchResults>
  );
}

export default AnimalIndexPage;
