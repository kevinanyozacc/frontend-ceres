import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { productionRoute } from "../config";

function AnimalShowPage() {
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
            { url: `${productionRoute.url}/animal?q=a`, name: "Animal" },
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
              <CardSimple>
                <CardTitle title="Inspección > Acta" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>

        <CardContainer title="Control">
          <div className="flex">
            <CardSimple className="mb-1">
              <CardTitle title="Vacunación > Certificado" />
              <CardBody>Certificado</CardBody>
            </CardSimple>

            <CardSimple>
              <CardTitle title="Exportación > Certificado" />
              <CardBody>Certificado</CardBody>
            </CardSimple>
          </div>

          <div className="flex">
            <CardSimple className="mb-1">
              <CardTitle title="Importación > Certificado" />
              <CardBody>Certificado</CardBody>
            </CardSimple>

            <CardSimple>
              <CardTitle title="Importación > Acta Pos Entrada" />
              <CardBody>Certificado</CardBody>
            </CardSimple>
          </div>
        </CardContainer>
      </div>
    </CenteredContainer>
  );
}

export default AnimalShowPage;
