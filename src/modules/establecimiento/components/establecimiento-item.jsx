import FilterItem from "../../../shared/filters/components/filter-item";
import iconData from "../../../data/icon.json";

export function EstablecimientoItem({ data, active, onClick }) {
  return (
    <FilterItem
      onClick={onClick}
      active={active}
      icon={iconData[data.type]}
      name={data?.name}
      listInfo={[
        {
          icon: "icon-park:id-card",
          text: data.ruc,
        },
        { icon: "gridicons:location", text: data.locacion },
      ]}
    />
  );
}
