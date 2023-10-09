/* eslint-disable react/jsx-no-target-blank */
import { Icon } from "@iconify/react";

export function CultivoEcasItem({ data }) {
  return (
    <div className="Container">
      <h5 className="Container__Title">
        <Icon icon="iwwa:year" /> Certificados del {data?.title || ""}
      </h5>
      <div className="Container__Body">
        {data.body?.map((b) => (
          <a
            key={`item-body-${b?.RUTA_QR}`}
            href={b?.RUTA_QR}
            target="_blank"
            className="Item">
            <Icon icon="fa-regular:file-pdf" className="Icon" />{" "}
            {b?.FECHA_REGISTRO}
          </a>
        ))}
      </div>
    </div>
  );
}
