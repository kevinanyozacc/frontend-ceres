import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./FarmExportCertificatesRow.css";

const FarmExportCertificatesRow = ({ authorization }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="FarmExportCertificatesRow FarmExportCertificatesRow--data"
        onClick={() => setExpanded(!expanded)}
      >
        {authorization.properties.map((v, j) => (
          <div key={`plant_link-${j}`}>
            {v.property === "Planta" ? (
              <Link
                to={`/establecimiento/planta-exportacion/${authorization.link_plant}`}
                className="FarmExportCertificatesRow__plant_link"
              >
                <Icon icon="mdi:link" /> {v.value}
              </Link>
            ) : v.property === "Cód. certificado" ? (
              <Link
                to={`/establecimiento/exportador-agricola/${authorization.link_exporter}`}
                className="FarmExportCertificatesRow__plant_link"
              >
                <Icon icon="mdi:link" /> {v.value}
              </Link>
            ) : (
              v.value
            )}
          </div>
        ))}
      </div>
      {expanded &&
        authorization.products.map((p, i) => (
          <div
            className="FarmExportCertificatesRow__product"
            key={`product-${i}`}
          >
            <div>Producto {i + 1}: </div>
            <div>{p.name}</div>
            <div className="FarmExportCertificatesRow__scientific_name">
              {p.scientific_name}
            </div>
            {/* <div>
            <Link
              className="FarmExportCertificatesRow__farm_link"
              to={`/predio/${p.farm_id}`}
            >
              <Icon icon="mdi:link" /> Predio {p.farm_id}
            </Link>
          </div> */}
          </div>
        ))}
    </>
  );
};

export default FarmExportCertificatesRow;
