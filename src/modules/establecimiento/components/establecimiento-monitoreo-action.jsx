import { Icon } from "@iconify/react";
import { useFileBlob } from "../../../shared/files/hooks/use-file-blob";
import { useDispatch } from "react-redux";
import { establecimientoActions } from "../features/establecimiento.slice";

export function EstablecimientoMonitoreoAction({ data }) {
  const dispatch = useDispatch();
  const fileBlob = useFileBlob();

  const selected = () => {
    dispatch(establecimientoActions.setMonitoreoSelected(data));
  };

  if (data.FLAG_UCCIRT === "1") {
    return (
      <div className="d-flex justify-center">
        <Icon
          icon="bxs:file"
          className="cursor-pointer"
          onClick={() =>
            fileBlob.linkFile(data.SOLICITUD_LAB_UCCIRT, { type: "fisico" })
          }
        />
      </div>
    );
  }

  if (data.FLAG_VEGETAL === "1") {
    return (
      <div className="d-flex justify-center">
        <Icon
          icon="teenyicons:button-solid"
          className="cursor-pointer"
          onClick={selected}
        />
      </div>
    );
  }

  if (data.FLAG_ANIMAL === "1") {
    return (
      <div className="d-flex justify-center">
        <Icon
          icon="teenyicons:button-solid"
          className="cursor-pointer"
          onClick={selected}
        />
      </div>
    );
  }

  return null;
}
