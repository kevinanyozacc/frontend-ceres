import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { productionRoute } from "../config";

function PredioShowPage() {
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
            { url: `${productionRoute.url}/predio?q=a`, name: "Predio" },
          ]}
        />
        <div className="flex">
          <div className="col-2">
            <CardContainer title="Animal">
              <CardSimple>
                <CardTitle title="Establecimiento" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <CardContainer title="Vigilancia">
              <CardSimple>
                <CardTitle title="Certificados de lugar de producción" />
                <CardBody>Hola</CardBody>
              </CardSimple>
              <CardSimple>
                <CardTitle title="Certificados de exportacion relacionados" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>

        <div className="flex mt-3">
          <div className="col-2">
            <CardContainer title="Vegetal">
              <CardSimple>
                <CardTitle title="Establecimiento" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <CardContainer title="Vigilancia">
              <CardSimple>
                <CardTitle title="Certificados de lugar de producción" />
                <CardBody>Hola</CardBody>
              </CardSimple>
              <CardSimple>
                <CardTitle title="Certificados de exportacion relacionados" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default PredioShowPage;
