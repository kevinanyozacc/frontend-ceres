import { DateTime } from "luxon";
import FilterItem from "../../../shared/filters/components/filter-item";

export function CultivoPredioItem({ data, active, onClick }) {
  return (
    <>
      <FilterItem
        name={data.NOMB_PRED_MOS || "N/A"}
        active={active}
        icon="fluent:plant-grass-28-filled"
        onClick={onClick}
        listInfo={[
          { icon: "teenyicons:id-solid", text: data?.ID },
          {
            icon: "material-symbols:date-range",
            text: data?.FECH_CREA
              ? DateTime.fromISO(data?.FECH_CREA).toFormat("dd/MM/yyyy")
              : "N/A",
          },
          { icon: "mdi:location", text: data?.LOCACION },
          {
            icon: "fa6-solid:certificate",
            className: data?.COUNTER ? "text-success" : "text-danger",
            text: `${data?.COUNTER ? "Con" : "Sin"} certificados`,
          },
        ]}
      />
    </>
  );
}
