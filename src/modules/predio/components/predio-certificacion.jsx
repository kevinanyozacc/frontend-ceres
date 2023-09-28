import { useParams } from "react-router";
import Loader from "../../../components/Loader";
import { useExportCertificateQuery } from "../../../redux/services/place";
import ErrorCard from "../../../shared/errors/components/error-card";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { PredioCertificacionItem } from "./predio-certificacion-item";

export default function PredioCertificacion() {
  const { id, type } = useParams();

  const { data, error, isLoading, isError } = useExportCertificateQuery({
    id,
    spanishType: type,
  });

  if (isLoading) {
    return <Loader />;
  }

  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404;

  if (isError && !noCSTIFound) {
    return "Error cargando autorizaciones";
  }

  if (noCSTIFound) {
    return (
      <ErrorCard title="Este establecimiento no cuenta con certificados" />
    );
  }

  return (
    <TableSimple
      responsive
      contentStyle={{ maxWidth: "870px", maxHeight: "540px" }}
    >
      <TableSimpleHead
        data={[
          {
            title: "Cód. certificado",
          },
          {
            title: "Cód. expediente",
          },
          {
            title: "Estado",
          },
          {
            title: "Fecha inspección",
          },
          {
            title: "Planta",
          },
          {
            title: "Punto de inspección",
          },
          {
            title: "Fecha exportación",
          },
          {
            title: "Punto de salida",
          },
          {
            title: "Modo de envío",
          },
          {
            title: "Cod. país destino",
          },
          {
            title: "Importador",
          },
          {
            title: "Archivos",
          },
        ]}
      />
      <tbody>
        {data?.map(({ item }, index) => (
          <PredioCertificacionItem
            key={`item-table-cell-${index}`}
            data={item}
          />
        ))}
      </tbody>
    </TableSimple>
  );
}
