import { useSelector } from "react-redux";
import { CrianzaPredioItem } from "./crianza-predio-item";

export function CrianzaPredioSelected() {
  const { crianzaPredioSelected } = useSelector((state) => state.crianza);
  if (!crianzaPredioSelected) return null;
  return <CrianzaPredioItem data={crianzaPredioSelected} active={true} />;
}
