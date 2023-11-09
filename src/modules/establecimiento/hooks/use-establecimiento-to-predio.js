import { useNavigate } from "react-router-dom";
import { useLazyListPredioByIdQuery } from "../features/establecimiento.rtk";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../redux/ducks/search";

export function useEstablecimientoToPredio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetch, { isLoading, isFetching }] = useLazyListPredioByIdQuery();

  const relationLink = (predioId) => {
    fetch(predioId)
      .unwrap()
      .then(({ data }) => {
        const [predio] = data;
        if (!predio) throw new Error("No se encontró el predio");
        const link = `/produccion-primaria/cultivo?q=${predio.farmer_dni.trim()}&selected=${predio.id.trim()}`;
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
