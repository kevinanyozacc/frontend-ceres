import { useSelector } from "react-redux";
import FilterItem from "../../../shared/filters/components/filter-item";

export function CrianzaSelected() {
  const { crianzaSelected } = useSelector((state) => state.crianza);

  if (!crianzaSelected) return null;

  return (
    <FilterItem
      active={true}
      name={crianzaSelected?.RAZO_SOCI_PRO}
      listInfo={[
        {
          icon: "icon-park:id-card",
          text: crianzaSelected.RUC_PROD_PRO || crianzaSelected.NUME_DOCU_PRO,
        },
        { icon: "gridicons:location", text: crianzaSelected.LOCACION },
        {
          icon: "ph:dot-fill",
          text: `Productor ID: ${crianzaSelected.CODI_PROD_PRO}`,
        },
      ]}
    />
  );
}
