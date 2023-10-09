import { useSelector } from "react-redux";
import { CultivoItem } from "./cultivo-item";

export function CultivoSelected() {
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  if (!cultivoSelected) return null;

  return <CultivoItem data={cultivoSelected} active={true} />;
}
