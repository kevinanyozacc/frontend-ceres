import FilterItem from "../../../shared/filters/components/filter-item";

export function CultivoItem({ data, active, onClick }) {
  return (
    <FilterItem
      onClick={onClick}
      active={active}
      name={data?.RAZO_PROD_MOS}
      listInfo={[
        {
          icon: "teenyicons:id-outline",
          text: data.ID,
        },
        {
          icon: "ic:outline-factory",
          text: data.RUC_PROD_MOS,
        },
        { icon: "material-symbols:person", text: data.IDEN_PROD_MOS },
        { icon: "gridicons:location", text: data.LOCACION },
      ]}
    />
  );
}
