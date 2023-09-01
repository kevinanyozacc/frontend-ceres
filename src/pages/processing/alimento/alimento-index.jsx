/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import AlimentoSearchResults from "../../../modules/alimento/components/alimento-search-result";
import useAlimentoPaginate from "../../../modules/alimento/hooks/use-alimento-paginate";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import useRequestPaginateToList from "../../../shared/util/hooks/use-request-paginate-to-list";
import { processingRoute } from "../config";

function AlimentoIndexPage() {
  const navigate = useNavigate();
  const hook = useAlimentoPaginate(true);

  useRequestPaginateToList(hook.page, hook.lastPage, hook.isFetching, () => {
    hook.handle(hook.page + 1);
  });

  const toLink = (item) => {
    navigate(`/alimento/${item.ID}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Alimento" options={[processingRoute]} />
      <AlimentoSearchResults
        onClickItem={toLink}
        isLoading={hook.isLoading}
        isFetching={hook.isFetching}
      />
    </SearchResults>
  );
}

export default AlimentoIndexPage;
