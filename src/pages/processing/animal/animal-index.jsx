/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import AnimalSearchResults from "../../../modules/animal/components/animal-search-result";
import useAnimalPaginate from "../../../modules/animal/hooks/use-animal-paginate";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import useRequestPaginateToList from "../../../shared/util/hooks/use-request-paginate-to-list";
import { processingRoute } from "../config";

function AnimalIndexPage() {
  const navigate = useNavigate();
  const hook = useAnimalPaginate(true);

  useRequestPaginateToList(hook.page, hook.lastPage, hook.isFetching, () => {
    hook.handle(hook.page + 1);
  });

  const toLink = (item) => {
    navigate(`${processingRoute.url}/animal/${item.REGISTRO_MONITOREO}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Animal" options={[processingRoute]} />
      <AnimalSearchResults
        onClickItem={toLink}
        isLoading={hook.isLoading}
        isFetching={hook.isFetching}
      />
    </SearchResults>
  );
}

export default AnimalIndexPage;
