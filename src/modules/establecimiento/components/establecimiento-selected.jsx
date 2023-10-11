import { useSelector } from "react-redux";
import { EstablecimientoItem } from "./establecimiento-item";

export function EstablecimientoSelected() {
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  if (!establecimientoSelected) return null;

  return <EstablecimientoItem data={establecimientoSelected} active={true} />;
}
