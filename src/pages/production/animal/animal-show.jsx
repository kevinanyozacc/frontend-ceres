import CenteredContainer from "../../../components/CenteredContainer";
import BreadcrumbSimple from "../../../shared/breadcrumb/components/breadcrumb-simple";
import HeaderSimple from "../../../shared/headers/components/header-simple";

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
      <BreadcrumbSimple title="San Jose" />
    </CenteredContainer>
  );
}

export default AnimalShowPage;
