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
        { icon: "gridicons:location", text: data.LOCACION },
      ]}
    />
  );
}
