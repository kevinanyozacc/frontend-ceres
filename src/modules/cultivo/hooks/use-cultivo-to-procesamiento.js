import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../redux/ducks/search";
import { useLazyListProcesamientoByIdQuery } from "../features/cultivo.rtk";

export function useCultivoToProcesamiento() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fetch, { isLoading, isFetching }] =
    useLazyListProcesamientoByIdQuery();

  const { cultivoPredioSelected } = useSelector((state) => state.cultivo);

  const relationLink = (expoterId) => {
    fetch({ type: "agricultural-exporter", id: expoterId })
      .unwrap()
      .then(({ data }) => {
        const [establecimiento] = data;
        if (!establecimiento)
          throw new Error("No se encontró el establecimiento");
        const id = establecimiento.ruc?.trim();
        const selected = establecimiento.type;
        const predioId = cultivoPredioSelected?.ID;
        const link = `/procesamiento-primario/establecimiento?q=${id}&selected=${selected}&predioId=${predioId}`;
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
