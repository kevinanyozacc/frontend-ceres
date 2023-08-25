import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";

function VegetalShowPage() {
  return (
    <CenteredContainer className="PlaceProfile__container">
      <HeaderSimple
        title="San Jose"
        icon="mdi:farm"
        displayType="Display"
        locationName="Jr sol naciente"
        ruc="71051564"
        padron="M1"
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
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <CardContainer title="Vigilancia">
              <CardSimple>
                <CardTitle title="Monitoreo > Enfermedades > Inf. Ensayo" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
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

export default VegetalShowPage;
