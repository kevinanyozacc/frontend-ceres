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
        {
          icon: "ph:dot-fill",
          text: `Productor ID: ${crianzaSelected.CODI_PROD_PRO}`,
        },
        {
          icon: "ic:baseline-business",
          text: crianzaSelected?.DESC_SEDE_SED,
        },
        { icon: "gridicons:location", text: crianzaSelected.LOCACION },
      ]}
    />
  );
}
