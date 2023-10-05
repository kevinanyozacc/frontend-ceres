/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CenteredContainer from "../../../components/CenteredContainer";
import Loader from "../../../components/Loader";
import VegetalVigilanciaList from "../../../modules/vegetal/components/vegetal-vigilancia-list";
import useVegetalFind from "../../../modules/vegetal/hooks/use-vegetal-find";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";

function CrianzaShowPage() {
  const params = useParams();
  const { isLoading } = useVegetalFind(params.id);
  const { vegetalSelected } = useSelector((state) => state.vegetal);

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader />;
      </CenteredContainer>
    );
  }

  if (!vegetalSelected) {
    return <CenteredContainer>Algo salió mal</CenteredContainer>;
  }

  return (
    <CenteredContainer className="PlaceProfile__container">
      <HeaderSimple
        title={vegetalSelected?.ESTABLECIMIENTO_PRODUCTOR}
        icon="ph:plant-fill"
        displayType="Origen:"
        displayContent={vegetalSelected?.UBICATION}
      />
      <div className="container">
        <BreadcrumbSimple
          title="San Jose"
          options={[
            { url: "", name: "Producción Primaria" },
            { url: "", name: "Vegetal" },
          ]}
        />
        <div className="flex">
          <div className="col-2">
            <CardContainer title="Datos Generales">
              <CardSimple>
                <CardBody>
                  <div className="mb-2">
                    <b className="bold">Establecimiento:</b>{" "}
                    {vegetalSelected?.ESTABLECIMIENTO_PRODUCTOR}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Procedencia:</b>{" "}
                    {vegetalSelected?.PROCEDENCIA === "N"
                      ? "NACIONAL"
                      : "OTROS"}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Ubicación:</b>{" "}
                    {vegetalSelected?.UBICATION}
                  </div>
                </CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <VegetalVigilanciaList />
          </div>
        </div>

        <CardContainer title="Control">
          <CardSimple className="mb-1">
            <CardTitle title="Exportación > Certificado Importacion > RIU" />
            <CardBody>Certificado</CardBody>
          </CardSimple>

          <CardSimple>
            <CardTitle title="Importación > RIU" />
            <CardBody>Hola</CardBody>
          </CardSimple>
        </CardContainer>
      </div>
    </CenteredContainer>
  );
}

export default CrianzaShowPage;
