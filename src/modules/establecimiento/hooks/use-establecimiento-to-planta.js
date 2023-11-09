import { useNavigate } from "react-router-dom";
import { useLazyListPlantaByIdQuery } from "../features/establecimiento.rtk";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../redux/ducks/search";

export function useEstablecimientoToPlanta() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetch, { isLoading, isFetching }] = useLazyListPlantaByIdQuery();

  const relationLink = (plantaId) => {
    fetch(plantaId)
      .unwrap()
      .then(({ data }) => {
        const [planta] = data;
        if (!planta) throw new Error("No se encontró la planta");
        const id = planta.id?.trim();
        const selected = planta.type;
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
