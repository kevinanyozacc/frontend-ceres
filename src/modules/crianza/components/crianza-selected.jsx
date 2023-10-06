import { useSelector } from "react-redux";
import { CrianzaItem } from "./crianza-item";

export function CrianzaSelected() {
  const { crianzaSelected } = useSelector((state) => state.crianza);

  if (!crianzaSelected) return null;

  return <CrianzaItem data={crianzaSelected} active={true} />;
}
