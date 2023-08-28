/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CenteredContainer from "../../../components/CenteredContainer";
import Loader from "../../../components/Loader";
import AnimalVigilanciaList from "../../../modules/animal/components/animal-vigilancia-list";
import useAnimalFind from "../../../modules/animal/hooks/use-animal-find";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import HeaderSimple from "../../../shared/headers/components/header-simple";
import { processingRoute } from "../config";

function AnimalShowPage() {
  const params = useParams();
  const { animalSelected } = useSelector((state) => state.animal);
  const { isLoading } = useAnimalFind(params.id);

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader />;
      </CenteredContainer>
    );
  }

  if (!animalSelected) {
    return <CenteredContainer>Algo salió mal</CenteredContainer>;
  }

  return (
    <CenteredContainer className="PlaceProfile__container">
      <HeaderSimple
        title={animalSelected?.ESTABLECIMIENTO_PRODUCTOR}
        icon="mdi:pig"
        displayType="Origen:"
        displayContent={animalSelected?.UBICATION}
      />

      <div className="container">
        <BreadcrumbSimple
          title={animalSelected?.cod_arete}
          options={[
            processingRoute,
            {
              url: `${
                processingRoute.url
              }/animal?q=${animalSelected?.cod_arete?.substring(0, 5)}`,
              name: "Animal",
            },
          ]}
        />
        <div className="flex">
          <div className="col-2">
            <CardContainer title="Datos Generales">
              <CardSimple>
                <CardBody>
                  <div className="mb-2">
                    <b className="bold">Establecimiento:</b>{" "}
                    {animalSelected?.ESTABLECIMIENTO_PRODUCTOR}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Procedencia:</b>{" "}
                    {animalSelected?.PROCEDENCIA}
                  </div>
                  <div className="mb-2">
                    <b className="bold">Ubicación:</b>{" "}
                    {animalSelected?.UBICATION}
                  </div>
                </CardBody>
              </CardSimple>
            </CardContainer>
          </div>
          <div className="col-3">
            <AnimalVigilanciaList />
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
