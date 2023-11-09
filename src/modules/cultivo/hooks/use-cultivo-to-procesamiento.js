import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../redux/ducks/search";
import { useLazyListProcesamientoByIdQuery } from "../features/cultivo.rtk";

export function useCultivoToProcesamiento() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetch, { isLoading, isFetching }] =
    useLazyListProcesamientoByIdQuery();

  const relationLink = (predioId) => {
    fetch({ type: "agricultural-exporter", id: predioId })
      .unwrap()
      .then(({ data }) => {
        const [establecimiento] = data;
        if (!establecimiento)
          throw new Error("No se encontró el establecimiento");
        const id = establecimiento.ruc?.trim();
        const selected = establecimiento.type;
        const link = `/procesamiento-primario/establecimiento?q=${id}&selected=${selected}`;
        dispatch(setSearchTerm(""));
        navigate(link);
      })
      .catch((err) => alert(err.message || "No se pudo redirigir"));
  };

  return {
    relationLink,
    isLoading: isLoading || isFetching,
  };
}
