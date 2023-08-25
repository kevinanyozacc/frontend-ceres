import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { productionRoute } from "../config";

function ConsultaShowPage() {
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
            productionRoute,
            { url: `${productionRoute.url}/consulta?q=a`, name: "Consultas" },
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
            <CardContainer title="Sensibilización">
              <CardSimple>
                <CardTitle title="Capacitación > Constancias y Certificados" />
                <CardBody>Hola</CardBody>
              </CardSimple>
              <CardSimple>
                <CardTitle title="Ecos > Productores > Constancias" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default ConsultaShowPage;
