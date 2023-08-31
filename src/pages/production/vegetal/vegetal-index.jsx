/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import VegetalSearchResults from "../../../modules/vegetal/components/vegetal-search-result";
import useVegetalPaginate from "../../../modules/vegetal/hooks/use-vegetal-paginate";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import useRequestPaginateToList from "../../../shared/util/hooks/use-request-paginate-to-list";
import { productionRoute } from "../config";

function VegetalIndexPage() {
  const navigate = useNavigate();
  const hook = useVegetalPaginate(true);

  useRequestPaginateToList(hook.page, hook.lastPage, () => {
    hook.handle(hook.page + 1);
  });

  const toLink = (item) => {
    navigate(`${productionRoute.url}/vegetal/${item.REGISTRO_MONITOREO}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Vegetal" options={[productionRoute]} />
      <VegetalSearchResults
        onClickItem={toLink}
        isLoading={hook.isLoading}
        isFetching={hook.isFetching}
      />
    </SearchResults>
  );
}

export default VegetalIndexPage;
