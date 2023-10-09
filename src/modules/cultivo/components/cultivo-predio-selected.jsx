import { useSelector } from "react-redux";
import { CultivoPredioItem } from "./cultivo-predio-item";

export function CultivoPredioSelected() {
  const { cultivoPredioSelected } = useSelector((state) => state.cultivo);
  if (!cultivoPredioSelected) return null;
  return <CultivoPredioItem data={cultivoPredioSelected} active={true} />;
}
