import FilterItem from "../../../shared/filters/components/filter-item";

export function CrianzaItem({ data, active, onClick }) {
  return (
    <FilterItem
      onClick={onClick}
      active={active}
      name={data?.RAZO_SOCI_PRO}
      listInfo={[
        {
          icon: "icon-park:id-card",
          text: data.RUC_PROD_PRO || data.NUME_DOCU_PRO,
        },
        {
          icon: "ic:baseline-business",
          text: data?.DESC_SEDE_SED,
        },
        { icon: "gridicons:location", text: data.LOCACION },
      ]}
    />
  );
}
