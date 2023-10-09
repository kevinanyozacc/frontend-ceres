import FilterItem from "../../../shared/filters/components/filter-item";

export function CultivoPredioItem({ data, active, onClick }) {
  return (
    <>
      <FilterItem
        name={data.NOMB_PRED_MOS || "N/A"}
        active={active}
        icon="fluent:plant-grass-28-filled"
        onClick={onClick}
        listInfo={[{ icon: "teenyicons:id-solid", text: data?.ID }]}
      />
    </>
  );
}
