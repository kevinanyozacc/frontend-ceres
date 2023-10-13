import { Icon } from "@iconify/react";
import { DateTime } from "luxon";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";

const URL_API = process.env.REACT_APP_API_BASE_URL || "";

export function PredioCertificacionItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const onFile = (ucmId) => {
    const urlFile = `${URL_API}/files/${ucmId}/binary`;
    const a = document.createElement("a");
    a.href = urlFile;
    a.target = "_blank";
    a.click();
  };

  const onClick = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <TableSimpleRow className="cursor-pointer">
        <TableSimpleCell align="center" onClick={onClick}>
          {data.certificate_id}
        </TableSimpleCell>
        <TableSimpleCell align="center" onClick={onClick}>
          {data.codigo_expediente}
        </TableSimpleCell>
        <TableSimpleCell align="center" onClick={onClick}>
          {data.certificate_state}
        </TableSimpleCell>
        <TableSimpleCell align="center" onClick={onClick}>
          {DateTime.fromISO(data.inspection_date).toFormat("yyyy/MM/dd")}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          <Link
            to={`/establecimiento/planta-exportacion/${data.plant_id}`}
            className="link">
            <Icon icon="mdi:link" /> {data.code_plant}
          </Link>
        </TableSimpleCell>
        <TableSimpleCell align="center" onClick={onClick}>
          {data.inspection_place || "-"}
        </TableSimpleCell>
        <TableSimpleCell align="center" onClick={onClick}>
          {DateTime.fromISO(data.export_date).toFormat("yyyy/MM/dd")}
        </TableSimpleCell>
        <TableSimpleCell noWrap>{data.checkpoint || "-"}</TableSimpleCell>
        <TableSimpleCell noWrap onClick={onClick}>
          {data.transportation_mode || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center" onClick={onClick}>
          {data.destination || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap onClick={onClick}>
          <span className="uppercase">{data.importer || "-"}</span>
        </TableSimpleCell>
        <TableSimpleCell noWrap>
          <ul>
            {data?.files?.map((file) => (
              <li
                key={`item-file-${file.UCM_ID}`}
                className="link"
                onClick={() => onFile(file.UCM_ID)}>
                <Icon icon="bx:file" /> {file.NAME || ""}
              </li>
            ))}
          </ul>
        </TableSimpleCell>
      </TableSimpleRow>
      {/* children */}
      {isOpen ? (
        <Fragment>
          {/* productos */}
          {data.products?.map((product, index) => (
            <TableSimpleRow
              key={`item-product-${data.codigo_expediente}-${index}`}>
              <TableSimpleCell></TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <Icon icon="fluent-mdl2:product" /> {product.name}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <span className="text-italic">{product.scientific_name}</span>
              </TableSimpleCell>
              <TableSimpleCell colSpan={4} noWrap>
                <Link to={`/predio/${product.farm_id}`} className="link">
                  <Icon icon="mdi:link" /> {product.farm_id}
                </Link>
              </TableSimpleCell>
            </TableSimpleRow>
          ))}
        </Fragment>
      ) : null}
    </Fragment>
  );
}
