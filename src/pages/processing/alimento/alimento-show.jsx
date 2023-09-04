import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CenteredContainer from "../../../components/CenteredContainer";
import Loader from "../../../components/Loader";
import AlimentoVigilanciaList from "../../../modules/alimento/components/alimento-vigilancia-list";
import useAlimentoFind from "../../../modules/alimento/hooks/use-alimento-find";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { processingRoute } from "../config";

function AlimentoShowPage() {
  const params = useParams();
  const { alimentoSelected } = useSelector((state) => state.alimento);
  const { isLoading } = useAlimentoFind(params.id);

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader />;
      </CenteredContainer>
    );
  }

  if (!alimentoSelected) {
    return <CenteredContainer>Algo salió mal</CenteredContainer>;
  }

  return (
    <CenteredContainer className="PlaceProfile__container">
      <HeaderSimple
        title={alimentoSelected?.FABRICANTE_FORMULADOR}
        icon="dashicons:food"
        displayType="Origen:"
        displayContent={alimentoSelected?.DESC_SEDE_SED}
      />

      <div className="container">
        <BreadcrumbSimple
          title={alimentoSelected?.FABRICANTE_FORMULADOR}
          options={[
            processingRoute,
            { url: `${processingRoute.url}/alimento?q=a`, name: "Alimento" },
          ]}
        />
        <div className="flex">
          <div className="col-2">
            <CardContainer title="Datos Generales">
              <CardSimple>
                <CardBody>
                  <div className="mb-2">
                    <b className="bold">Establecimiento:</b>{" "}
                    {alimentoSelected?.FABRICANTE_FORMULADOR}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Procedencia:</b>{" "}
                    {alimentoSelected?.DESC_SEDE_SED}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Ubicación:</b>{" "}
                    {alimentoSelected?.DESC_SEDE_SED}
                  </div>
                </CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <AlimentoVigilanciaList />
          </div>
        </div>

        {/* <div className="flex mt-3">
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
        </div> */}
      </div>
    </CenteredContainer>
  );
}

export default AlimentoShowPage;
