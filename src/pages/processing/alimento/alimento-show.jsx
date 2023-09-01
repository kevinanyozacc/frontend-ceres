import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { processingRoute } from "../config";

function AlimentoShowPage() {
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
            processingRoute,
            { url: `${processingRoute.url}/alimento?q=a`, name: "Alimento" },
          ]}
        />
        <div className="flex">
          <div className="col-2">
            <CardContainer title="Vegetal">
              <CardSimple>
                <CardTitle title="Datos Generales" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <CardContainer title="Vigilancia">
              <CardSimple>
                <CardTitle title="Monitoreo > Contaminantes > piensas > inf. ensayo" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>

        <div className="flex mt-3">
          <div className="col-2">
            <CardContainer title="Animal">
              <CardSimple>
                <CardTitle title="Datos Generales" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <CardContainer title="Vigilancia">
              <CardSimple>
                <CardTitle title="Monitoreo > pienso > inf. ensayo" />
                <CardBody>Hola</CardBody>
              </CardSimple>
              <CardSimple>
                <CardTitle title="Monitoreo > Lecha > inf. ensayo" />
                <CardBody>Hola</CardBody>
              </CardSimple>
            </CardContainer>
          </div>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default AlimentoShowPage;
