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

  if (data.FLAG_UCCIRT === "1") {
    return (
      <div className="d-flex justify-center">
        <ul>
          {data?.files?.map((file) => (
            <li
              key={`item-file-${file.FILENAME}`}
              className="link cursor-pointer"
              onClick={() => fileUcm.linkFile(file.NUMERODOCUMENTO_UCM)}
            >
              <Icon icon="bxs:file" className="cursor-pointer" />
              {`${file.FILENAME}`.substring(0, 50)}
            </li>
          ))}
        </ul>
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
