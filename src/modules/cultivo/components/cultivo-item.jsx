import FilterItem from "../../../shared/filters/components/filter-item";

export function CultivoItem({ data, active, onClick }) {
  return (
    <FilterItem
      onClick={onClick}
      active={active}
      name={data?.RAZO_PROD_MOS}
      listInfo={[
        {
          icon: "icon-park:id-card",
          text: data.ID,
        },
        { icon: "gridicons:location", text: data.LOCACION },
      ]}
    />
  );
}
