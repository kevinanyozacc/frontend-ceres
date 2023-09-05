/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import SearchResults from "../../../components/SearchResults";
import AlimentoSearchResults from "../../../modules/alimento/components/alimento-search-result";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import { processingRoute } from "../config";

function AlimentoIndexPage() {
  const navigate = useNavigate();

  const toLink = (item) => {
    navigate(`${processingRoute.url}/alimento/${item.REGISTRO_ID}`);
  };

  return (
    <SearchResults>
      <BreadcrumbSimple title="Alimento" options={[processingRoute]} />
      <AlimentoSearchResults onClickItem={toLink} />
    </SearchResults>
  );
}

export default AlimentoIndexPage;
