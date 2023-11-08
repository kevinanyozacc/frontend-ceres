import { Icon } from "@iconify/react";
import { useFileUcm } from "../../../shared/files/hooks/use-file-ucm";
import { useDispatch } from "react-redux";
import { establecimientoActions } from "../features/establecimiento.slice";

export function EstablecimientoMonitoreoAction({ data }) {
  const dispatch = useDispatch();
  const fileUcm = useFileUcm();

  const selected = () => {
    dispatch(establecimientoActions.setMonitoreoSelected(data));
  };

  if (data.FLAG_UCCIRT === "1" && data.NUMERODOCUMENTO_UCM) {
    return (
      <div className="d-flex justify-center">
        <Icon
          icon="bxs:file"
          className="cursor-pointer"
          onClick={() => fileUcm.linkFile(data.NUMERODOCUMENTO_UCM)}
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
