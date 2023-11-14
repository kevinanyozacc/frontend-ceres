/* eslint-disable react/jsx-no-target-blank */
import { Icon } from "@iconify/react";
import { DateTime } from "luxon";
import { useFileUcm } from "../../../shared/files/hooks/use-file-ucm";

export function CultivoEcasItem({ data }) {
  const fileUcm = useFileUcm();

  const handleClick = (type, data) => {
    if (type === "LINK") {
      const a = document.createElement("a");
      a.href = data;
      a.target = "blank";
      return a.click();
    } else {
      return fileUcm.linkFile(data);
    }
  };

  return (
    <div className="Container">
      <h5 className="Container__Title">
        <Icon icon="iwwa:year" /> Certificados del {data?.title || ""}
      </h5>
      <div className="Container__Body">
        {data.body?.map((b) => (
          <span
            key={`item-body-${b?.RUTA_QR}`}
            target="_blank"
            className="Item"
            onClick={() => handleClick(b?.TIPO, b?.RUTA_QR)}
          >
            <Icon icon="fa-regular:file-pdf" className="Icon" />{" "}
            {b?.FECHA_REGISTRO
              ? DateTime.fromISO(b.FECHA_REGISTRO).toFormat("dd/MM/yyyy")
              : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
