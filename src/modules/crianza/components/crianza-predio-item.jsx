import FilterItem from "../../../shared/filters/components/filter-item";

export function CrianzaPredioItem({ data, active, onClick }) {
  return (
    <FilterItem
      name={data.NOMB_PRED_PRE || ""}
      active={active}
      icon="fluent:plant-grass-28-filled"
      onClick={onClick}
      listInfo={[
        { icon: "teenyicons:id-solid", text: data?.CODI_PRED_PRE },
        { icon: "icon-park-outline:user-business", text: data?.RAZON_SOCIAL },
      ]}
    />
  );
}
