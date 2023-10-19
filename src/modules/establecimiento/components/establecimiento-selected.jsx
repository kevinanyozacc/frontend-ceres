import { useDispatch, useSelector } from "react-redux";
import FilterItem from "../../../shared/filters/components/filter-item";
import iconData from "../../../data/icon.json";
import { establecimientoActions } from "../features/establecimiento.slice";

export function EstablecimientoSelected() {
  const dispatch = useDispatch();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const close = () => {
    dispatch(establecimientoActions.setEstablecimientoSelected(undefined));
  };

  if (!establecimientoSelected) return null;

  return (
    <FilterItem
      onClose={close}
      active={true}
      icon={iconData[establecimientoSelected.type]}
      name={establecimientoSelected?.name}
      listInfo={[
        {
          icon: "icon-park:id-card",
          text: establecimientoSelected.ruc,
        },
        { icon: "gridicons:location", text: establecimientoSelected.locacion },
        {
          icon: "ph:dot-fill",
          text: `Dirección: ${establecimientoSelected.address_legal || "N/A"}`,
        },
        {
          icon: "ph:dot-fill",
          text: `Cód. Estado: ${establecimientoSelected.estate_code || "N/A"}`,
        },
        {
          icon: "ph:dot-fill",
          text: `HQ: ${establecimientoSelected.hq}`,
        },
      ]}
    />
  );
}
